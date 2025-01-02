const express = require('express')
const server = express()
const PORT = 3000

server.post('/gps', (req, res) => {
// TODO: need to add posting coordinates functionality
})


server.get('/view', (req, res) => {
// TODO: need to add view of the gps tracker in the GMaps IFrame
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