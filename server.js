const express = require('express')
const server = express()
require('dotenv').config()
server.use(express.json())
const PORT = process.env.PORT

let gps_storage = {
    '21ac8ced-310c-4766-ba28-1ecb6c85b566': {
        'lat': 50.342,
        'lon': 21.567,
        'timestamp': Date.now()
    },
    '99ad32a2-9fdf-4895-9d41-febef5d0de2e': {
        'lat': 100.52,
        'lon': 260.123,
        'timestamp': Date.now()
    },
    '0ca28dae-f426-4d03-bc5d-06e73906f57e': {
        'lat': 50.342,
        'lon': 21.567,
        'timestamp': Date.now()
    }
}

server.post('/gps', (req, res) => {
    const { gps_id, lat, lon } = req.body
    gps_storage[gps_id] = {
        'lat': lat,
        'lon': lon,
        'timestamp': Date.now()
    }
    res.json({
        message: 'Data received & stored successfully!',
        data: gps_id
    });
})


server.get('/view', (req, res) => {
    console.log("Received GET /view")
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
                `Server is running on port ${PORT}`
            )
        }else{
            console.log(
                `Error occured: ${error}`
            )
        }
    }
)