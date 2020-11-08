function gugudan(){
  while(true){
      let x= Math.floor(Math.random() * 9) + 1;
      let y= Math.floor(Math.random() * 9) + 1;
      let result = x*y;
      let answer = prompt(x + ' X ' + y + ' = ? ');
      
      if(answer == result) {
          alert('정답이다.. 하산해도 된다...');
          break;
      } else {
          alert('정답은 ' + result + '였다.\n다시 해!!!!');
      }
  }
}