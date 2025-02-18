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