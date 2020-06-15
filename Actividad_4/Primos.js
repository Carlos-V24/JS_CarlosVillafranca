var Num=prompt("Diga un numero");
/*Comienza con un arreglo de los primeros primos para evitar
  conflictos con los proximos valores*/
var Primos=new Array(2,3);
//Calcula los numeros primos hasta el numero inidcado
for (var i = 2; i <=Num; i++) {
  var TotalDivPri=0
  /*Si es divisible el numero entre alguno de los primos previos
    aumenta el contador de sus divisores*/
  for (var n = 0; n < Primos.length; n++) {
    if(i%Primos[n]==0){
      TotalDivPri++;
    }
  }
  //Si no tuvo ningun divisor lo agrega al arreglo de primos
  if (TotalDivPri==0) {
    Primos.push(i)
  }
}
var Divisores=new Array();
//Calcula que primos son los divisores de este numero
for (var i = 0; i < Primos.length; i++) {
  if(Num%Primos[i]==0){
    Divisores.push(Primos[i])
  }
}
console.log(Divisores);
