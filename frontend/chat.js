
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
       chatroom.apppend("<p>" + data.username + ": " + data.message)
    });

    // emit a username
    send_username.click(function(){
        console.log(username.val());
        socket.emit('change_username', {username: username.val()})
    });

}