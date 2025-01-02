const express = require('express')
const server = express()
const PORT = 3000

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