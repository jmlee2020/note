function bullsAndCows(){
  let strike = 0;
  let balls = 0;
  let consoleText = '';
  let result = [];
  let resultCandidate = [1,2,3,4,5,6,7,8,9];

  numberSetting();
  inputUserNumber();
  comparison();
  printResult();  

  // 숫자야구 4개 설정
  function numberSetting(){
    for(let i=0; i<4; i++) {
      let number = resultCandidate.splice(Math.ceil(Math.random() * (9-i-1)), 1)[0];
      result.push(number);
    }
  }

  function inputUserNumber(){
    answer = prompt('숫자 4개 입력');
  }

  // 입력 - 비교검사
  function comparison(){
    for(let i=0; i<result.length; i++){
      for(let j=0; j<result.length; j++){
        if(answer[i] == result[j]){
          if(i==j) {
            strike += 1;
            break;
          }else if(i!=j){
            balls += 1;
            break;
          }
        }
      }
    }
  }

  // 출력
  function printResult(){
    if(strike == 0 && balls == 0){
      consoleText = 'OUT';
    }else if (strike == 4) {
      consoleText = 'Home run!!!';
    } else {
      if(strike != 0) consoleText= strike + ' strike ';
      if(balls != 0) consoleText+= balls + ' balls ';
    }

    console.log(consoleText);
  }


};