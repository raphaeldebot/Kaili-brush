const canvas = document.getElementById("kaili-brush");
const ctx = canvas.getContext("2d");


let drawing = false;
let lastX = 0;
let lastY = 0;

canvas.addEventListener("pointerdown", (e) => {
    drawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
});

canvas.addEventListener("pointerup", () => {
    drawing = false;
});


canvas.addEventListener("pointermove", (e) => {
    if (!drawing) return;

    const x = e.offsetX;
    const y = e.offsetY;


    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.lineWigth = 10;
    ctx.lineCap = "round";
    ctx.stroke();

    lastX = x;
    lastY = y;    l
});


