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
    const tetronimos = {
        "O":[[1,1],[1,1]]
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
    let board = [
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

    let x=400;
    let y=50
    let mx=10;
    let my=10
    function drawShape() {
        context.fillStyle = colours["J"];
        context.fillRect(x,y,30,30)
    }
    function draw() {
        context.clearRect(0,0,c.width,c.height)
        drawShape()
    }
    window.onkeydown = function(e) {
        let kc = e.keyCode;
        e.preventDefault();
        if (kc===37) {
            x-=mx
        }
        else if (kc===38) {
            y-=my
        }
        else if (kc===39) {
            x+=mx
        }
        else if (kc===40) {
            y+=my
        }
    }
    let currentTet = tetronimos["O"]
    let c = document.getElementById("TetrisGameGraphics");
    c.style.backgroundColor = "white"
    let context = c.getContext("2d")
    context.fillStyle = colours["J"]
    //line.strokeStyle = color  for Outline
    //line.fillStyle = color  for fill 
    //line.strokeStyle = colours["J"]  works
    context.fillRect(474,50,30,30)
    setInterval(draw, 100) 
}