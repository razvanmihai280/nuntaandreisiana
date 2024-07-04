document.addEventListener('DOMContentLoaded', function () {
  const scriptURL = 'https://script.google.com/macros/s/AKfycbwvdfD5T-KYmiIQxIel9x_-J-9myLEqeD1ZN_OM-lnxpssmEud02ni7FZJj37ymTgsxDQ/exec';
  const form = document.forms['contact-form'];
  const modal = document.getElementById("myModal");
  const span = document.getElementsByClassName("close")[0];

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    // Afișează modalul imediat după apăsarea butonului de submit
    modal.style.display = "flex";

    // Trimite datele formularului
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(response => {
        console.log('Success!', response);
      })
      .catch(error => console.error('Error!', error.message));
  });

   // Închide modalul când utilizatorul face clic pe <span> (x)
   span.onclick = function () {
    modal.style.display = "none";
    window.location.reload();
  }

  // Închide modalul când utilizatorul face clic oriunde în afara modalului
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      window.location.reload();
    }
  }

  // Funcție pentru a închide modalul
  window.closeModal = function () {
    modal.style.display = "none";
    window.location.reload();
  }
});