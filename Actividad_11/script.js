//onBlur
function MAYUSCULAS() {
      var x = document.getElementById("onblur");
      x.value = x.value.toUpperCase();
    }
//copy
function Copiar() {
  document.getElementById("AlertaCtrlC").innerHTML = "Has copiado el texto"
}
//input
function myFunction() {
  var texto = document.getElementById("Psw").value;
  if(texto=="Contrase�aSegura:D"){
    document.getElementById("Resultado").innerHTML = "Las contrase�as coinciden, bien hecho";
  }else{
    document.getElementById("Resultado").innerHTML = "Las contrase�as no coinciden, muy mal, sigue intentando";
  }
  
}