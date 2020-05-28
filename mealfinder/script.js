//themealdb.com/api.php
//DOM search elements for div html ( id)
const search = document.getElementById('search'), //instead of using const again we just use comma
  submit = document.getElementById('submit'),
  random = document.getElementById('random'),
  mealsEl = document.getElementById('meals'),
  resultHeading = document.getElementById('result-heading'),
  single_mealEl = document.getElementById('single-meal');

// Search meal and fetch from API
function searchMeal(e) { //this will fetch the meals from the mealdb database , loop through and display in DOM
  e.preventDefault(); //prevents default behaviour

  // Clear single meal
  single_mealEl.innerHTML = ''; //this clears the display of single meals

  // Get search term
  const term = search.value; //this gives us the value, not the element

  // Check for empty
  if (term.trim()) { //making sure something is submited in search field .trim() to remove white space
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`) //we make a fetch get request to db
      .then(res => res.json()) //we catch a promise with .then which gives a response (res) which we have to format to json
      .then(data => { //this returns another promise which gives us the data
        console.log(data);
        resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`; //displays search results for term

        if (data.meals === null) { // if meals equals null display message below
          resultHeading.innerHTML = `<p>There are no search results. Try again!<p>`;
        } else { //if there are meals, map through list and display the following using map
          mealsEl.innerHTML = data.meals
            .map(
              meal => `
            <div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
              <div class="meal-info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
              </div>
            </div>
          `
            )
            .join(''); //this enables the html block to display as a string
        }
      });
    // Clear search text
    search.value = '';
  } else {
    alert('Please enter a search term'); // this alert displays if empty search is submitted
  }
}

// Fetch meal by ID
function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`) //fetch mealId data
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0]; // getting the fist value from the data array

      addMealToDOM(meal);
    });
}

// Fetch random meal from API
function getRandomMeal() {
  // Clear meals and heading
  mealsEl.innerHTML = '';
  resultHeading.innerHTML = '';

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
}

// Add meal to DOM
function addMealToDOM(meal) {
  const ingredients = []; //creating an array called ingredients

  for (let i = 1; i <= 20; i++) { // we create a for loop that will only display a maximum of 20 ingredients
    if (meal[`strIngredient${i}`]) { //check for actual ingredients in db
      ingredients.push( //if there are, display ingredient and measure from db
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break; //once all ingredients are displayed we break out of the loop
    }
  }
  //displaying the single meal details in DOM
  single_mealEl.innerHTML = `
    <div class="single-meal">
      <h2>${meal.strMeal}</h2>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
}

// Event listeners - submit action and random meal action
submit.addEventListener('submit', searchMeal);
random.addEventListener('click', getRandomMeal);

mealsEl.addEventListener('click', e => {
  const mealInfo = e.path.find(item => {
    if (item.classList) {
      return item.classList.contains('meal-info'); //check to see if there is a class of 'meal-info'
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealID = mealInfo.getAttribute('data-mealid'); //
    getMealById(mealID);
  }
});