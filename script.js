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

    currentVideo.style.display = 'none';
    nextVideo.style.display = 'block';

    currentVideo.pause();
    currentVideo.currentTime = 0;

    currentVideoIndex = nextVideoIndex;

    nextVideo.play().then(() => {
      currentVideo.style.display = 'none';
    }).catch((error) => {
      console.error('Error playing video:', error);
    });
  }

  function handleClick(event) {
    if (event.target !== logo) {
      playNextVideo();
    }
  }

  document.addEventListener('click', handleClick);

  videos.forEach((video, index) => {
    if (index !== 0) {
      video.style.display = 'none';
    }
  });

  videos[currentVideoIndex].play().catch((error) => {
    console.error('Error playing video:', error);
  });

  setTimeout(function() {
    loader.style.display = 'none';
    videoContainer.style.display = 'block';
  }, 100);

  setInterval(function() {
    playNextVideo();
  }, 30000); // Change video every 30 seconds
});
