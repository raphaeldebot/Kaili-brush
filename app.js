const canvas = document.getElementById("kaili-brush");
const brushSizeInput = document.getElementById("brushSize");
const brushColorInput = document.getElementById("brushColor");
const brushOpacityInput = document.getElementById("brushOpacity");
const brushBtn = document.getElementById("brushBtn");
const eraserBtn = document.getElementById("eraserBtn");
const clearBtn = document.getElementById("clearBtn");

const ctx = canvas.getContext("2d");

/* Ma fonction pour clear la zone de dessin */

clearBtn.addEventListener("click", () => {
    ctx.clearRect(0,0,canvas.width, canvas.height);
})

let mode = "brush";
/* Mes fonctions pour le mode brush ou eraser*/

brushBtn.addEventListener("click", () => {
    mode = "brush";
})

eraserBtn.addEventListener("click", () => {
    mode = "eraser";
})
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

/* Ma fonction pour le slider de mise a jour de la taille du brush */
let brushOpacity = Number(brushOpacityInput.value) / 100;

brushOpacityInput.addEventListener("input", () => {
    brushOpacity = Number(brushOpacityInput.value);
});



canvas.addEventListener("pointerdown", (e) => {
    drawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
});

window.addEventListener("pointerup", () => {
    drawing = false;
});


canvas.addEventListener("pointermove", (e) => {
    if (!drawing) return;

    const x = e.offsetX;
    const y = e.offsetY;


    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);

    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    ctx.lineWidth = brushSize;
    ctx.strokeStyle = brushColor;
    ctx.globalAlpha = brushOpacity;

    if (mode === "eraser"){
        ctx.globalCompositeOperation = "destination-out";
    } else {
        ctx.globalCompositeOperation = "source-over";
    }

    ctx.stroke();

    lastX = x;
    lastY = y;
});
