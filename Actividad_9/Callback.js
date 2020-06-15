function NumRandom(dificultad){
  var NumAlea = Math.round(Math.random()*8)+1;
  return NumAlea*dificultad;
}

var Nums=[
   NumRandom(1)//Num1
  ,NumRandom(2)//Num2
  ,NumRandom(3)//Num3
  ,NumRandom(5)//Num4
  ,NumRandom(7)//Num5
]

function Dictar(Num, callback){
    let ResNum=prompt("Dime el numero " + Num)
    let NumChecar=Nums[Num-1];
    if (NumChecar==ResNum) {
      callback(Num+1);
    }else {
      alert("Simón está triste,te has equivocado :c")
    }
}
//Primer numero
setTimeout(()=>{
  alert("Primer numero es " + Nums[0]);
  Dictar(1, (Num)=>{
    alert("Bien, siguiente numero")
    alert("Segundo numero es " + Nums[1]);
    setTimeout(()=>{
      Dictar(1, (Num)=>{
        Dictar(Num, (Num)=>{
          alert("Bien, siguiente numero")
          alert("Tercer numero es " + Nums[2]);
          setTimeout(()=>{
            Dictar(1, (Num)=>{
              Dictar(Num, (Num)=>{
                Dictar(Num, (Num)=>{
                  alert("Bien, siguiente numero")
                  alert("Cuarto numero es " + Nums[3]);
                  setTimeout(()=>{
                    Dictar(1, (Num)=>{
                      Dictar(Num, (Num)=>{
                        Dictar(Num, (Num)=>{
                          Dictar(Num, (Num)=>{
                            alert("Bien, siguiente numero")
                            alert("Quinto numero es " + Nums[4]);
                            setTimeout(()=>{
                              Dictar(1, (Num)=>{
                                Dictar(Num, (Num)=>{
                                  Dictar(Num, (Num)=>{
                                    Dictar(Num, (Num)=>{
                                      Dictar(Num, (Num)=>{
                                        alert("Felicidades, ganaste")
                                      })
                                    })
                                  })
                                })
                              })
                            }, 1000)
                          })
                        })
                      })
                    })
                  }, 1000)
                })
              })
            })
          }, 1000)
        })
      })
    }, 1000)
  })
}, 1000)
