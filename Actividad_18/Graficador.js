
$("#Añadir").click(()=>{
  var Registro = $("<div>")
  Registro.addClass("Registro")
  Registro.append("<input type='text' name='Nombre' placeholder='Nombre'>")
  Registro.append("<input type='number' name='Valor' placeholder='Valor'>")
  Registro.append("<input type='color' name='Color'>")
  var Eliminar = $("<input type='submit' name='Eliminar' value='Eliminar'>")
  Eliminar.click(()=>{
    Registro.remove()
  })
  Registro.append(Eliminar)
  $("#Registros").append(Registro)
});
$("#Graficar").click(()=>{
    var ctx = $("#LaGrafica")[0].getContext("2d");
  var Completos=true
  var Labels = [];
  var Valores = [];
  var Colores = [];
  $(".Registro").each((index, elem) => {
    if ($(elem).children()[0].value!="") {
      Labels.push($(elem).children()[0].value);
    }else{
      Completos=false;
    }
    if ($(elem).children()[1].value!="") {
      Valores.push($(elem).children()[1].value);
    }else{
      Completos=false;
    }
    if ($(elem).children()[2].value!="") {
      Colores.push($(elem).children()[2].value);
    }else{
      Completos=false;
    }
  });
  var Titulo = $("#Titulo").val();
  if (Titulo=="") {
    Titulo="Gráfica"
  }
  if (Completos) {
      var LaGrafica = new Chart (ctx,{
      type: $("#Tipo").val(),
      data: {
        labels: Labels,
        datasets: [{
          backgroundColor: Colores,
          data: Valores
        }]
      },
      options:{
        title:{
          display: true,
          text: Titulo
        }
      }
    })
  }else {
    alert("Datos Incompletos, porfavor llenar todo")
  }
});
