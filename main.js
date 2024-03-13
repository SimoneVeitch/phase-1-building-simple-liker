document.getElementById("modal").classList.add("hidden");

document.addEventListener("DOMContentLoaded", function() {
  function addEventListenerToHeart() {
    const errorModal = document.getElementById("modal");
    const EMPTY_HEART = '♡'
    const FULL_HEART = '♥'
    let hearts = document.querySelectorAll(".like-glyph");
    for (let heart of hearts) {
      heart.addEventListener('click', function () {
        console.log('Heart clicked');
       // Check if the heart is currently empty or full
       if (heart.textContent === EMPTY_HEART) {
        // Server call 
        mimicServerCall()
        .then(function(response){
          // If succesful change color of heart
        heart.textContent = FULL_HEART;
        heart.classList.add("activated-heart");
      })
      .catch(function(error) {
        // If failure display error modal
        errorModal.classList.remove("hidden");
        document.getElementById("modal-message").textContent = error;

        // Hide after 3 seconds
        setTimeout(function() {
          errorModal.classList.add("hidden");
        }, 3000);
        });
      } else if (heart.textContent === FULL_HEART) {
        // Change the full heart back to an empty heart and remove the .activated-heart class
        heart.textContent = EMPTY_HEART;
        heart.classList.remove("activated-heart");
      }
      });
    }
}
addEventListenerToHeart();
}); 
  
//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
