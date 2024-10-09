window.addEventListener('DOMContentLoaded', function() {
  // Typewriter effect
  const typewriterElement = document.getElementById('typewriter');
  const fullText = typewriterElement.textContent;
  typewriterElement.textContent = '';
  let index = 0;

  function typeWriter() {
    if (index < fullText.length) {
      typewriterElement.textContent += fullText.charAt(index);
      index++;
      setTimeout(typeWriter, 50);
    }
  }
  typeWriter();

  // Slideshow effect
  let imageIndex = 1; // Start from the first image
  const totalImages = 50; // Total number of images
  const slideshowElement = document.getElementById('slideshow');

  function rotateImages() {
    imageIndex++;
    if (imageIndex > totalImages) {
      imageIndex = 1; // Loop back to the first image
    }
    slideshowElement.src = `images/flower${imageIndex}.png`;
  }

  // Change image every 3 seconds
  setInterval(rotateImages, 1000);
});
