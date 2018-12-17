
// Contains the frontend logic for the chessboard
let temp = "";
let previous = "";
document.addEventListener('click', function(e) {

    const position = e.target.getAttribute('id');
        if (position != temp){
        previous = temp;
        temp = position;
        }
    console.log("Previous Position: " + previous);
    console.log("Position : " + position);
    }, false);