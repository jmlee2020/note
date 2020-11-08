let imageXY = 0;
const choiceDic = {
  '바위': '0',
  '가위': '-135px',
  '보': '-285px'
};
const scoreDic = {
  '가위': 1,
  '바위': 0,
  '보': -1
};

function computerSelect(imageXY){
  return Object.entries(choiceDic).find(function(v) {
    return v[1] == imageXY;
  })[0];
}

let interval = setInterval(function() {
  if(imageXY == 0){
    imageXY = choiceDic['가위'];
  } else if(imageXY == choiceDic['가위']) {
    imageXY = choiceDic['보'];
  } else {
    imageXY = 0;
  }
  document.querySelector('.computer').style.backgroundPosition = imageXY + ' 0';
}, 1000);

let btn = document.querySelectorAll('.btn').forEach((btn) => {
  btn.addEventListener('click', (e)=> {
    clearInterval(interval);

    let mySelect=e.currentTarget.textContent;
    let compSelect= computerSelect(imageXY)
    console.log(mySelect, compSelect);
    
    let result = scoreDic[mySelect] - scoreDic[compSelect];
    let ifResult = result % 3;
    if(result == 0) {
      console.log('무승부');
    } else if ([-1,2].includes(ifResult)) {
      console.log('유저의 승리!');
    } else if ([1, -2].includes(ifResult)) {
      console.log('컴퓨터의 승리!');
    }
  });
});