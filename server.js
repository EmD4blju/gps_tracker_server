const express = require('express')
const date = require('date-and-time');
const server = express()
server.use(express.json())
require('dotenv').config()
const PORT = process.env.PORT

let gps_storage = {}

server.post('/gps', (req, res) => {
    const { gps_id, lat, lon } = req.body
    gps_storage[gps_id] = {
        'lat': lat,
        'lon': lon,
        'timestamp': date.format(new Date(), 'DD/MM/YYYY HH:mm:ss')
    }
    res.json({
        message: 'RECEIVED_DATA_STATUS: REGISTERED',
        data: gps_id
    });
})


server.get('/view', (req, res) => {
    html_response = `
        <head>
            <meta http-equiv="refresh" content="5" >
            <style>
                .container{
                    display:grid;
                    grid-template-columns:auto auto auto;
                }
            </style>
        </head>
        <table>
            <thead>
                <tr>
                    <td>GPS_ID</td>
                    <td>LAT</td>
                    <td>LON</td>
                    <td>TIMESTAMP</td>
                </tr>
            </thead>
            <tbody>
    `
    for (let gps_id in gps_storage){
        lat = gps_storage[gps_id]['lat']
        lon = gps_storage[gps_id]['lon']
        timestamp = gps_storage[gps_id]['timestamp']
        html_response += `
                <tr>
                    <td><a href='/view/${gps_id}'>${gps_id}</a></td>
                    <td>${lat}</td>
                    <td>${lon}</td>
                    <td>${timestamp}</td>
                </tr>
        `
    }
    html_response += `
            </tbody>
        </table>
        <div class="container">
    `
    for (let gps_id in gps_storage){
        lat = gps_storage[gps_id]['lat']
        lon = gps_storage[gps_id]['lon']
        html_response += `
            <iframe
                width="600"
                height="450"
                style="border:0;"
                loading="lazy"
                allowfullscreen
                src="https://www.google.com/maps/embed/v1/place?key=${process.env.API_KEY}&q=${lat}, ${lon}">
            </iframe>
        `
    }
    html_response += `
        </div>
    `
    res.send(html_response)
})

server.get('/view/:gps_id', (req, res) => {
    gps_id = req.params.gps_id
    received_gps = {
        'gps_id': gps_id,
        'lat': gps_storage[gps_id]['lat'],
        'lon': gps_storage[gps_id]['lon']
    }
    html_response = `
        <iframe
            width="600"
            height="450"
            style="border:0;"
            loading="lazy"
            allowfullscreen
            src="https://www.google.com/maps/embed/v1/place?key=${process.env.API_KEY}&q=${received_gps['lat']}, ${received_gps['lon']}">
        </iframe>
    `
    res.send(html_response)
})



server.listen(PORT,
    (error) => {
        if(!error){
            console.log(
                `SERVER_STATUS: RUNNING\nSERVER_PORT: ${PORT}`
            )
        }else{
            console.log(
                `ERROR: ${error}`
            )
        }
    }
)