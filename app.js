const canvas = document.getElementById("kaili-brush");
const brushSizeInput = document.getElementById("brushSize");
const ctx = canvas.getContext("2d");

/* Ma fonction pour mon brush de base*/
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
    ctx.lineJoin = "round";
    ctx.lineTo(x, y);
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.stroke();

    lastX = x;
    lastY = y;    
});
/* Ma fonction pour le slider de mise a jour de la taille du brush */
let brushSize = brushSizeInput.value;

brushSizeInput.addEventListener("input", () => {
    brushSize = brushSizeInput.value;
});
