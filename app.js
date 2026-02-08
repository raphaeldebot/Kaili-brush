const canvas = document.getElementById("kaili-brush");
const brushSizeInput = document.getElementById("brushSize");
const brushColorInput = document.getElementById("brushColor")
const ctx = canvas.getContext("2d");

/* Ma fonction pour mon brush de base*/
let drawing = false;
let lastX = 0;

let lastY = 0;
/* Ma fonction pour le slider de mise a jour de la taille du brush */
let brushSize = Number(brushSizeInput.value);

brushSizeInput.addEventListener("input", () => {
    brushSize = Number(brushSizeInput.value);
});

/* Ma fonction pour le slider de choix de la couleur du brush */
let brushColor = brushColorInput.value;

brushColorInput.addEventListener("input", () => {
    brushColor = brushColorInput.value;
})




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
    ctx.strokeStyle = brushColor;

    lastX = x;
    lastY = y;    
});
