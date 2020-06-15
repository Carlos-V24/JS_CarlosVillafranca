var Horizontal=6;//Cuantos valores de cada sub arreglo
var Vertical=4;//Cuantos subarreglos
var Fibonacci=[0, 1];//Inicio Secuencia de Fibonacci
//Crea una serie de fibonacci
for (var i=1; i<Horizontal*Vertical-1; i++) {
  Fibonacci[i+1]=Fibonacci[i-1]+Fibonacci[i];
}
/*
  Esto es una variante de numeros normales consecutivos, ya que
  En un momento es inditingible los numeros en la succecion original
for (var i=2; i<Horizontal*Vertical; i++) {
  Fibonacci[i]=i;
}*/
//Crea la cuadricula donde estaran los numero de fibonacci
var Cuadricula= new Array
var Filas= new Array
for (var a = 0; a <Vertical; a++) {
  Filas=[];
  for (var n = 0; n < Horizontal; n++) {
    Filas.push(1)
  }
  Cuadricula.push(Filas)
}
var IndexFibbo=0;//Inidice de cque numero de fibonnaci se imprimira
var Accion=1;//Indica la accion inicial del problema
var NegVer=0;//Ayudara a definir distancia respecto a los bordes
var NegHor=0;//Ayudara a definir distancia respecto a los bordes
while (IndexFibbo<Fibonacci.length) {
  switch (Accion) {
    case 1:
    //Imprime todos los numero en la parte superior
      for (var i = NegHor; i < Horizontal+NegHor ; i++) {
        Cuadricula[NegHor][i]=Fibonacci[IndexFibbo];
        IndexFibbo++;
      }
      Accion++;
      Horizontal--;
      NegHor++;
      break;
    case 2:
    //Imprime todos los numero en la parte derecha
      for (var i = NegHor; i < Vertical+NegVer ; i++) {
        Cuadricula[i][Horizontal+NegVer]=Fibonacci[IndexFibbo];
        IndexFibbo++;
      }
      Accion++;
      Vertical--;
    break;
    case 3:
    //Imprime todos los numero en la parte inferior
      for (var i =Horizontal+NegVer-1; i >=NegVer ; i--) {
        Cuadricula[Vertical+NegVer][i]=Fibonacci[IndexFibbo];
        IndexFibbo++;
      }
      Accion++;
      Horizontal--;
    break;
    case 4:
    //Imprime todos los numero en la parte izquiera
      for (var i = Vertical+NegVer-1;  i >NegVer ; i--) {
        Cuadricula[i][NegVer]=Fibonacci[IndexFibbo];
        IndexFibbo++;
      }
      Accion=1;
      Vertical--;
      NegVer++;
    break;
  }
}
console.log(Cuadricula);//Imprime el resultado
console.log(Fibonacci);//todos los numeros de fibbonacci por si ayuda a ubicarte
