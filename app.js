'use strict';
function element(title, src) {
    this.title = title;
    this.src = src;
    this.click = 0;
    this.show = 0;
    element.all.push(this);
  }
  
  element.roundCtr = 0;
  element.roundLimit = 25;
  
  element.all = [];
  
  element.container = document.getElementById('item-container');
  element.leftImage = document.getElementById('leftimage');
  element.middleImage = document.getElementById('middleimage');
  element.rightImage = document.getElementById('rightimage');
  
  element.leftTitle = document.getElementById('lefttitle');
  element.middleTitle = document.getElementById('middletitle');
  element.rightTitle = document.getElementById('righttitle');
  
  element.leftObject = null;
  element.middleObject = null;
  element.rightObject = null;
  
  new element('bag', 'images/bag.jpg');
  new element('banana', 'images/banana.jpg');
  new element('bathroom', 'images/bathroom.jpg');
  new element('boots', 'images/boots.jpg');
  new element('breakfast', 'images/breakfast.jpg');
  new element('bubblegum', 'images/bubblegum.jpg');
  new element('chair', 'images/chair.jpg');
  new element('cthulhu', 'images/cthulhu.jpg');
  new element('dog-duck', 'images/dog-duck.jpg');
  new element('dragon', 'images/dragon.jpg');
  new element('pen', 'images/pen.jpg');
  new element('pet-sweep', 'images/pet-sweep.jpg');
  new element('scissors', 'images/scissors.jpg');
  new element('shark', 'images/shark.jpg');
  new element('sweep', 'images/sweep.png');
  new element('tauntaun', 'images/tauntaun.jpg');
  new element('unicorn', 'images/unicorn.jpg');
  new element('usb', 'images/usb.gif');
  new element('water-can', 'images/water-can.jpg');
  new element('wine-glass', 'images/wine-glass.jpg');
  function renderItems() {
  
    var forbidden = [element.leftObject, element.middleObject, element.rightObject ];
  
    do {
  
      element.leftObject = getRandomGoat();
  
    } while (forbidden.includes(element.leftObject))
  
    forbidden.push(element.leftObject);
  
    do {
  
      element.middleObject = getRandomGoat();
  
    } while (forbidden.includes(element.middleObject))
  
    forbidden.push(element.middleObject);
    do {
  
      element.rightObject = getRandomGoat();
  
    } while(forbidden.includes(element.rightObject));
  
    
    
    element.leftObject.shownCtr++;
    element.middleObject.shownCtr++;
    element.rightObject.shownCtr++;
  
    var leftImageElement = element.leftImage;
    var middleImageElement = element.middleImage;
    var rightItemImageElement = element.rightImage;
  
    leftImageElement.setAttribute('src', element.leftObject.src);
    leftImageElement.setAttribute('alt', element.leftObject.title);
    middleImageElement.setAttribute('src', element.middleObject.src);
    middleImageElement.setAttribute('alt', element.middleObject.title);
    rightItemImageElement.setAttribute('src', element.rightObject.src);
    rightItemImageElement.setAttribute('alt', element.rightObject.title);
  
    element.leftTitle.textContent = element.leftObject.title;
    element.middleTitle.textContent = element.middleObject.title;
    element.rightTitle.textContent = element.rightObject.title;
  }
  
  function getRandomGoat() {
    var index = Math.floor(Math.random() * element.all.length);
    return element.all[index];
  }
  
  //////
  function randomInRange(min, max) {
    var range = max - min + 1; 
    var rand = Math.floor(Math.random() * range) + min
    return rand;
  }
  
  function tableTotal() {
  
    var tableBody = document.getElementById('Table');
  
  
    tableBody.innerHTML = '';
    

    for (var i = 0; i < element.all.length; i++) {
      var item = element.all[i];
      var row = addElement('tr', tableBody);
      addElement('td', row, item.title);
      addElement('td', row, '' + item.click + ' times');
      addElement('td', row, '' + item.show + ' times');

    }
  }
  
  function addElement(tag, container, text) {
    var element = document.createElement(tag);
    container.appendChild(element);
    if(text) {
      element.textContent = text;
    }
    return element;
  }
  
  function clickHand(event) {
  
    var clickedId = event.target.id;
    var itemClicked;
  
    if(clickedId === 'leftimage') {
      itemClicked = element.leftObject;
    } else if (clickedId === 'middleimage') {
      itemClicked = element.middleObject;
    }else if (clickedId === 'rightimage') {
      itemClicked = element.rightObject;
    }
     else {
      console.log('Um, what was clicked on???', clickedId);
    }
  
    if(itemClicked) {
      itemClicked.clickCtr++;
      element.roundCtr++;
  
      tableTotal();
  
      if(element.roundCtr === element.roundLimit) {
  
        alert('No more clicking for you!');
  
        element.container.removeEventListener('click', clickHand);
  
      } else {
  
        renderItems();
      }
    }
  }
  
  //
  element.container.addEventListener('click', clickHand);
  
  tableTotal();
  
  renderItems();
