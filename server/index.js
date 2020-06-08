const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./controllers/user/userController');
const Message = require('./controllers/message/messageController');
const corsOptions = {
  origin: "http://localhost:4200"
};
const app = express();
const http = require('http');
const io = require('socket.io');

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
const dbUrl = 'mongodb://localhost:27017/chatapp';
const options = {useNewUrlParser: true, useUnifiedTopology: true};

app.get('/messages', Message.all);
app.get('/messages/user/', Message.findByUser);
app.post('/messages', Message.create);
app.post('/user', User.create);
app.post('/login', User.login);

const httpServer = http.Server(app);
const ioConnect = io(http);


mongoose.connect(dbUrl, options, (err) => { 
    console.log('mongodb connected', err);
 })

var server = httpServer.listen(3000, () => {
    console.log('server is running on port', server.address().port);
});

ioConnect.on('connection', socket => {
  // Log whenever a user connects
  console.log("user connected");

  // Log whenever a client disconnects from our websocket server
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });

  // When we receive a 'message' event from our client, print out
  // the contents of that message and then echo it back to our client
  // using `io.emit()`
  socket.on("message", message => {
    console.log("Message Received: " + message);
    io.emit("message", { type: "new-message", text: message });
  });

});
