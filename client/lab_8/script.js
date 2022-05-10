/* eslint-disable no-unused-vars */

function initMap(targetId) {
  const latLong = [38.7849, -76.8721];
  const map = L.map(targetId).setView(latLong, 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
  }).addTo(map);
  return map;
}

function getRandInt(min, max) {
  const minNum = Math.ceil(min);
  const minMax = Math.floor(max);
  return Math.floor(
    Math.random() * (minMax - minNum + 1) + minNum
  );
}
    
function restArrayMake(array) {
  console.log('fired dataHandler');
  const range = [...Array(15).keys()];
  const listItems = range.map((item, index) => {
    const restNum = getRandInt(0, array.length - 1);
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
  const rest = document.querySelector('#rest_name');
  const pref = document.querySelector('#pref');
  const map = initMap('map');
  submit.style.display = 'none';
  const results = await fetch('/api/foodServicesPG'); // This accesses some data from our API
  const arrayFromJson = await results.json(); // This changes it into data we can use - an object
  console.log(arrayFromJson);
    
  if (arrayFromJson.data.length > 0) {
    submit.style.display = 'block';
    
    let currentArray = [];
    rest.addEventListener('input', async (event) => {
      console.log(event.target.value);
      if (currentArray.length < 1) { return; }
    
      const selectRest = currentArray.filter((item) => {
        const lowerName = item.name.toLowerCase();
        const lowerValue = event.target.value.toLowerCase();
        return lowerName.includes(lowerValue);
      });
      console.log(selectRest);
      makeList(selectRest);
    });
    
    pref.addEventListener('input', async (eventPref) => {
      console.log(eventPref.target.value);
      if (currentArray.length < 1) { return; }
      const selectPref = currentArray.filter((item) => item.pref.includes(eventPref.target.value));
      console.log(selectPref);
      makeList(selectPref);
    });
    
    form.addEventListener('submit', async (submitEvent) => { // async has to be declared all the way to get an await
      submitEvent.preventDefault(); // This prevents your page from refreshing!
      currentArray = restArrayMake(arrayFromJson.data);
      console.log(currentArray);
      makeList(currentArray);
    });
  }
}
    
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests