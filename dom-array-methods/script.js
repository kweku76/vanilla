const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMill = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calcWealthBtn = document.getElementById('calculate-wealth');

let data = [];

//fetch random user and add money - 

getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() { //using fetch and async await
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  }

  addData(newUser);
}
// Add new obj to data array
function addData(obj) {
  data.push(obj); //using the push method to put something at the end of array

  updateDom();
}

//Update DOM
function updateDom(provideData = data) {
  //clear the main div / replace
  main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';

  provideData.forEach(item => {
    const element = document.createElement('div'); // this variable will create a html element (div)
    element.classList.add('person'); //adding a 'person' class to element variable
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    main.appendChild(element); // using formatMoney function to change numbers into currency.
  });

  //Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
  function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); //changes numbers to currency
  }
}

//event listeners
addUserBtn.addEventListener('click', getRandomUser); //when addUserBtn is clicked it will generate a new random user by getRandomUser function