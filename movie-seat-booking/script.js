const container = document.querySelector('.container'); //grabs the class of .container (only 1)
const seats = document.querySelectorAll('.row .seat:not(.occupied)'); //grabs all the seats in the rows that are not occupied
const count = document.getElementById('count'); // grabs the span element with id count
const total = document.getElementById('total'); // grabs the span element with id total
const movieSelect = document.getElementById('movie'); // grabs the span element with id movie

populateUI();
let ticketPrice = +movieSelect.value; // ticketPrice equals the value of the id movie element + turns id into  number

//Saving selected movie index and price to LOCAL STORAGE
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}
//LOCAL STORAGE

//update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected'); //this will grab all the seets with selected class


  //LOCAL STORAGE
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
  //... is spread operator which will create a new array with the values
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
  //LOCAL STORAGE



  const selectedSeatsCount = selectedSeats.length; //this will give us the number of selected seats
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
  //the above will calculate the number of selected seats multiplied against ticket price $0
}

// Get data from local storage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) { //if selectedSeats is not null and is more than 0,
    seats.forEach((seat, index) => { //loop through seat and index..
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });


  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

//movie select event - each time a different movie is selected, its price will change and so the overall total will change
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;

  //LOCAL STORAGE
  setMovieData(e.target.selectedIndex, e.target.value); //saves the selected movie and price
  //LOCAL STORAGE
  updateSelectedCount();
});


//seat click event
container.addEventListener('click', e => {
  //console.log(e.target);  this will show any element clicked within the container in the console.
  if (e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
  //the above condition will make a grey seat toggle selected or if already selected toggle off

});

//LOCAL STORAGE - INITIAL COUNT SET
updateSelectedCount();