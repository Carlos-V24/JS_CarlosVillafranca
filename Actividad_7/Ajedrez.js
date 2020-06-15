var Tab= prompt("De cuantas filas/columnas será su tablero");//El piso en el que besta el elevador A
while (isNaN(parseInt(Tab))) {
  alert("Inserte un  número");
  Tab= prompt("De cuantas filas/columnas será su tablero");
}
document.write("<Table>");
for (var i = 0; i <Tab; i++) {
  document.write("<tr>");
  for (var n = 0; n <Tab; n++) {
    document.write("<td></td>");
  }
  document.write("</tr>");
}
