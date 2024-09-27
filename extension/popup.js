document.addEventListener('DOMContentLoaded', function () {
  const likeCountInput = document.getElementById('likeCount');
  const commentCountInput = document.getElementById('commentCount');
  const startButton = document.getElementById('startButton');

  // Enable the button only if both fields have values
  function checkInput() {
    const likeCount = likeCountInput.value;
    const commentCount = commentCountInput.value;

    if (likeCount && commentCount) {
      startButton.disabled = false;
    } else {
      startButton.disabled = true;
    }
  }

  // Listen for changes in the input fields
  likeCountInput.addEventListener('input', checkInput);
  commentCountInput.addEventListener('input', checkInput);

  // On button click, send message to background script
  startButton.addEventListener('click', function () {
    const likeCount = parseInt(likeCountInput.value);
    const commentCount = parseInt(commentCountInput.value);

    // Send data to background script
    chrome.runtime.sendMessage({
      action: 'startAutomation',
      likeCount,
      commentCount
    });

    // Close the popup
    window.close();
  });
});
