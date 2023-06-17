const form = document.getElementById('subscribe-form');
const successMessage = document.getElementById('success-message');
const joinText = document.querySelector('.join-text');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  const formData = new FormData(this);
  fetch(this.action, {
    method: 'POST',
    headers: {
      'Accept': 'application/json'
    },
    body: formData
  })
    .then(response => {
      if (response.ok) {
        form.style.display = 'none';
        successMessage.style.display = 'block';
        joinText.style.display = 'none';
      } else {
        throw new Error('Form submission failed');
      }
    })
    .catch(error => {
      console.error(error);
    });
});
