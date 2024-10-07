document.addEventListener('DOMContentLoaded', function () {
  const imageContainer = document.getElementById('draw'); // Get the section where images will be drawn
  const refreshButton = document.getElementById('refreshButton'); // Button to refresh/clear the images
  const doneButton = document.getElementById('doneButton'); // DONE button
  const scrollingTextContainer = document.getElementById('scrollingTextContainer'); // Scrolling text container
  const scrollingText = document.getElementById('scrollingText'); // Scrolling text element
  const maxImages = 50; // Number of flower images
  let currentImageIndex = getRandomImageIndex(); // Start with a random image

  // Event listener for the refresh button to clear all images
  refreshButton.addEventListener('click', function () {
    while (imageContainer.firstChild) {
      imageContainer.removeChild(imageContainer.firstChild); // Clear all images
    }
    currentImageIndex = getRandomImageIndex(); // Reset to a random image
    updateCursor(); // Update the cursor to the new image
  });

  // Function to get a random image number
  function getRandomImageIndex() {
    return Math.floor(Math.random() * maxImages) + 1; // Random number between 1 and 50
  }

  // Function to update the cursor to the current image
  function updateCursor() {
    const randomImageURL = `flower${currentImageIndex}.png`; // The image URL
    imageContainer.style.cursor = `url(${randomImageURL}) 16 16, auto`; // Set the cursor to the image
  }

  // Update the cursor on page load
  updateCursor();

  // Event listener for clicks on the image container
  imageContainer.addEventListener('click', function (event) {
    // Get the clicked coordinates relative to the container
    const offsetX = event.offsetX;
    const offsetY = event.offsetY;

    // Create a new image element
    const image = document.createElement('img');
    image.src = `images/flower${currentImageIndex}.png`; // Use the random flower image

    // Set random width for the image and maintain aspect ratio (height will auto-adjust)
    const randomWidth = Math.floor(Math.random() * 200) + 100; // Random width between 100px and 300px
    image.style.width = `${randomWidth}px`; // Set the width; height will auto-adjust

    // Generate a random rotation angle between 0 and 360 degrees
    const randomRotation = Math.floor(Math.random() * 360); // Random rotation between 0 and 359 degrees
    image.style.transform = `rotate(${randomRotation}deg)`; // Apply rotation

    // Ensure the image is only positioned after it's fully loaded
    image.onload = function () {
      const imgWidth = image.clientWidth;
      const imgHeight = image.clientHeight;

      // Position the image at the clicked coordinates, centered
      image.style.position = 'absolute';
      image.style.left = `${offsetX - imgWidth / 2}px`; // Center horizontally
      image.style.top = `${offsetY - imgHeight / 2}px`; // Center vertically
    };

    // Add the image to the container after setting up its onload handler
    imageContainer.appendChild(image);

    // After placing the image, get a new random image for the cursor
    currentImageIndex = getRandomImageIndex();
    updateCursor(); // Update the cursor to the new image
  });

  // Event listener for the DONE button to show scrolling text
  doneButton.addEventListener('click', function () {
    scrollingText.textContent = "You have completed your collection!"; // Set the text to scroll
    scrollingTextContainer.style.display = 'block'; // Show the container
  });
});
