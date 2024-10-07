window.addEventListener('DOMContentLoaded', function() {
  // Get the element that contains the text
  const typewriterElement = document.getElementById('typewriter');
  const fullText = typewriterElement.textContent;

  // Clear the existing text content
  typewriterElement.textContent = '';

  let index = 0; // To track current character index

  // Function to handle the typewriter effect
  function typeWriter() {
    if (index < fullText.length) {
      // Append the next character
      typewriterElement.textContent += fullText.charAt(index);
      index++;
      // Set a delay before typing the next character (you can adjust the speed here)
      setTimeout(typeWriter, 50);
    }
  }

  // Start the typewriter effect
  typeWriter();
});

