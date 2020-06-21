const width = 1000;
const height = 600;

let canvas = document.getElementById("tablero");
canvas.width = width;
canvas.height = height;
let context = canvas.getContext("2d");
let derechaY = height / 2 - 50;
let velocidad_x = undefined;
let velocidad_y = undefined;
let marcadorDer = 0;
let marcadorIzq = 0;

//Controles de las paletas
document.getElementsByTagName("body")[0].addEventListener("keydown", (e) => {
	if (e.key == "w" || e.key == "W") {
		if (PaletaIzqY > 0) {
			PaletaIzqY -= 50;
			PaletaIzq(PaletaIzqY);
		}
	}
	if (e.key == "s" || e.key == "S") {
		if (PaletaIzqY < height - 100) {
			PaletaIzqY += 50;
			PaletaIzq(PaletaIzqY);
		}
	}
	if (e.key == "i" || e.key == "I") {
		if (derechaY > 0) {
			derechaY -= 50;
			PaletaDer(derechaY);
		}
	}
	if (e.key == "k" || e.key == "K") {
		if (derechaY < height - 100) {
			derechaY += 50;
			PaletaDer(derechaY);
		}
	}
})

var PaletaIzqY = (height / 2) - 50;
//Dibujar paletas
function PaletaIzq(PosY) {
	context.beginPath();
	context.rect(100, PosY, 30, 100);
	context.fillStyle = "blue";
	context.fill();
}
PaletaIzq(PaletaIzqY);

function PaletaDer(Y) {
	context.beginPath();
	context.rect(width - 130, Y, 30, 100);
	context.fillStyle = "red";
	context.fill();
}
PaletaDer(derechaY);



//Dibujar la pelotita
function Pelota(x, y, r) {
	context.beginPath();
	context.arc(x, y, r, 0, Math.PI * 2)
	context.fillStyle = "black";
	context.fill();
	context.closePath();
}

//Objeto pelota
let Pelotita = {
	x: width / 2,
	y: height / 2,
	r: 15,
	//Movimiento de la bolita
	velocidad_x: 5,
	velocidad_y: 5
}
//Pelota(Pelotita.x, Pelotita.y, Pelotita.r);

//Mover la Pelotita :)
function Movimiento() {
	//El error era aqui
	Pelotita.x += Pelotita.velocidad_x;
	Pelotita.y += Pelotita.velocidad_y;
	//Choco con la parte inferior o superior
	if (Pelotita.y - Pelotita.r === 0 || Pelotita.y + Pelotita.r === height) {
		Pelotita.velocidad_y *= -1

	}
	//Choca con la paleta izquierda
	if (Pelotita.x - Pelotita.r == 100 &&

		(Pelotita.y > PaletaIzqY && Pelotita.y < PaletaIzqY + 100)
	) {
		Pelotita.velocidad_x *= -1;
	}
	//Choca con la paleta derecha

	if (Pelotita.x + Pelotita.r == width - 100 &&
		(Pelotita.y > derechaY && Pelotita.y < derechaY + 100)
	) {
		Pelotita.velocidad_x *= -1;
	}
	//Se supone que esta funcion la dibuja :(
		//Checar Anotaciones
	if (Pelotita.x == 0) {
		console.log("Punto Paleta Derecha")
    marcadorDer++;
		Pelotita.x=width/2;
		Pelotita.y=width/2;
	} else if (Pelotita.x == width) {
		console.log("Punto Paleta Izquierda")
    marcadorIzq++;
		Pelotita.x=width/2
		Pelotita.y=width/2
		//Dibujar una nueva pelota y y++
	}
	Pelota(Pelotita.x, Pelotita.y, Pelotita.r);




}



//Primera direccion Pelota
if (Math.random() > 0.5) {
	velocidad_x = 5;
} else {
	velocidad_x = -5;
}
if (Math.random() > 0.5) {
	velocidad_y = 5;
} else {
	velocidad_y = -5;
}

function Marcador() {
  let score = document.getElementById("score");
  score.innerText = `Marcador: ${marcadorIzq} - ${marcadorDer}`;
}

//Acciones del juego
function juego() {
	context.clearRect(0, 0, width, height);
	Pelota(Pelotita.x, Pelotita.y, Pelotita.r);
	PaletaDer(derechaY);
	PaletaIzq(PaletaIzqY);
	Movimiento();
  Marcador();
	//se mueve pero no lo dibuja :(
	//La funcion Pelota creo que la dibujaba
	requestAnimationFrame(juego);
	//Console.log(Pelotita.x)
}
requestAnimationFrame(juego);
