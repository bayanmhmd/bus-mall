'use strict';
function Elemant(title, src) {
  this.title = title;
  this.src = src;
  this.click = 0;
  this.show = 0;
  Elemant.all.push(this);
}

Elemant.round = 0;
Elemant.roundLimit = 25;

Elemant.all = [];

Elemant.container = document.getElementById('item-container');
Elemant.leftImage = document.getElementById('leftimage');
Elemant.middleImage = document.getElementById('middleimage');
Elemant.rightImage = document.getElementById('rightimage');

Elemant.leftTitle = document.getElementById('lefttitle');
Elemant.middleTitle = document.getElementById('middletitle');
Elemant.rightTitle = document.getElementById('righttitle');

Elemant.leftObject = null;
Elemant.middleObject = null;
Elemant.rightObject = null;

new Elemant('bag', 'images/bag.jpg');
new Elemant('banana', 'images/banana.jpg');
new Elemant('bathroom', 'images/bathroom.jpg');
new Elemant('boots', 'images/boots.jpg');
new Elemant('breakfast', 'images/breakfast.jpg');
new Elemant('bubblegum', 'images/bubblegum.jpg');
new Elemant('chair', 'images/chair.jpg');
new Elemant('cthulhu', 'images/cthulhu.jpg');
new Elemant('dog-duck', 'images/dog-duck.jpg');
new Elemant('dragon', 'images/dragon.jpg');
new Elemant('pen', 'images/pen.jpg');
new Elemant('pet-sweep', 'images/pet-sweep.jpg');
new Elemant('scissors', 'images/scissors.jpg');
new Elemant('shark', 'images/shark.jpg');
new Elemant('sweep', 'images/sweep.png');
new Elemant('tauntaun', 'images/tauntaun.jpg');
new Elemant('unicorn', 'images/unicorn.jpg');
new Elemant('usb', 'images/usb.gif');
new Elemant('water-can', 'images/water-can.jpg');
new Elemant('wine-glass', 'images/wine-glass.jpg');
function renderItems() {

  var item = [Elemant.leftObject, Elemant.middleObject, Elemant.rightObject];

  do {

    Elemant.leftObject = getRandomGoat();

  } while (item.includes(Elemant.leftObject))

  item.push(Elemant.leftObject);

  do {

    Elemant.middleObject = getRandomGoat();

  } while (item.includes(Elemant.middleObject))

  item.push(Elemant.middleObject);
  do {

    Elemant.rightObject = getRandomGoat();

  } while (item.includes(Elemant.rightObject));



  Elemant.leftObject.show++;
  Elemant.middleObject.show++;
  Elemant.rightObject.show++;

  var leftImageElement = Elemant.leftImage;
  var middleImageElement = Elemant.middleImage;
  var rightItemImageElement = Elemant.rightImage;

  leftImageElement.setAttribute('src', Elemant.leftObject.src);
  leftImageElement.setAttribute('alt', Elemant.leftObject.title);
  middleImageElement.setAttribute('src', Elemant.middleObject.src);
  middleImageElement.setAttribute('alt', Elemant.middleObject.title);
  rightItemImageElement.setAttribute('src', Elemant.rightObject.src);
  rightItemImageElement.setAttribute('alt', Elemant.rightObject.title);

  Elemant.leftTitle.textContent = Elemant.leftObject.title;
  Elemant.middleTitle.textContent = Elemant.middleObject.title;
  Elemant.rightTitle.textContent = Elemant.rightObject.title;
}

function getRandomGoat() {
  var index = Math.floor(Math.random() * Elemant.all.length);
  return Elemant.all[index];
}


function randomInRange(min, max) {
  var range = max - min + 1;
  var rand = Math.floor(Math.random() * range) + min
  return rand;
}

// }

function addElement(tag, container, text) {
  var elemant = document.createElement(tag);
  container.appendChild(elemant);
  if (text) {
    elemant.textContent = text;
  }
  return elemant;
}

// }
function renderSentences() {
  console.log("hello");
  var container = document.getElementById('report-sentences');
  for (var i = 0; i < Elemant.all.length; i++) {

    var product = Elemant.all[i];
    var sentence = product.title + ' had ' + product.click + ' votes and was shown ' + product.show + 'times'
    addElement('p', container, sentence)
  }
}
function clickHand(event) {

  var clickedId = event.target.id;
  var itemClicked;

  if (clickedId === 'leftimage') {
    itemClicked = Elemant.leftObject;
  } else if (clickedId === 'middleimage') {
    itemClicked = Elemant.middleObject;
  } else if (clickedId === 'rightimage') {
    itemClicked = Elemant.rightObject;
  }
  else {
    console.log('how many time you clicked on???', clickedId);
  }

  if (itemClicked) {
    itemClicked.click++;
    Elemant.round++;

    // tableTotal();

    if (Elemant.round === Elemant.roundLimit) {

      alert('No more clicking for you!');

      Elemant.container.removeEventListener('click', clickHand);

      renderSentences();
      renderChart();
      var productString = JSON.stringify(Elemant.all);
      localStorage.setItem('products', productString);
    } else {

      renderItems();
    }
  }
}

Elemant.container.addEventListener('click', clickHand);

renderItems();

function makeAChart() {

  var productNamesArray = [];
  var productLikesArray = [];

  for (var i = 0; i < Elemant.all.length; i++) {
    var singlepictureName = Elemant.all[i];
    productNamesArray.push(singlepictureName.title);
  }

  for (var i = 0; i < Elemant.all.length; i++) {
    var singlePictureLikes = Elemant.all[i];
    productLikesArray.push(singlePictureLikes.click);
  }
}

function renderChart() {

  // Modified from https://jsfiddle.net/nagix/bL8hpk6n/

  var productNames = [];
  var productClicks = [];
  var productShown = [];

  for (var i = 0; i < Elemant.all.length; i++) {
    var currentProduct = Elemant.all[i];
    productNames.push(currentProduct.title);
    productClicks.push(currentProduct.click);
    productShown.push(currentProduct.show);

  }

  var data = {
    labels: productNames,
    datasets: [{
      label: "Clicked",
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderWidth: 1,
      data: productClicks,
      xAxisID: "bar-x-axis1",
    }, {
      label: "Shown",
      backgroundColor: 'rgba(255, 206, 86, 0.2)',
      borderWidth: 1,
      data: productShown,
      xAxisID: "bar-x-axis2",
    }]
  };

  var options = {
    scales: {
      xAxes: [{
        stacked: true,
        id: "bar-x-axis1",
        barThickness: 20,
      }, {
        display: false,
        stacked: true,
        id: "bar-x-axis2",
        barThickness: 40,
        // these are needed because the bar controller defaults set only the first x axis properties
        type: 'category',
        categoryPercentage: 0.8,
        barPercentage: 0.9,
        gridLines: {
          offsetGridLines: true
        },
        offset: true
      }],
      yAxes: [{
        stacked: false,
        ticks: {
          beginAtZero: true
        },
      }]

    }
  };

  var ctx = document.getElementById("chart").getContext("2d");
  var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: options
  });



}
function getStoredProducts() {

  // retreive the stored into about list of product
  var productString = localStorage.getItem('products');

  if (productString) {

    var rawObjectArray = JSON.parse(productString);

    for (var i = 0; i < rawObjectArray.length; i++) {
      var rawObject = rawObjectArray[i];
      var currentInstance = Elemant.all[i];
      currentInstance.click = rawObject.click;
      currentInstance.show = rawObject.show;
    }
  }
}


getStoredProducts();
