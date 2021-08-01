const closeBtn = document.getElementById('close');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const main = document.querySelector('main');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');

const data = [
  {
    image: './images/drink.jpg',
    text: "I'm Thirsty",
  },
  {
    image: './images/food.jpg',
    text: "I'm Hungry",
  },
  {
    image: './images/tired.jpg',
    text: "I'm Tired",
  },
  {
    image: './images/hurt.jpg',
    text: "I'm Hurt",
  },
  {
    image: './images/happy.jpg',
    text: "I'm Happy",
  },
  {
    image: './images/angry.jpg',
    text: "I'm Angry",
  },
  {
    image: './images/sad.jpg',
    text: "I'm Sad",
  },
  {
    image: './images/scared.jpg',
    text: "I'm Scared",
  },
  {
    image: './images/outside.jpg',
    text: 'I Want To Go Outside',
  },
  {
    image: './images/home.jpg',
    text: 'I Want To Go Home',
  },
  {
    image: './images/school.jpg',
    text: 'I Want To Go To School',
  },
  {
    image: './images/grandma.jpg',
    text: 'I Want To Go To Grandmas',
  },
];

// data.forEach(createBox);

// // Create speech boxes
// function createBox(item) {
//   const box = document.createElement('div');
//   const { image, text } = item;
//   box.classList.add('box');
//   box.innerHTML = `
//     <img src="${image}" alt="${text}" />
//     <p class="info">${text}</p>
//   `;
//   box.addEventListener('click', () => {
//     setTextMessage(text);
//     speakText();
//     // Add active effect
//     box.classList.add('active');
//     setTimeout(() => box.classList.remove('active'), 800);
//   });
//   //we now have box div class inside main tags
//   main.appendChild(box);
// }

data.forEach((item) => {
  const box = document.createElement('div');
  const { image, text } = item;
  box.classList.add('box');
  box.innerHTML = `	
    <img src="${image}" alt="${text}" />	
    <p class="info">${text}</p>	
  `;
  box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();
    // Add active effect
    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'), 800);
  });
  //we now have box div class inside main tags
  main.appendChild(box);
});

// Init speech synthesis
const message = new SpeechSynthesisUtterance();
// console.log(message);

// Store voices
let voices = [];

function getVoices() {
  //get the data
  voices = speechSynthesis.getVoices();

  //
  voices.forEach((voice) => {
    const option = document.createElement('option');
    option.value = voice.name;
    //the text that appears is name lang (visible to us)
    option.innerText = `${voice.name} ${voice.lang}`;

    // now inside the select, we have option tags with above value and text property attribute
    voicesSelect.appendChild(option);
  });
}

// set Text
//message has initiated on line 81,
//right hand side text is the one we are getting from line 69 after destructuring data
function setTextMessage(text) {
  message.text = text;
}

function speakText() {
  speechSynthesis.speak(message);
}

// Voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices);

// Set Voice
// voice is the property,
// we are iterating to all the voices and whatever the name we have selected that we are setting it
function setVoice(e) {
  message.voice = voices.find((voice) => voice.name === e.target.value);
}

// Toggle text box
toggleBtn.addEventListener('click', () =>
  //now the text-box class will toggle with show class
  document.getElementById('text-box').classList.toggle('show')
);

// Close text box with X click button
closeBtn.addEventListener('click', () =>
  //now the text-box class with show class will be removed
  document.getElementById('text-box').classList.remove('show')
);

//selecting from the dropdown
voicesSelect.addEventListener('change', setVoice);

// read whatever we are typing in the toggleTextBox
readBtn.addEventListener('click', () => {
  setTextMessage(textarea.value);
  speakText();
});

getVoices();
