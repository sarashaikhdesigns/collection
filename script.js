const video = document.getElementById('fullscreen-video');

// Play or pause the video based on scroll position
window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        video.play();
    } else {
        video.pause();
    }
});
