const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
// const { Socket } = require("dgram");

app.use(cors());

const exserver = http.createServer(app);


const io = new Server(exserver , {
    cors: {
        origin:"http://localhost:3000",
        methods : ["GET" , "POST"]
    },
});


io.on("connection" , (socket) =>{
    console.log(`user connected : ${socket.id}`);

    socket.on("join_room" , (data) => {
        socket.join(data);
        console.log(`user with id : ${ socket.id } joined the room ${data} ` )
    })

    socket.on("send_message" , (data) => {

        socket.to(data.room).emit("recieve_message" , data)

        console.log(data);
    })

    socket.on("disconnect" , ()=>{
        console.log("user disconnected : " , socket.id);
    } );
} );


exserver.listen(5000 , () => {
    console.log("server running ... !!!");
} );