'use strict';

function BusMall(name, src) {
  this.name = name;
  this.src = src;
  this.clickCtr = 0;
  this.shownCtr = 0;
  BusMall.all.push(this);
}

BusMall.roundCtr = 0;
BusMall.roundLimit = 15;

BusMall.all = [];

BusMall.container = document.getElementById('busMall-container');
BusMall.leftImage = document.getElementById('left-busMall-image');
BusMall.middleImage = document.getElementById('middle-busMall-image');
BusMall.rightImage = document.getElementById('right-busMall-image');

BusMall.leftname = document.getElementById('left-busMall-name');
BusMall.middlename = document.getElementById('middle-busMall-name');
BusMall.rightname = document.getElementById('right-busMall-name');

BusMall.leftObject = null;
BusMall.middleObject = null;
BusMall.rightObject = null;

new BusMall('Bathroom', 'images/bathroom.jpg');
new BusMall('Boots', 'images/boots.jpg');
new BusMall('Breakfast', 'images/breakfast.jpg');
new BusMall('Bubblegum', 'images/bubblegum.jpg');
new BusMall('Chair', 'images/chair.jpg');
new BusMall('Cthulhu', 'images/cthulhu.jpg');
new BusMall('Dog Duck', 'images/dog-duck.jpg');
new BusMall('Dragon', 'images/dragon.jpg');
new BusMall('Pen', 'images/pen.jpg');
new BusMall('Pet sweep', 'images/pet-sweep.jpg');
new BusMall('Scissors', 'images/scissors.jpg');
new BusMall('Shark', 'images/shark.jpg');
new BusMall('Sweep', 'images/sweep.png');
new BusMall('Tauntaun', 'images/tauntaun.jpg');
new BusMall('Unicorn', 'images/unicorn.jpg');
new BusMall('USB', 'images/usb.gif');
new BusMall('Water Can', 'images/water-can.jpg');
new BusMall('Wine Glass', 'images/wine-glass.jpg');

function renderNewbusMalls() {

  var forbidden = [BusMall.leftObject, BusMall.middleObject, BusMall.rightObject];

  do {

    BusMall.leftObject = getRandombusMall();

  } while (forbidden.includes(BusMall.leftObject))

  forbidden.push(BusMall.leftObject);


  do {

    BusMall.middleObject = getRandombusMall();

  } while (forbidden.includes(BusMall.middleObject));

  forbidden.push(BusMall.middleObject);
  do {

    BusMall.rightObject = getRandombusMall();

  } while (forbidden.includes(BusMall.rightObject));



  BusMall.leftObject.shownCtr++;
  BusMall.rightObject.shownCtr++;
  BusMall.middleObject.shownCtr++;

  var leftbusMallImageElement = BusMall.leftImage;
  var middlebusMallImageElement = BusMall.middleImage;
  var rightbusMallImageElement = BusMall.rightImage;

  leftbusMallImageElement.setAttribute('src', BusMall.leftObject.src);
  leftbusMallImageElement.setAttribute('alt', BusMall.leftObject.name);

  middlebusMallImageElement.setAttribute('src', BusMall.middleObject.src);
  middlebusMallImageElement.setAttribute('alt', BusMall.middleObject.name);

  rightbusMallImageElement.setAttribute('src', BusMall.rightObject.src);
  rightbusMallImageElement.setAttribute('alt', BusMall.rightObject.name);

  BusMall.leftname.textContent = BusMall.leftObject.name;
  BusMall.middlename.textContent = BusMall.middleObject.name;
  BusMall.rightname.textContent = BusMall.rightObject.name;
}

function getRandombusMall() {
  var index = Math.floor(Math.random() * BusMall.all.length);
  return BusMall.all[index];
}


function randomInRange(min, max) {
  var range = max - min + 1;
  var rand = Math.floor(Math.random() * range) + min
  return rand;
}

function updateTotals() {

  var parentElement = document.getElementById('report');

  parentElement.innerHTML = '';

  var ul = document.createElement('ul');
  parentElement.appendChild(ul);

  for (var i = 0; i < BusMall.all.length; i++) {
    var busMall = BusMall.all[i];
    var li = document.createElement('li');
    li.textContent = busMall.name + 'had ' + busMall.clickCtr + ' votes and was shown ' + busMall.shownCtr;
    ul.appendChild(li);
  }
}


function addElement(tag, container, text) {
  var element = document.createElement(tag);
  container.appendChild(element);
  if (text) {
    element.textContent = text;
  }
  return element;
}



function clickHandler(event) {
// to store which was clicked 
  var clickedId = event.target.id;
  var busMallClicked;

  if (clickedId === 'left-busMall-image') {
    busMallClicked = BusMall.leftObject;
  } else if (clickedId === 'middle-busMall-image') {
    busMallClicked = BusMall.middleObject;
  } else if (clickedId === 'right-busMall-image') {
    busMallClicked = BusMall.rightObject;
  } else {
    console.log('Um, what was clicked on???', clickedId);
  }
// check the truthy of the clicking
  if (busMallClicked) {
    busMallClicked.clickCtr++;
    BusMall.roundCtr++;

    updateTotals();

    if (BusMall.roundCtr === BusMall.roundLimit) {

      alert('More than 25 attempts are not allowed!');
      updateVotes();
      getVotes();

      BusMall.container.removeEventListener('click', clickHandler);

    } else {

      renderNewbusMalls();
    }
  }
}


BusMall.container.addEventListener('click', clickHandler);

updateTotals();

renderNewbusMalls();


var votes = document.getElementById('votes');

// to check the number of votes
function updateVotes() {

  var trackVotesArray = [];
  for (var i = 0; i < BusMall.all.length; i++) {
    var trackvotes = BusMall.all[i];
    trackVotesArray.push(trackvotes)

  }
  var votesString = JSON.stringify(trackVotesArray);
  localStorage.setItem('votes', votesString);


}
function getVotes() {
  var busMallData = JSON.parse(localStorage.getItem('orders')); // the busMallData but needs to be an array to support many object arrays

  if (busMallData) {
    for (var i = 0; i < busMallData.length; i++) {

      new busMallObject( // // I saw this hint as to consider busMallObjet as an array first to push data to it 
      //  https://stackoverflow.com/questions/14234646/adding-elements-to-object/14234701
        rawBusMallObject.name,
        rawBusMallObject.src,
        rawBusMallObject.clickCtr,
        rawBusMallObject.shownCtr 
      );

    }
    for (var i = 0; i < busMallData.length; i++) {
      var busMallObjectToArray = [];

     busMallObjectToArray[i] =  rawBusMallObject.name,
     busMallObjectToArray[i - 1] = rawBusMallObject.src,
     busMallObjectToArray[i -2]  =  rawBusMallObject.clickCtr,
     busMallObjectToArray[i - 3] = rawBusMallObject.shownCtr

    }
    busMallObjectToArray.push(busMallData[i]);
  }
  renderNewbusMalls();
}
// Then I got the idea instead of converting to an array is to assign values to the object as we are used to this way
// https://stackoverflow.com/questions/11057802/add-new-element-to-an-existing-object
// but neither has worked ! :|

