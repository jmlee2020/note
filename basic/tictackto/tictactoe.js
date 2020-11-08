//let row = document.querySelectorAll('.tictactoe tr');

//row[2].children[0].textContent='AAA';

let body = document.body;
let table = document.createElement('table');
let columns = [];
let user = 'O';
let endFlag = false;

// 배치 및 중복검사
let placementFunc = function(target){
  if(target.textContent == ''){
    if(user == 'O') {
      target.textContent = user;
    }else {
      target.textContent = user;
    }
  }
}

let gameFunc = function(){
  let check = false;

  //가로줄
  for(let i=0; i< 3; i++){
    if(columns[i][0].textContent == user &&
      columns[i][1].textContent == user &&
      columns[i][2].textContent == user){ 
        check  = true;
        break;
    }
  }
  
  //세로줄
  for(let i=0; i< 3; i++){
    if(columns[0][i].textContent == user &&
      columns[1][i].textContent == user &&
      columns[2][i].textContent == user){ 
        check  = true;
        break;
    }
  }

  // 대각선 \
  if(columns[0][0].textContent == user &&
    columns[1][1].textContent == user &&
    columns[2][2].textContent == user){ 
      check  = true;
  }

  if(columns[0][2].textContent == user &&
    columns[1][1].textContent == user &&
    columns[2][0].textContent == user){ 
      check  = true;
  }
  
  if (check == true){
    alert(user + '님의 승리');
    endFlag = true;
  }else {
    console.log('진행중입니다.');
    if(user == 'O') {
      user='X';
    }else {
      user = 'O';
    }
  }
}

for(let i=0; i<3; i++){
  let row = document.createElement('tr');
  columns.push([]);
  for(let j=0; j<3; j++){
    let box = document.createElement('td');
    box.addEventListener('click', (e)=>{
      if (endFlag == false) {
        placementFunc(e.currentTarget);
        gameFunc();
      }
    });
    columns[i].push(box);
    row.appendChild(box);
  }
  table.appendChild(row);
}
table.className = 'tictactoe';
body.appendChild(table);
