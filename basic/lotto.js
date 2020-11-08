let map = Array(45)
.fill()
.map((element, index) => {
  return index + 1;
});

let shuffle = [];
for(let i = 0; i< 7; i++){
  let randomData = map.splice(Math.floor(Math.random() * map.length), 1)[0];
  shuffle.push(randomData);
}

let result = shuffle.slice(0, 6).sort(function(p, c){return p - c});
let resultBonus = shuffle[shuffle.length-1];

let text = '당첨 숫자들 [ ' + result + ' ], 보너스 [ ' + resultBonus + ' ]';
console.log(text);