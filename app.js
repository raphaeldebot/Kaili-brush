const canvas = document.getElementById("kaili-brush");
const ctx = canvas.getContext("2d");


let drawing = false;

canvas.addEventListener("pointerdown", () => {
    drawing = true;
});

canvas.addEventListener("pointerup", () => {
    drawing = false;
});


canvas.addEventListener("pointermove", (e) => {
    if (!drawing) return;

    const x = e.offsetX;
    const y = e.offsetY;


    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fill();
});


