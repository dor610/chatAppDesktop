const form = document.getElementById('form');

form.addEventListener('submit', event =>{
  event.preventDefault();

  console.log($('#form').serialize());
})
