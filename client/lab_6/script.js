/* eslint-disable no-unused-vars */
function getRandIntInt(min, max) {
  const minNum = Math.ceil(min);
  const minMax = Math.floor(max);
  return Math.floor(
    Math.random() * (minMax - minNum + 1) + minNum
  );
}

function restoArrayMake(array) {
  console.log('fired dataHandler');
  const range = [...Array(15).keys()];
  const listItems = range.map((item, index) => {
    const restNum = getRandIntInt(0, array.length - 1);
    return array[restNum];
  });
  return listItems;
}

function makeList(collection) {
  console.log('fired HTML creator');
  console.log(collection);
  const targetList = document.querySelector('.resto-list');
  targetList.innerHTML = '';
  collection.forEach((item) => {
    const {name} = item;
    const displayName = name.toLowerCase();
    const injectThisItem = `<li>${displayName}</li>`;
    targetList.innerHTML += injectThisItem;
  });
}

async function mainEvent() { // the async keyword means we can make API requests
  console.log('script loaded');
  const form = document.querySelector('#form');
  const submit = document.querySelector('#submit');
  submit.style.display = 'none';
  const results = await fetch('/api/foodServicesPG'); // This accesses some data from our API
  const arrayFromJson = await results.json(); // This changes it into data we can use - an object
  console.log(arrayFromJson);
  if (arrayFromJson.data.length > 0) {
    submit.style.display = 'block';
    form.addEventListener('submit', async (submitEvent) => { // async has to be declared all the way to get an await
      submitEvent.preventDefault(); // This prevents your page from refreshing!
      console.log('form submission'); // this is substituting for a "breakpoint"
      const restoArray = restoArrayMake(arrayFromJson.data);
      makeList(restoArray);
    });
  }
}

document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests