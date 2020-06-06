// adding the DOM elements
const toggle = document.getElementById('toggle');
const close = document.getElementById('close');
const open = document.getElementById('open');
const modal = document.getElementById('modal');

// Toggle nav
toggle.addEventListener('click', () =>
  document.body.classList.toggle('show-nav')
);

// Show modal
open.addEventListener('click', () => modal.classList.add('show-modal')); // id open on sign up button

// Hide modal
close.addEventListener('click', () => modal.classList.remove('show-modal')); //id close on modal

// Hide modal on outside click
window.addEventListener('click', e => // e is event parameter
  e.target == modal ? modal.classList.remove('show-modal') : false
); // if e.target is equal to modal then we remove 'show-modal' class otherwise return false