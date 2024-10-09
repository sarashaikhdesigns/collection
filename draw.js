document.addEventListener('DOMContentLoaded', function () {
  const imageContainer = document.getElementById('draw');
  const refreshButton = document.getElementById('refreshButton');
  const saveButton = document.getElementById('saveButton');
  const maxImages = 50;
  let currentImageIndex = getRandomImageIndex();
  let zIndexCounter = 1;

  // Refresh/clear button functionality
  refreshButton.addEventListener('click', function () {
    while (imageContainer.firstChild) {
      imageContainer.removeChild(imageContainer.firstChild);
    }
    currentImageIndex = getRandomImageIndex();
    updateCursor();
  });

  // Save button functionality
  saveButton.addEventListener('click', function () {
    // Ensure all images have loaded before capturing
    const images = imageContainer.getElementsByTagName('img');
    const promises = Array.from(images).map(img => {
      return new Promise((resolve) => {
        if (img.complete) {
          resolve();
        } else {
          img.onload = resolve;
          img.onerror = resolve; // Resolve on error too to avoid being stuck
        }
      });
    });

    // After all images are loaded, use html2canvas
    Promise.all(promises).then(() => {
      html2canvas(imageContainer, {
        useCORS: true,
        allowTaint: false,
        logging: true,
        scrollX: 0,
        scrollY: 0
      }).then(function (canvas) {
        const ctx = canvas.getContext('2d');
        
        const date = new Date();
        const timestamp = date.toLocaleString(); // Get current time
        const text = "#forgetmenot";
        
        ctx.font = '20px monospace';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'right';
        
        ctx.fillText(timestamp, canvas.width - 10, canvas.height - 30);
        ctx.fillText(text, canvas.width - 10, canvas.height - 10);

        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'your-art.png';
        link.click();
      }).catch(function (error) {
        console.error('Error capturing the canvas:', error);
      });
    });
  });

  // Random image index
  function getRandomImageIndex() {
    return Math.floor(Math.random() * maxImages) + 1;
  }

  // Update cursor to show current image
  function updateCursor() {
    const randomImageURL = `images/flower${currentImageIndex}.png`;
    imageContainer.style.cursor = `url(${randomImageURL}) 16 16, auto`;
  }

  // Set initial cursor
  updateCursor();

  // Add click event to the image container
  imageContainer.addEventListener('click', function (event) {
    const offsetX = event.offsetX;
    const offsetY = event.offsetY;

    const image = document.createElement('img');
    image.src = `images/flower${currentImageIndex}.png`;

    const randomWidth = Math.floor(Math.random() * 200) + 100;
    image.style.width = `${randomWidth}px`;

    const randomRotation = Math.floor(Math.random() * 360);
    image.style.transform = `rotate(${randomRotation}deg)`;
    image.style.pointerEvents = 'none';
    image.style.zIndex = zIndexCounter++;

    image.onload = function () {
      const imgWidth = image.clientWidth;
      const imgHeight = image.clientHeight;
      image.style.position = 'absolute';
      image.style.left = `${offsetX - imgWidth / 2}px`;
      image.style.top = `${offsetY - imgHeight / 2}px`;

      // Set a timer to add the fade-out class after 15 seconds
      setTimeout(() => {
        image.classList.add('fade-out');
        // Remove the image from the DOM after the fade effect is completed
        setTimeout(() => {
          imageContainer.removeChild(image);
        }, 10000); // Wait for the fade-out duration (1 second) before removing
      }, 20000); // 20 seconds
    };

    imageContainer.appendChild(image);
    currentImageIndex = getRandomImageIndex();
    updateCursor();
  });
});
