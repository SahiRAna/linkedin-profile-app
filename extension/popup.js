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

  likeCountInput.addEventListener('input', checkInput);
  commentCountInput.addEventListener('input', checkInput);

  startButton.addEventListener('click', function () {
    const likeCount = parseInt(likeCountInput.value);
    const commentCount = parseInt(commentCountInput.value);

    // -----///----//
    chrome.runtime.sendMessage({
      action: 'startAutomation',
      likeCount,
      commentCount
    });


    window.close();
  });
});
