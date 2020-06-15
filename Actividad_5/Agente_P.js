var Text = prompt("Texto del hacker");
var PosScriptIn=Text.search(/<script>/gmi);
var PosScriptFn=Text.search(/<\/script>/gmi);
var ArrayXd =Text.match(/equisde/gmi);
if (ArrayXd==null) {
  ArrayXd=0
}
if (ArrayXd.length>=5 && PosScriptIn>=0 && PosScriptFn>PosScriptIn) {
  alert("Oso oso mentiroso, vete lejos antes de que te lanze miscalcetines olor a queso.")
}else if (ArrayXd.length>=5 || (PosScriptIn>=0 && PosScriptFn>PosScriptIn)) {
  alert("¿Bob?\n¿Wade\?")
}
