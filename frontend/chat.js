
const socket = require('./socket.js');
const chat  = require('./api/chat/index.js');

//var session = require('../config/session');


const initChat = (gameId, messageInput, messageDisplay, messageForm) => {
    console.log("INTI THE CHATTER");
    socket.on(`chat_${gameId}`, function(message){
            message = Object.values(message.username) + ": " + Object.values(message.message);
            console.log('SOCKET MESSAGE: ' + message);
            console.log(messageDisplay);
            element = document.createElement('li');
            element.appendChild(document.createTextNode(message));
            messageDisplay.appendChild(element);
            
            //socket.emit(`chat_${gameId}`,  message);
        })

    messageInput.addEventListener('keydown', function(event){
        if (event.key === "Enter") {
            console.log("EVENT TARGET: " + event.target.value);
            const message = event.target.value;
            chat.sendMessage(gameId, message);
            console.log(messageInput);
            messageForm.reset();
        }
    })

    socket.on('error', function (err) {
        console.log(err);
    })

};

module.exports = { initChat };




/*
function chat() {
   //make connection
    const socket = io.connect('http://localhost:3800');

    //buttons and inputs
    let message = $("#messages");
    let username = $("#username");
    let send_message = $("#send_message");
    let send_username = $("#send_username");
    let chatroom = $("#chatroom");

    // emit message
    send_message.click(function () {
       socket.emit("new_message", {message: message.val()})
    });

    // listen on new_message
    socket.on("new_message", (data) => {
       console.log(data);
       chatroom.append("<p>" + data.username + ": " + data.message)
    });

    // emit a username
    send_username.click(function(){
        console.log(username.val());
        socket.emit('change_username', {username: username.val()})
    });

}
*/

//export default { initChat }

