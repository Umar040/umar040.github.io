window.onload = function() {
    hide();
}

function hide() {
    var content = document.getElementsByClassName("projectContent");
    var i;
    for (i=0; i<content.length;i++) {
        content[i].style.display = "none";
    }
    var buttons = document.getElementsByClassName("projects");
    for (i=0;i<buttons.length;i++) {
        buttons[i].className = buttons[i].className.replace(" active","");
    }
}

function openProject(event, projectName) {
    hide()
    document.getElementById(projectName).style.display="block";
    event.currentTarget.className += " active";
}

function tetris() {
    function drawShape() {
        //Border
        context.strokeStyle = "rgb(255,255,255)"
        context.beginPath();
        context.rect(474,70,313,623);
        context.stroke();
        //Shape
        //Get color from grid
        for (let y = 0; y<currentTet.length; y++) {
            for (let x = 0; x<currentTet[y].length; x++) {
                if (currentTet[y][x]) {
                    context.fillStyle = colours[shapeCol]
                    //context.strokeStyle = colours[grid[focusy+y][focusx+x]]
                    context.fillRect(476+focusx*31+x*31,72+focusy*31+y*31,30,30)
                }
            }
        }
    }

    function drawGrid() {
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                if (grid[y][x]) {
                    context.fillStyle = colours[grid[y][x]];
                    context.fillRect(476+31*x, 72+31*y,30,30)
                }
            }
        }
    }

    function draw() {
        context.clearRect(0,0,c.width,c.height)
        drawShape()
        drawGrid()
    }

    function rotateR(matrix) {
        let rotatedMatrix = []
        let matLength = matrix.length
        for (let x=0;x<matrix[0].length;x++) {
            let tempMat = []
            for (let y=1;y<matLength+1;y++) {
                tempMat.push(matrix[matLength-y][x])
            }
            rotatedMatrix.push(tempMat)
        }
        return rotatedMatrix
    }

    function removeItem(element,array) {
        let index = array.indexOf(element);
        if (index>-1) {
            array.splice(index,1)
        }
    }

    function generateRandomPiece() {
        let piece = pieceList[Math.floor(Math.random()*pieceList.length)]
        removeItem(piece,pieceList);
        if (pieceList.length===0) {
            pieceList = ["T","O","S","Z","I","L","J"]
        }
        return piece
    }

    function isExtraSpace(dir,offset) {
        if (dir === "L") {
            //Check first column if no 1's then true
            for (let x=0;x<currentTet.length;x++) {
                if (currentTet[x][offset-1] === 1) {
                    return false
                }
            }
            return true
        }
        else if (dir === "R") {
            for (let x=0;x<currentTet.length;x++) {
                if (currentTet[x][currentTet[0].length-offset] === 1) {
                    return false
                }
            }
            return true
        }
        else if (dir === "D") {
            for (let x=0;x<currentTet[0].length;x++) {
                if (currentTet[currentTet.length-offset][x] === 1) {
                    return false
                }
            }
            return true
        }

    }

    function move(ud,lr) {
        focusy+=ud
        focusx+=lr
        //Left Check
        if (focusx<0) {
            if (!isExtraSpace("L",Math.abs(focusx))) {
                focusx+=1
            }
        }
        //Right Check
        else if (focusx+currentTet[0].length-1>grid[0].length-1) {
            if (!isExtraSpace("R",focusx+currentTet[0].length-grid[0].length)) {
                focusx-=1
            }
        }
        //Up Check
        if (focusy<0) {
            focusy+=1
        }
        //Down Check
        else if (focusy+currentTet.length-1>grid.length-1) {
            if (!isExtraSpace("D",focusy+currentTet.length-grid.length)) {
                focusy-=1
                placePiece(focusy+currentTet.length-grid.length)
                for (let y=0;y<currentTet.length;y++) {
                    for (let x=0;x<currentTet[0].length;x++) {

                    }
                }
            }
        }

    }

    function placePiece(Xoffset,Yoffset) {
        for (let y=0;y<currentTet.length;y++) {
            for (let x=0;x<currentTet[0].length;x++) {
                if (currentTet[y][x]) {
                    grid[focusx]
                }
            }
        }
    }

    //Game Loop
    function loop() {
        frameCounter+=1
        raf = requestAnimationFrame(loop)
        draw()
        if (frameCounter/60 >= 1) {
            move(1,0)
            frameCounter=0
        }
    }

    //Keyboard Listener
    window.onkeydown = function(e) {
        let kc = e.keyCode;
        e.preventDefault();
        if (kc===37) {//Left
            move(0,-1)
        }
        else if (kc===38) {//Up
            move(-1,0)
        }
        else if (kc===39) {//Right
            move(0,1)
        }
        else if (kc===40) {//Down
            move(1,0)
        }
        else if (kc===27) {//Escape
            cancelAnimationFrame(raf);
        }
        else if (kc===82) {//R
            currentTet = rotateR(currentTet)
        }
    }

    //Global Variable Declarations
    const tetronimos = {
        "T":[
        [0,0,0],
        [1,1,1],
        [0,1,0]],

        "O":[
        [1,1],
        [1,1]],

        "S":[
        [0,0,0],
        [0,1,1],
        [1,1,0]],

        "Z":[
        [0,0,0],
        [1,1,0],
        [0,1,1]],

        "I":[
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0]],

        "L":[
        [0,1,0],
        [0,1,0],
        [0,1,1]],

        "J":[
        [0,1,0],
        [0,1,0],
        [1,1,0]]
    }

    const colours = {
        "T":"rgb(138,43,226)",
        "O":"rgb(255,255,0)",
        "S":"rgb(0,255,0)",
        "Z":"rgb(255,0,0)",
        "I":"rgb(0,255,255)",
        "L":"rgb(255,127,0)",
        "J":"rgb(0,0,255)"
    }
    let grid = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]];

    //Focus is shape relative to grid
    let focusx=4;
    let focusy=0;
    let frameCounter = 0
    let pieceList = ["T","O","S","Z","I","L","J"]
    let currentPiece = generateRandomPiece()
    let shapeCol=currentPiece
    let currentTet = tetronimos[currentPiece]
    let c = document.getElementById("TetrisGameGraphics");
    let context = c.getContext("2d")

    //line.strokeStyle = color  for Outline
    //line.fillStyle = color  for fill 
    //line.strokeStyle = colours["J"]  works
    //color rgb works but needs to be string
    // If board is anything but 0 it is True
    // board[0][0] = "J"
    // if (board[0][0]) {
    //     document.write(board[0][0])
    // }
    raf = requestAnimationFrame(loop)

}
/* 
Bugs: 
Line piece spawns 2nd coloumn down but nicer if it spawn at the top
Offset on rotate since rotate all for S,Z,I

Todo: 
Place into board
Collision Checks
Board Collision Checks

Planned:
Make seperate rotate functions for I and S/Z piece. I is just reflection (See book) and SZ can have custom swap as just 2 rotations
Remember offset so that it is easier to place into the grid
*/