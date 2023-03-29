//this variable keeps track of whose turn it is
let activePlayer='X';
//this array stores an array of moves, this is used to determine win conditions
let selectedSquares = [];

//function for placing an x or o in a square
function placeXorO(squareNumber) {
    if (!selectedSquares.some(element => element.includes(squareNumber))) { //this condition ensure a square hasn't been selected already; the .some()method is used to check each element of the selectSquares array to see if it contains the square number clicked on
        let select = document.getElementById(squareNumber); //this variabe retrieves the HTML element id that was clicked
        if (activePlayer === 'X') {
            select.style.backgroundImage = 'url("images/x.png")'; //if activePlayer is equal to 'X', the x.png is placed in HTML
        } else {
            select.style.backgroundImage = 'url("images/o.png")' //if activePlayer is equal to 'O', the o.png is placed in HTML; activePlayer may only be 'X' or 'O' so if not'X' it must be 'O'
        }
        selectedSquares.push(squareNumber + activePlayer); //squareNumber and activePlayer are concatenated together and added to array
        checkWinConditions(); //this calls a function to check for any win conditions
        if (activePlayer === 'X') { //this condition is for changing the active player
            activePlayer = 'O'; //if active player is 'X' change it to 'O'
        } else { //if active plater is anything other than 'X'
            activePlayer = 'X'; //change the activePlayer to 'X'
        } //I assume this changing of players is to alternate who is X and who is O between games??

    audio('./media/place.mp3'); //this function plays a placement sound
    if (activePlayer === 'O') {//this condition changes to see if it is the computer's turn
        disableClick(); //this function disables clicking during the computer's turn
        setTimeout(function () { computersTurn(); }, 1000); //this function waits 1 second before the computer places an image and enables click
    }
    return true; //returning true is needed for our computerTurn() function to work
}   

    //this function parses the selectedSquares array to search for win conditions
    //drawLine() function is called to draw a line on the screen if the condition is met
    function checkWinConditions() {
        //X 0,1,2 condition
        if (arrayIncludes('0X','1X','2X')) {drawWinLine(50, 100, 558, 100)}
        //X 3,4,5 condition
        else if (arrayIncludes('3X','4X','5X')) {drawWinLine(50, 304,558,304)}
        //X 6,7,8 condition
        else if (arrayIncludes('6X','7X','8X')) {drawWinLine(50,508,558,508)}
        //X 0,3,6 condition
        else if (arrayIncludes('0X','3X','6X')) {drawWinLine(100, 50, 100, 558)}
        //X 1,4,7 condition
        else if (arrayIncludes('1X','4X','7X')) {drawWinLine(304, 50, 304, 558)}
        //X 2,5,8 condition
        else if (arrayIncludes('2X','5X','8X')) {drawWinLine(508, 50, 508, 558)}
        //X 6,4,2 condition
        else if (arrayIncludes('6X','4X','2X')) {drawWinLine(100, 508, 510, 90)}
    //X 0,4,8 condition
    else if (arrayIncludes('0X','4X','8X')) {drawWinLine(100, 100, 520, 520)}
    //O 0,1,2 condition
    else if (arrayIncludes('0O','1O','2O')) {drawWinLine(50, 100, 558, 100)}
    //O 3,4,5 condition
    else if (arrayIncludes('3O','4O','5O')) {drawWinLine(50, 304, 558, 304)}
    //O 6,7,8 condition
    else if (arrayIncludes('6O','7O','8O')) {drawWinLine(50, 508, 558, 508)}
    //O 0,3,5 condition
    else if (arrayIncludes('0O','3O','6O')) {drawWinLine(100, 50, 100, 558)}
    //O 1,4,7 condition
    else if (arrayIncludes('1O','4O','7O')) {drawWinLine(304, 50, 304, 558)}
    //O 2,5,8 condition
    else if (arrayIncludes('2O','5O','8O')) {drawWinLine(508, 50, 508, 558)}
    //O 6,4,2 condition
    else if (arrayIncludes('6O','4O','2O')) {drawWinLine(100, 508, 510, 90)}
    //O 0,4,8 condition
    else if (arrayIncludes('0O','4O','8O')) {drawWinLine(100, 100, 520, 520)}
    //this condition checks for a tie; if none of the above conditions are met and 9 squares are selected the code executes
    else if (selectedSquares.length >= 9) {
        //this function plays the tie game sound
        audio('./media/tie.mp3');
        //this function sets a .3 second timer before the resetGame is call;ed
        setTimeout(function() { resetGame(); }, 500)
    }

    //this function checks if an array includes 3 strings; it is used to check for each win conditon
    function arrayIncludes(squareA, squareB, squareC) {
        //these 3 variables will be used to check for 3 in a row
        const a = selectedSquares.includes(squareA);
        const b = selectedSquares.includes(squareB);
        const c = selectedSquares.includes(squareC);
        //if the 3 variables we pass are all included in our array then true is returned and our else condition executes the drawLine() function
        if (a === true && b === true && c === true) { return true; }
    }
    }

    function computersTurn() { //this function results in a random square being selected by the computer
        let success = false; //this boolean is needed for the while loop
        let pickASquare; //this condition allows for while loop to keep trying if a square is selected already 
        while (!success) {
            pickASquare = String(Math.floor(Math.random() * 9)); //a random number between 0 and 8 is selected
            if (placeXorO(pickASquare)) { //if the random number evaluated returns true, the square hasn't been selected yet
                placeXorO(pickASquare); //this line calls the function
                success = true; //this changes boolean and ends the loop;
                };
            }
        }
    }

    //this function makes body element temporarily unclickable
    function disableClick() {
        //this makes body unclickable
        body.style.pointerEvents = 'none';
        //this makes body clickable again after 1 second
        setTimeout(function() { body.style.pointerEvents = 'auto'; }, 1000);
    }

    //this function takes a string parameter of the path set earlier for the placement sound
    function audio(audioURL) {
        //create a new audio object and pass the path as a parameter
        let audio = new Audio(audioURL);
        //play method plays audio sound
        audio.play();
    }

    //this function utilizes HTML canvas to draw win lines
    function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
        //this line accesses HTML canvas element
        const canvas = document.getElementById('win-lines');
        //this line gives access to methods and properties to use on canvas
        const c = canvas.getContext('2d');
        //this line indicates where the start of a lines x axis is
        let x1 = coordX1,
            //this line idicates where the start of a lines y axis is
            y1 = coordY1,
            //this line idicates where the end of a lines x axis is
            x2 = coordX2,
            //this line idicates where the end of a lines y axis is
            y2 = coordY2,
            //this variable stores temporary x axis data updated in the animation loop
            x = x1,
            //this variable stores temporary y axis data updated in the animation loop
            y = y1;

    //this function interacts with the canvas
    function animateLineDrawing() {
        //this variable creates a loop
        const animationLoop = requestAnimationFrame(animateLineDrawing);
        //this method clears content from the last loop iteration
        c.clearRect(0,0,608,608);
        //this method starts a new path
        c.beginPath();
        //this method moves to a starting point in the line
        c.moveTo(x1,y1);
        //this method indicats the end point in the line
        c.lineTo(x,y);
        //this method sets the width of the line
        c.lineWidth = 10;
        //this method draws everything laid out above
        c.stroke();
        //this condition checks if we've reached the endpoints
        if (x1 <= x2 && y1 <= y2) {
            //this condition adds 10 to the previous end x endpoint
            if (x < x2) {x += 10;}
            //this condition adds 10 to the previous end y endpoint
            if (y < y2) {y += 10;}
            //this condition is similar to the one above, this is necessary for the 6,4,2 win conditions
            if (x >= x2 && y >= y2) { cancelAnimationFrame(animationLoop);}
        }
        //this condition is similar to the one above, this is necessary for the 6,4,2 win condition
        if (x1 <= x2 && y1 >= y2) {
            if (x < x2) { x+= 10;}
            if (y > y2) { y -= 10;}
            if (x >= x2 && y <= y2) { cancelAnimationFrame(animationLoop);}
        }
    }
    //this function clears the canvas after the win line is drawn
    function clear() {
        //this line starts animation loop
        const animationLoop = requestAnimationFrame(clear);
        //this line clears canvas
        c.clearRect(0,0,608,608);
        //this line stops our animation loop
        cancelAnimationFrame(animationLoop);
    }
    //this line disallows clicking while the win sound is playing
    disableClick();
    //this line plays the win sound
    audio('./media/winGame.mp3');
    //this line calls main animation loop
    animateLineDrawing();
    //this line waits 1 second, then clears canvas, resets game, and allows clicking again
    setTimeout(function() {clear(); resetGame();}, 1000);

}

//this function resets the game in the event of a tie or a win
function resetGame() {
    //this for loop iterated through each HTML square element
    for (let i=0; i<9; i++) {
        //this variable gets the HTML element i
        let square = document.getElementById(String(i));
        //this removes the elements backgroundImage
        square.style.backgroundImage='';
    }
    //this resets the array so it is empty and we can start over
    selectedSquares=[];
}