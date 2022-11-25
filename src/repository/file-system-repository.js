const fs = require('fs').promises;

module.exports = class FileSystemRepository {
    constructor(installedAppId) {
        this.installedAppId = installedAppId;
    }

    async get(key) {
        const data = await fs.readFile(`${this.installedAppId}-${key}.json`);
        return JSON.parse(data);
    }

    async put(key, jsonData) {
        await fs.writeFile(`${this.installedAppId}-${key}.json`, JSON.stringify(jsonData));
    }
}