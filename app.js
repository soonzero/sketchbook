const canvas = document.getElementById("jsSketchBook");
const CANVAS_SIZE = 700;
const DEFAULT_COLOR = "black";
const ctx = canvas.getContext("2d");


// to make sure that canvas size of css is same as that of JS (700 * 700)
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;


// to make background of canvas not be transparent when saving the result of sketch
ctx.fillStyle = "white"
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);


// to set a default values of color and linewidth
ctx.strokeStyle = DEFAULT_COLOR;
ctx.fillStyle = DEFAULT_COLOR;
ctx.lineWidth = 5;

const colors = document.getElementsByClassName("jsColor"); // to choose a color in the palette
const range = document.getElementById("jsRange") // to control the linewidth with input range
const mode = document.querySelector("#jsMode") // to later change modes between filling and painting
const save = document.querySelector("#jsSave") // to later make users be able to save their sketch


// all about changing values
Array.from(colors).forEach(choice => choice.addEventListener("click", changeColor));
/* 
'colors' returns HTMLCollection, not an array. so we can use 'Array.from()' to make it return an array and call a forEach function. each color in 'colors' would be a 'choice' and if we click it, it will call a function changeColor. 
*/

function changeColor(event) {
    const color = event.target.style.backgroundColor; // event = click -> background color of what we clicked!
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

if (range) {
    range.addEventListener("input", changeRange)
}

function changeRange(event) {
    const value = event.target.value; // event = input -> specific value which we did input(control the thumb)
    ctx.lineWidth = value;
}


// setting the default value of painting and filling to false
let painting = false;
let filling = false;

mode.addEventListener("click", changeMode);

function changeMode(event) {
    if (filling == true) {
        filling = false;
        mode.innerText = "fill";
    } else {
        filling = true;
        mode.innerText = "paint";
        
    }
}


// all about painting(creating lines)
if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove)
    canvas.addEventListener("mousedown", startPainting)
    canvas.addEventListener("mouseup", stopPainting)
    canvas.addEventListener("mouseleave", stopPainting)
    canvas.addEventListener("click", fillCanvas)
    canvas.addEventListener("contextmenu", cm)
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}
function startPainting() {
    painting = true;
}

function stopPainting() {
    painting = false;
}

function fillCanvas(event) {
    if (filling) {
        ctx.fillRect(0, 0, 700, 700)
    } 
}

function cm(event) {
    event.preventDefault();
}

// all about saving the photo
function saveSketch(event) {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "sketch.png";
    link.click();
}

if(save) {
    save.addEventListener("click", saveSketch)
}