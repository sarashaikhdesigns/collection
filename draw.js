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
    html2canvas(imageContainer).then(function (canvas) {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'drawing.png'; // Set the downloaded file name
      link.click(); // Trigger download
    });
  });

  // Random image index
  function getRandomImageIndex() {
    return Math.floor(Math.random() * maxImages) + 1;
  }

  // Update cursor to show current image
  function updateCursor() {
    const randomImageURL = `images/r${currentImageIndex}.png`;
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
    };

    imageContainer.appendChild(image);
    currentImageIndex = getRandomImageIndex();
    updateCursor();
  });
});
