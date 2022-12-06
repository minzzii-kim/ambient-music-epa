const DeviceApis = require("../smartthings-apis/device-apis");

// TODO : implement
function isLight(deviceProfile) {
  return true;
}

/**
 *
 * @param {*} device
 * @returns one of 'LIGHT', 'AIR_MONITOR', 'CONTACT_SENSOR', 'OTHERS'
 */
function getDeviceType(deviceProfile) {
  // Ait Monitor by device profile ID
  if (
    deviceProfile?.profile?.id == "17d6783f-67a1-4600-a85b-40f7c0d87084" ||
    deviceProfile?.profile?.id == "1bcc08ee-95ef-4eef-957e-c99b6e17962f"
  ) {
    return "LIGHT";
  }
  return "OTHERS";
}

function hasMainSwitch(deviceProfile) {
  if (deviceProfile?.components) {
    const filtered = deviceProfile.components.filter(
      (component) =>
        component.id == "main" &&
        component.capabilities.filter((capability) => capability.id == "switch")
          .length > 0
    );
    if (filtered.length > 0) {
      return true;
    }
  }
  return false;
}

module.exports = class DeviceService {
  /**
   *
   * @param {*} context has accessToken, locationId, installedAppId as members
   */
  constructor(context) {
    this.deviceApis = new DeviceApis(context.accessToken);
  }

  /**
   * 서비스에 필요한 device 정보들을 제공합니다.
   * 각 device는 deviceId, deviceName, deviceType, status(optional)을 제공합니다.
   * @returns
   */
  async getLightDevices() {
    // 1. 모든 기기들을 가져옵니다. 결과에 상태값은 포함되어 있지 않습니다.
    const deviceProfiles = await this.deviceApis.getAllDevices();
    // 2. 대상기기로 확인 된 것들만 리스트에 포함합니다.
    const filteredDevices = deviceProfiles.filter((deviceProfile) =>
      isLight(deviceProfile)
    );
    // 3. 대상기기에서 응답에 필요한 형태로 가공합니다. 응답 값에 필요한 메인 스위치 값은 아직 없으며 상태 구성에 필요한
    //    ST cloud 호출은 비동기로 이뤄지기 때문에 첫번째 map에서는 async function으로 동작을 감싸고,
    //    두 번째 map에서 이 것들을 실행시켜 Promise형태로 변경해 줍니다.
    //    그 뒤 결과를 가져오기 위해 Promise.all()을 사용합니다.
    let result = await Promise.all(
      filteredDevices
        .map((deviceProfile) => {
          return async () => {
            let device = {
              deviceId: deviceProfile.deviceId,
              deviceName: deviceProfile.label,
              deviceType: getDeviceType(deviceProfile),
            };

            if (hasMainSwitch(deviceProfile)) {
              const status = await this.deviceApis
                .getStatus(deviceProfile.deviceId, "main", "switch")
                .then((status) => status.switch.value); // promise
              device.status = status;
            }

            return device;
          };
        })
        .map((func) => func())
    );

    return result;
  }
};
