const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMill = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calcWealthBtn = document.getElementById('calculate-wealth');

let data = []; // create empty array

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
    money: Math.floor(Math.random() * 1000000) //randomises number up to million
  }

  addData(newUser);
}
//DOUBLE USERS MONEY using Map method
function doubleMoney() { // map will take original array and mutate it any way we want
  data = data.map(user => { //data variable is reassigned because its Let variable
    return {
      ...user,
      money: user.money * 2
    }; //multiplies money value by 2 (double)
  });

  updateDOM(); //clear the main div and replaces based on new event
}

//SORT USERS BY RICHEST using SORT method
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

// Add new obj to data array
function addData(obj) {
  data.push(obj); //using the push method to put something at the end of array

  updateDOM();
}

//Update DOM
function updateDOM(provideData = data) {
  //clear the main div / replace
  main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';

  provideData.forEach(item => {
    const element = document.createElement('div'); // this variable will create a html element (div)
    element.classList.add('person'); //adding a 'person' class to element variable
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    main.appendChild(element); // using formatMoney function to change numbers into currency.
  });

  //FORMAT NUMBER AS MONEY - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
  function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); //changes numbers to currency
  }
}

//EVENT LISTENERS
addUserBtn.addEventListener('click', getRandomUser); //when addUserBtn is clicked it will generate a new random user by getRandomUser function
doubleBtn.addEventListener('click', doubleMoney); // when doubleBtn is clicked it will multiply the currency of current users
sortBtn.addEventListener('click', sortByRichest); //when clicked will sort users by richest