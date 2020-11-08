let wrapper = document.querySelector('.wrapper');
let startTime;
let endTime;
let timer;
wrapper.addEventListener('click', function(e) {

  if(wrapper.classList.contains('ready')){
    let text = 'wait...';
    classControl('ready', 'wait', text);
    timer = setTimeout(function() {
      startTime = new Date();
      let text ='click!!';
      classControl('wait', 'go', text);
    }, Math.floor(Math.random()* 1000) + 2000);
  } else if (wrapper.classList.contains('wait')) {
    clearTimeout(timer);
    let text = 'to fast!!!';
    classControl('wait','result', text);
  } else if(wrapper.classList.contains('go')){
    endTime = new Date();
    let time = endTime - startTime;
    let text = '반응 속도: ' + time + 'ms<br>click to start New Game';
    clearTimeout(timer);
    classControl('go', 'result', text);
  } else if(wrapper.classList.contains('result')){
    let text = '!!Reaction Game!!';
    classControl('result', 'ready', text);
  }

  function classControl(removeClass, addClass, text) {
    wrapper.classList.remove(removeClass);
    wrapper.classList.add(addClass);
    wrapper.innerHTML = text;
  }
});