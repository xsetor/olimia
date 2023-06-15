window.addEventListener('load', function() {
  const loader = document.querySelector('.loader');
  const videoContainer = document.querySelector('.video-container');
  const videos = Array.from(document.querySelectorAll('.background-video'));
  const logo = document.querySelector('.logo');

  let currentVideoIndex = 0;

  function playNextVideo() {
    const currentVideo = videos[currentVideoIndex];
    const nextVideoIndex = (currentVideoIndex + 1) % videos.length;
    const nextVideo = videos[nextVideoIndex];

    if (currentVideo) {
      currentVideo.style.display = 'none';
      currentVideo.pause();
      currentVideo.currentTime = 0;
    }

    if (nextVideo) {
      nextVideo.style.display = 'block';
      nextVideo.play().then(() => {
        if (currentVideo) {
          currentVideo.style.display = 'none';
        }
      }).catch((error) => {
        console.error('Error playing video:', error);
      });
    }

    currentVideoIndex = nextVideoIndex;
  }

  function handleClick(event) {
    if (event.target !== logo) {
      playNextVideo();
    }
  }

  document.addEventListener('click', function(event) {
    if (event.target.tagName.toLowerCase() !== 'video') {
      playNextVideo();
    } else {
      event.preventDefault();
    }
  });

  videos.forEach((video, index) => {
    if (index !== 0) {
      video.style.display = 'none';
    }
  });

  if (!(/Mobi|Android/i.test(navigator.userAgent))) {
    videos[currentVideoIndex].play().catch((error) => {
      console.error('Error playing video:', error);
    });
  }

  setTimeout(function() {
    loader.style.display = 'none';
    if (videoContainer) {
      videoContainer.style.display = 'block';
    }
  }, 100);
});


document.addEventListener("DOMContentLoaded", function() {
  // Get the form and input elements
  var form = document.querySelector("form");
  var emailInput = document.getElementById("email-input");

  // Add submit event listener to the form
  form.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Get the email value
    var email = emailInput.value;

    // Send the email using AJAX
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "subscribe.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        var response = xhr.responseText;
        if (response === "Success") {
          alert("Email subscribed successfully!");
        } else {
          alert("Error subscribing to email.");
        }
      }
    };
    xhr.send("email=" + email);
  });
});
