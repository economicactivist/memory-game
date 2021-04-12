const gameContainer = document.getElementById('game')

const COLORS = [
  'red',
  'blue',
  'green',
  'orange',
  'purple',
  'red',
  'blue',
  'green',
  'orange',
  'purple',
]

let selectedCards = []

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter)

    // Decrease counter by 1
    counter--

    // And swap the last element with it
    // let temp = array[counter]
    // array[counter] = array[index]
    // array[index] = temp

    // //modern way to swap
    [array[counter], array[index]] = [array[index], array[counter]]
  }

  return array
}

let shuffledColors = shuffle(COLORS)

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement('div')

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color)

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener('click', handleCardClick)

    // append the div to the element with an id of game
    gameContainer.append(newDiv)
  }
}

// Clicking a card should change the background color to be the color of the class it has.
// Users should only be able to change at most two cards at a time.
// Clicking on two matching cards should be a “match” — those cards should stay face up.
// When clicking two cards that are not a match, they should stay turned over for at least
// 1 second before they hide the color again. You should make sure to use a setTimeout so
// that you can execute code after one second.

// TODO: Implement this function!
let clickCounter = 0
let index = 0
let enableClick=true;
function handleCardClick(event) {
  if(!enableClick)
    return;
  // you can use event.target to see which element was clicked
  console.log('you just clicked', event.target)
  console.dir(event.target.style.backgroundColor)
  // console.log(gameContainer.childNodes)
  clickCounter++
  event.target.style.backgroundColor = `${event.target.classList.value}`


  selectedCards.push(event.target)
  if (clickCounter == 2 ) {
  
    console.log(selectedCards)
    if (isMatch(selectedCards)) {
      console.log("it's a match")
      for (let i of selectedCards) {
        i.removeEventListener('click', handleCardClick)
      }
      //empty array and reset counter
      selectedCards = []
      clickCounter = 0
      console.log(clickCounter)
      console.log(selectedCards)
      return
    }
    else
    {
      enableClick=false;
      setTimeout(()=>{ 
        for (let i of selectedCards) {
          i.style.backgroundColor=""
        }
        selectedCards = []
        clickCounter = 0
        console.log(clickCounter)
        console.log(selectedCards)
        enableClick=true;
        return
      },1000)
    }


    

    console.log(clickCounter)
  } 
}

const isMatch = selectedCardsArray => {
  if (selectedCardsArray[0].classList.value === selectedCardsArray[1].classList.value) {
    return true
  } else {
    return false
  }
}

// when the DOM loads
createDivsForColors(shuffledColors)
