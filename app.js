const canvas = document.getElementById("kaili-brush");
const brushSizeInput = document.getElementById("brushSize");
const brushColorInput = document.getElementById("brushColor");
const brushOpacityInput = document.getElementById("brushOpacity");
const brushBtn = document.getElementById("brushBtn");
const eraserBtn = document.getElementById("eraserBtn");
const clearBtn = document.getElementById("clearBtn");
const undoBtn = document.getElementById("undoBtn");
const cursorPreview = document.getElementById("cursorPreview");
const history = [];

const ctx = canvas.getContext("2d");

/* Ma fonction pour avoir le curseur dans la zone de dessin */

canvas.addEventListener("pointermove", (e) => {
    const rect = canvas.getBoundingClientRect();

    const x = rect.left + e.offsetX;
    const y = rect.top + e.offsetY;

    cursorPreview.style.left = x + "px";
    cursorPreview.style.top = y + "px";

    cursorPreview.style.width = brushSize + "px";
    cursorPreview.style.height = brushSize + "px";
})

canvas.addEventListener("pointerenter", () => {
    cursorPreview.style.display = "block";
})

canvas.addEventListener("pointerleave", () => {
    cursorPreview.style.display = "none";
})

/* Ma fonction pour la preview du cursor */
function updateCursorPreview() {
    cursorPreview.style.width = brushSize + "px";
    cursorPreview.style.height = brushSize + "px";

    if (mode === "eraser") {
        cursorPreview.style.background = "transparent";
        cursorPreview.style.border = "2px dashed #000";
        cursorPreview.style.opacity = "1";
    } else {
        cursorPreview.style.background = brushColor;
        cursorPreview.style.opacity = String(brushOpacity);
    }

}
/* Ma fonction pour save l'etat pour mon undo */
/*function saveState() {
    history.push(canvas.toDataURL());
}*/

function saveState() {
    const snap = canvas.toDataURL();
    const last = history[history.length - 1];
    if (snap === last) return;
    history.push(snap);
}
saveState();
undoBtn.addEventListener("click", () => {
    if (history.length <= 1) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        history.length = 0;
        return;
    }

    history.pop();

    const previous = history[history.length - 1];

    const img = new Image();
    img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = "source-over";
        ctx.drawImage(img, 0, 0);
    };

    img.src = previous;
})

/* Ma fonction pour clear la zone de dessin */

clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})

let mode = "brush";
/* Mes fonctions pour le mode brush ou eraser*/

brushBtn.addEventListener("click", () => {
    mode = "brush";


    brushBtn.classList.add("active");
    eraserBtn.classList.remove("active");
    updateCursorPreview();
})

eraserBtn.addEventListener("click", () => {
    mode = "eraser";



    eraserBtn.classList.add("active");
    brushBtn.classList.remove("active");
})
/* Ma fonction pour mon brush de base*/
let drawing = false;
let lastX = 0;

let lastY = 0;
/* Ma fonction pour le slider de mise a jour de la taille du brush */
let brushSize = Number(brushSizeInput.value);

brushSizeInput.addEventListener("input", () => {
    brushSize = Number(brushSizeInput.value);
    updateCursorPreview();
});

/* Ma fonction pour le slider de choix de la couleur du brush */
let brushColor = brushColorInput.value;

brushColorInput.addEventListener("input", () => {
    brushColor = brushColorInput.value;
    updateCursorPreview();
})

/* Ma fonction pour le slider de mise a jour de la taille du brush */
let brushOpacity = Number(brushOpacityInput.value) / 100;

brushOpacityInput.addEventListener("input", () => {
    brushOpacity = Number(brushOpacityInput.value) / 100;
    updateCursorPreview();
});

updateCursorPreview();

canvas.addEventListener("pointerdown", (e) => {
    drawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
    drawDot(lastX, lastY);
});

window.addEventListener("pointerup", () => {
    drawing = false;
    saveState();

});

/* Ma fonction pour dessinner sans bouger le curseur */
function drawDot(x, y) {
    ctx.beginPath();

    ctx.globalAlpha = brushOpacity;

    if (mode === "eraser") {
        ctx.globalCompositeOperation = "destination-out";
    } else {
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = brushColor;
    }

    ctx.arc(Math.round(x), Math.round(y), brushSize / 2, 0, Math.PI * 2);
    ctx.fill()
}

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

    if (mode === "eraser") {
        ctx.globalCompositeOperation = "destination-out";
    } else {
        ctx.globalCompositeOperation = "source-over";
    }

    ctx.stroke();

    lastX = x;
    lastY = y;
});
