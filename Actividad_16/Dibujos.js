var canvas = document.getElementById("Lienzo");
var ctx = canvas.getContext('2d');

function FillStyle(TipoRellen,Color1,Color2,X1,Y1,X2,Y2){
  if (TipoRellen=="Solido") {
    ctx.fillStyle = Color1;
  }else if (TipoRellen=="Gradiante-L") {
    var my_gradient = ctx.createLinearGradient(X1, Y1, X2, Y2);
    my_gradient.addColorStop(0, Color1);
    my_gradient.addColorStop(1, Color2);
    ctx.fillStyle = my_gradient;
  }else if (TipoRellen=="Gradiante-R") {
    var grd = ctx.createRadialGradient(150, 150, 5, 90, 200, 350);
    grd.addColorStop(0, Color1);
    grd.addColorStop(1, Color2);
    ctx.fillStyle = grd;
  }
}
function Draw(Figura,TipoRellen,Color1,Color2) {
  //Determinar el color
  if (Figura=="Mickey") {
    FillStyle(TipoRellen,Color1,Color2,0, 50, 0, 300)
    ctx.beginPath()
    ctx.arc(140,120,80,0,360)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(360,120,80,0,360)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(250,250,150,0,360)
    ctx.fill()
  }else if (Figura=="Rectangulo") {
    FillStyle(TipoRellen,Color1,Color2,0, 200, 0, 380)
    ctx.beginPath()
    ctx.rect(50,150,400,300)
    ctx.fill()
  }else if (Figura=="Circulo") {
    FillStyle(TipoRellen,Color1,Color2,0, 150, 0, 380)
    ctx.beginPath()
    ctx.arc(250,250,150,0,360)
    ctx.fill()
  }
}
//Valores default
var Figura="Rectangulo";
var TipoCol="Solido";
var Color1= "#29afa7";
var Color2= "#da0101"
var DocC2=document.getElementById("Color2")

  //Checa denuevo el estado de DocC2
  DocC2=document.getElementById("Color2")
  TipoCol=document.getElementById("TipoCol").value
  document.getElementsByClassName("Fondo")[0].children[1]
  //En caso de que no exista el input color2
  if ((TipoCol=="Gradiante-L"||TipoCol=="Gradiante-R") && DocC2==null) {
    var Input = document.createElement("input");
    Input.name="Color2"
    Input.type="Color"
    Input.id="Color2"
    Input.value=Color2
    document.getElementsByClassName("Fondo")[0].appendChild(Input);
  }
  if (TipoCol=="Solido" && DocC2!=null) {
    DocC2.remove();
  }
})
document.getElementById("Figura").addEventListener("blur",()=>{
  Figura=document.getElementById("Figura").value
})
document.getElementById("Color1").addEventListener("blur",()=>{
  Color1=document.getElementById("Color1").value
})
//Checa continuamente si ejecutar o no este condicional
setInterval(()=>{
  //Checa denuevo el estado de DocC2
  DocC2=document.getElementById("Color2")
  if (DocC2!=null) {
    DocC2.addEventListener("blur",()=>{
      Color2=document.getElementById("Color2").value
    })
    console.log("Si");
  }
}, 500);

canvas.addEventListener("click",()=>{
  //Limpia el contenido de la figura previa
  ctx.clearRect(0, 0, 500, 500);
  //Dibuja la nueva figura
  Draw(Figura,TipoCol, Color1, Color2)
})
