let canvas;
let canvasContext;

let zoom = 1;

const gridWidth = 40;
let squareWidth = gridWidth;
let axisWidth = 10;
let gridLineWidth = 2;

let squareCenter;
let greenCorner, redCorner, blueCorner, purpleCorner;
let cornerArray;

let center;


window.onload = function(){
    canvas = document.getElementById("transformationCanvas");
    canvasContext = canvas.getContext("2d");

    document.getElementById("translate_button").addEventListener("click", translateSquare);
    document.getElementById("reflect_button").addEventListener("click", reflectSquare);
    document.getElementById("rotate_button").addEventListener("click", rotateSquare);
    document.getElementById("reset_button").addEventListener("click", resetSquare);
  
    canvas.width = document.body.clientWidth * .8;
    canvas.height = document.body.clientHeight;
    center = {
        x: canvas.width / 2,
        y: canvas.height / 2,
    };
    greenCenter = {
        x: -1 * (.5 * squareWidth / gridWidth),
        y: .5 * squareWidth / gridWidth,
        color: "green"
    };
    redCenter = {
        x: .5 * squareWidth / gridWidth,
        y: .5 * squareWidth / gridWidth,
        color: "red"
    };
    blueCenter = {
        x: -1 * (.5 * squareWidth / gridWidth),
        y: -1 * (.5 * squareWidth / gridWidth),
        color: "blue"
    };
    purpleCenter = {
        x: .5 * squareWidth / gridWidth,
        y: -1 * (.5 * squareWidth / gridWidth),
        color: "purple"
    };
    centerArray = [greenCenter, redCenter, blueCenter, purpleCenter];
    
    drawEverything();
}

const drawEverything = function(){
    colorRect(0, 0, canvas.width, canvas.height, "white");
    // draw the axes
    drawLine(center.x, 0, center.x, canvas.height, "black", axisWidth);
    drawLine(0, center.y, canvas.width, center.y, "black", axisWidth);
    // draw the gridlines
    for(i = 1; i < canvas.width / 2 / 40 ; i++){
        drawLine(center.x + i * gridWidth, 0, center.x + i * gridWidth, canvas.height, "gray", gridLineWidth);
        drawLine(center.x - i * gridWidth, 0, center.x - i * gridWidth, canvas.height, "gray", gridLineWidth);
    }
    for(j = 1; j < canvas.height / 2 / 40; j++){
        drawLine(0, center.y - j * gridWidth, canvas.width, center.y - j * gridWidth, "gray", gridLineWidth);
        drawLine(0, center.y + j * gridWidth, canvas.width, center.y + j * gridWidth, "gray", gridLineWidth);
    }
    
    drawSquare(centerArray);

}

const drawLine = function(startX, startY, endX, endY, color = "black", thickness = 1){
    canvasContext.beginPath();
    canvasContext.lineWidth = thickness;
    canvasContext.moveTo(startX, startY);
    canvasContext.lineTo(endX, endY);
    canvasContext.strokeStyle = color;
    canvasContext.stroke();
}

const colorRect = function(leftX, topY, width, height, drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}

const xCoordinateToPosition = function(x){
    return center.x + x * gridWidth;
}

const yCoordinateToPosition = function(y){
    return center.y - y * gridWidth;
}

const drawSquare = function(centerArray){
    for(i = 0; i < centerArray.length; i++){
        colorRect(xCoordinateToPosition(centerArray[i].x) - (.5 * squareWidth), 
        yCoordinateToPosition(centerArray[i].y) - (.5 * squareWidth), 
        squareWidth, squareWidth, centerArray[i].color);
    }
}

const translateSquare = function(){
    for(i = 0; i < centerArray.length; i++){
        centerArray[i].x = centerArray[i].x + parseInt(document.getElementById("x_trans").value);
        centerArray[i].y = centerArray[i].y + parseInt(document.getElementById("y_trans").value);
    }
    drawEverything();
}

const reflectSquare = function(){
    if(document.getElementById("reflections").value == "x-axis"){
        for(i = 0; i < centerArray.length; i++){
            centerArray[i].x = centerArray[i].x;
            centerArray[i].y = -1 * centerArray[i].y;
        }
        drawEverything();
    }else if(document.getElementById("reflections").value == "y-axis"){
        for(i = 0; i < centerArray.length; i++){
            centerArray[i].x = -1 * centerArray[i].x;
            centerArray[i].y = centerArray[i].y;
        }
        drawEverything();
    }else if(document.getElementById("reflections").value == "line y = x"){
        for(i = 0; i < centerArray.length; i++){
            oldX = centerArray[i].x;
            centerArray[i].x = centerArray[i].y;
            centerArray[i].y = oldX;
        }
        drawEverything();
    }
}

const rotateSquare = function(){
    if(document.getElementById("rotations").value == "90 degrees clockwise"){
        for(i = 0; i < centerArray.length; i++){
            oldX = centerArray[i].x;
            centerArray[i].x = centerArray[i].y;
            centerArray[i].y = -1 * oldX;
        }
        console.log("done")
        drawEverything();
    }else if(document.getElementById("rotations").value == "90 degrees counter-clockwise"){
        for(i = 0; i < centerArray.length; i++){
            oldX = centerArray[i].x;
            centerArray[i].x = -1 * centerArray[i].y;
            centerArray[i].y = oldX;
        }
        drawEverything();
    }else if(document.getElementById("rotations").value == "180 degrees"){
        for(i = 0; i < centerArray.length; i++){
            centerArray[i].x = -1 * centerArray[i].x;
            centerArray[i].y = -1 * centerArray[i].y;
        }
        drawEverything();
    }
}

const resetSquare = function(){
    console.log("hi")

    greenCenter.x = -1 * (.5 * squareWidth / gridWidth) + parseInt(document.getElementById("x_reset").value);
    greenCenter.y = .5 * squareWidth / gridWidth + parseInt(document.getElementById("y_reset").value);

    redCenter.x = .5 * squareWidth / gridWidth + parseInt(document.getElementById("x_reset").value),
    redCenter.y = .5 * squareWidth / gridWidth + parseInt(document.getElementById("y_reset").value),

    blueCenter.x = -1 * (.5 * squareWidth / gridWidth) + parseInt(document.getElementById("x_reset").value),
    blueCenter.y = -1 * (.5 * squareWidth / gridWidth) + parseInt(document.getElementById("y_reset").value),

    purpleCenter.x = .5 * squareWidth / gridWidth + parseInt(document.getElementById("x_reset").value),
    purpleCenter.y = -1 * (.5 * squareWidth / gridWidth) + parseInt(document.getElementById("y_reset").value),

    drawEverything();
}

