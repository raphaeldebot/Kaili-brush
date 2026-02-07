const canvas = document.getElementById("kaili-brush");
const ctx = canvas.getContext("2d");


ctx.beginPath();
ctx.arc(200,150,10,0,Math.PI*2);
ctx.fill();