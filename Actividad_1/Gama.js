//Comprueba que sean valores numericos
var ElevA= prompt("En que piso esta el elevador A");//El piso en el que besta el elevador A
while (isNaN(parseInt(ElevA))) {
  alert("Gama dime número");
  ElevA= prompt("En que piso esta el elevador A");
}
var ElevB= prompt("En que piso esta el elevador B");//El piso en el que esta el elevador B
while (isNaN(parseInt(ElevB))) {
  alert("Gama dime número");
  ElevB= prompt("En que piso esta el elevador B");
}
var Gama= prompt("Dime en que piso estas Gama");//Piso en el que esta gama
while (isNaN(parseInt(Gama))) {
  alert("Gama dime número");
  Gama= prompt("Dime en que piso estas Gama");
}
//Datos en la consola para ayudar a explicar la situacion
console.log("Gama esta en el piso "+Gama);
console.log("El elevador A esta en el piso "+ElevA);
console.log("El elevador B esta en el piso "+ElevB);
//Calcula la distancia con valores absolutoa
var DistA=Math.abs(Gama-ElevA);
var DistB=Math.abs(Gama-ElevB);
//Decribe la distancia
console.log("Distancia con el elevador A "+DistA);
console.log("Distancia con el elevador B "+DistB);
//Muestra la alerta de donde debe ir Gama
if (DistA>(DistB)) {
  alert("Gama toma el elevador B, está más cerca");
}else if (DistA<DistB) {
  alert("Gama toma el elevador A, está más cerca");
}else if (DistA==DistB) {
  alert("Puedes tomar cualquie elevador gama");
}
