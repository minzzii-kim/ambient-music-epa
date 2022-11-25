
const ResponseBuilder = require('./response-builder');
const ServiceError = require('../errors/service-error');

const express = require('express')

const DeviceService = require('../services/device-service');
const AmbientMusicService = require('../services/ambient-music-service')

const router = express.Router()

router
    .get('/', (req, res)=>{
        console.log('routing ... ');
        res.send('Hello');
    })
    .get('/playlist', async (req, res) => {
        
        console.log('get playlist ... ');
        const amService = new AmbientMusicService();
        const result =  await amService.getPlayList();
        
        try{
            res.send( new ResponseBuilder().message(result).build());
        }catch(error) {
            if(error instanceof ServiceError) {
                return new ResponseBuilder(error.code).message(error.data).build();
            }
            // console.error('Internal Server Error : ' + JSON.stringify(error));
            return new ResponseBuilder(500).message('Internal Server Error').build();
        }
    })
    .put('/start', async (req, res) => {
        
        const amService = new AmbientMusicService();
        
        try{
            return amService.start();
        } catch(error) {
            if(error instanceof ServiceError) {
                throw error;    // foward
            } else {
                throw new ServiceError(400, 'Bad Request');
            }
        }
            // TODO compose response
    })
    .get('/devices', async (req, res) => {
        // get all supported devices
        const deviceService = new DeviceService();
        return await deviceService.getAirDevices();
    })  

module.exports = router;
