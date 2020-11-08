let map = [];
let tbody = document.querySelector('#table tbody');
let result = document.querySelector('#result');
let gameFlag = false;
document.querySelector('#exec').addEventListener('click', function() {
  gameFlag = true;
  tbody.innerHTML='';
  result.textContent='';
  let hor = document.querySelector('#hor').value;
  let ver = document.querySelector('#ver').value;
  let mine = document.querySelector('#mine').value;
  map = [];
  let mineCount = (hor * ver) - mine;

  // 지뢰 위치 설정
  let candidate = Array(hor * ver)
    .fill()
    .map(function(e, idx) {
      return idx;
    });
  
  let shuffle = [];
  while(candidate.length > mineCount) {
    let tmp = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(tmp);
  }

  // 지뢰 테이블 생성
  for(let i = 0; i < ver; i++){
    let tr = document.createElement('tr');
    let arr= [];
    map.push(arr);
    for(let j=0; j < hor; j++) {
      arr.push(1);
      let td = document.createElement('td');
      td.addEventListener('contextmenu', function(e){
        e.preventDefault();
        if(!gameFlag) {
          return;
        }

        if(e.currentTarget.classList == 'opened') {
          return;
        }
        let parentTr = e.currentTarget.parentNode;
        let parentTbody = e.currentTarget.parentNode.parentNode;
        let col = Array.prototype.indexOf.call(parentTr.children, td);
        let row = Array.prototype.indexOf.call(parentTbody.children, tr);
                
        if(e.currentTarget.textContent == '' || e.currentTarget.textContent == 'X') {
          e.currentTarget.textContent = '!';
        } else if (e.currentTarget.textContent == '!') {
          e.currentTarget.textContent = '?';
        } else {
          if(map[row][col] === 1) {
            e.currentTarget.textContent = '';
          }else {
            e.currentTarget.textContent = map[row][col];
          }
        }

      });
      td.addEventListener('click', function (e) {
        let parentTr = e.currentTarget.parentNode;
        let parentTbody = e.currentTarget.parentNode.parentNode;
        let col = Array.prototype.indexOf.call(parentTr.children, td);
        let row = Array.prototype.indexOf.call(parentTbody.children, tr);

        e.currentTarget.classList.add('opened');

        if(map[row][col] == 'X') {
          e.currentTarget.textContent = '펑';
          result.textContent='실패!';
          gameFlag = false;
        } else {
          let openedCol = openedColCount();
          if(openedCol == mineCount) {
            result.textContent='성공!!';
            gameFlag = false;
          }

          let around = [];
          if(map[row-1]) {
            around.push(map[row-1][col-1], map[row-1][col], map[row-1][col+1]);
          }
          if(map[row][col-1]) {
            around.push(map[row][col-1]);
          }
          if(map[col+1]) {
            around.push(map[row][col+1]);
          }
          if(map[row+1]) {
            around.push(map[row+1][col-1], map[row+1][col], map[row+1][col+1]);
          }

          let aroundCount = around.filter(function (v) {
            return v == 'X';
          }).length.toString();
          if(aroundCount != '0'){
            e.currentTarget.textContent = aroundCount;
          }
          map[row][col] = aroundCount;

          if (aroundCount == '0') {
            let extAround = [];
            if(tbody.children[row-1]) {
              extAround = extAround.concat([
                tbody.children[row-1].children[col-1],
                tbody.children[row-1].children[col],
                tbody.children[row-1].children[col+1]
              ]);
            }
            extAround = extAround.concat([
              tbody.children[row].children[col-1],
              tbody.children[row].children[col+1]
            ]);
            if(tbody.children[row+1]) {
              extAround = extAround.concat([
                tbody.children[row+1].children[col-1],
                tbody.children[row+1].children[col],
                tbody.children[row+1].children[col+1]
              ]);
            }
            extAround.filter(function(v){ 
              return !!v
            }).forEach(function(nextCol) {
              let pTr = nextCol.parentNode;
              let pTbody = nextCol.parentNode.parentNode;
              let col = Array.prototype.indexOf.call(pTr.children, nextCol);
              let row = Array.prototype.indexOf.call(pTbody.children, pTr);
              if(map[row][col] != "0") {
                nextCol.click();
              }

            }); 
          } 
        }
      });
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
    console.log(map);
  }

  for(let i = 0; i< shuffle.length; i++) {
    let vertical = Math.floor(shuffle[i] / 10);
    let horizontal = shuffle[i] % 10;
    map[vertical][horizontal] = 'X';
  }

})

function openedColCount(){
  let list = document.querySelectorAll('.opened').length;
  return list;
}