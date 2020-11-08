let colorList = [
  'red', 'orange', 'yellow', 'green', 'white', 'pink',
  'red', 'orange', 'yellow', 'green', 'white', 'pink'
];
let styleDic = {
  cardCover: 'cardMatching',
  card: 'card',
  cardInner: 'card-inner',
  cardFront: 'card-front',
  cardBack: 'card-back',
  status: {
    flipped: 'flipped'
  }
};
let colorCandidate = [];
let colorSet = [];
let startBtn = document.querySelector('.gameStart');
let gameDiv = document.createElement('div');
let openCard = [];
let success = [];
let hor = 4;
let ver = 3;
let cardCount = hor * ver;
let gameStartFlag = false;


startBtn.addEventListener('click', gameSet);

// game Set
function gameSet(){
  if(gameStartFlag) {
    let msg = confirm('new Game');
    if(!msg) return;
  }
  initData();
  colorShuffle();
  cardSetting();
  preview();
}

function initData() {
  colorSet = [];
  gameStartFlag = false;
}

function colorShuffle() {
  colorCandidate = colorList.slice();
  for(let i = 0; i < cardCount; i++) {
    colorSet.push(colorCandidate.splice(Math.floor(Math.random() * colorCandidate.length-1), 1));
  }
}

function cardSetting(){
  gameDiv.className = styleDic.cardCover;
  gameDiv.innerHTML = '';

  for(let i = 0; i < cardCount; i++){

    let card = document.createElement('div');
    let cardInner = document.createElement('div');
    let cardFront = document.createElement('div');
    let cardBack = document.createElement('div');

    card.className = styleDic.card;
    cardInner.className = styleDic.cardInner;
    cardFront.className = styleDic.cardFront;
    cardBack.className = styleDic.cardBack;

    cardBack.style.backgroundColor = colorSet[i];    

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    gameDiv.appendChild(card);

    document.body.appendChild(gameDiv);
    
    card.addEventListener('click', function(e) {
      // preview 도중, 또는 게임 시작 전 클릭 방지
      if(!gameStartFlag) {
        return;
      }
      // 카드 2개 이상 뒤집기 방지
      if(openCard.length == 2) {
        return;
      }
      // 같은 카트 클릭 방지
      let classCount = e.currentTarget.classList.length;
      let nestedFlag = false;
      for(let i = 0; i < classCount; i++ ){
        if(e.currentTarget.classList[i] == styleDic.status.flipped){
          nestedFlag = true;
          break;
        }
      }
      if(nestedFlag) {
        return;
      }
      // 클릭 이벤트 설정
      e.currentTarget.classList.toggle(styleDic.status.flipped);
      let cardList = document.querySelectorAll('.' + styleDic.card);
      for(let i = 0; i < cardList.length; i++){
        if (cardList[i] == e.currentTarget) {
          openCard.push(i);
          break;
        }
      }

      if(openCard.length == 2) {
        let card1 = colorSet[openCard[0]].toString(); 
        let card2 = colorSet[openCard[1]].toString();

        let number = openCard[0].toString();
        let number2 = openCard[1].toString();

        setTimeout(function(){
          if(card1 == card2){
            success.push(openCard[0]);
            success.push(openCard[1]);
          }else {
            cardList[number].classList.remove(styleDic.status.flipped);
            cardList[number2].classList.remove(styleDic.status.flipped);
          }
          openCard = [];
          if(success.length == cardCount) {
            endGame();
          }
        }, 800);
      }

      function endGame(){
        setTimeout(function() {
          alert('게임 끝!');
        }, 100);
      };
      
      
    });
  
  }
}

function preview() {
  if(gameStartFlag == true) {
    return;
  }else {
    let cardList = document.querySelectorAll('.' + styleDic.card);
    cardList.forEach(function(card) {
      card.classList.add(styleDic.status.flipped);
  
      setTimeout(function() {
        card.classList.remove(styleDic.status.flipped);
        gameStartFlag = true;
      }, 1000);
    });
  }
}

