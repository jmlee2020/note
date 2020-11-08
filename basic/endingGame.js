function endingGame() {
  let provideWord = 'zero';
  while(true){
      let lastWord = prompt(provideWord);
      if(provideWord[provideWord.length-1] == lastWord[0]) {
          provideWord = lastWord;
          alert('성공!');
      }else if (lastWord == 'q') {
          alert('끝!');
          break;
      }else {
          alert('땡! 다시!');
      }
  }
}


function test() {
  let body= document.body;
  let word = document.createElement('div');
  word.textContent= 'zero';
  body.append(word)
  let inputBox= document.createElement('input');
  body.append(inputBox);
  let button= document.createElement('button');
  button.textContent= '입력';
  body.append(button);
  var result= document.createElement('div');
  body.append(result);

  button.addEventListener('click', (e)=>{
    if (word.textContent[word.textContent.length-1] == inputBox.value[0]) {
      word.textContent= inputBox.value;
      inputBox.value= '';
      result.textContent= '성공!'
    } else {
      result.textContent= '실패!'
    }
  });
}