document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('openProfiles').addEventListener('click', function () {
    const profileLinks = [
      'https://www.linkedin.com/in/arushi-sambyal-4b3904259/',
      'https://www.linkedin.com/in/shilpa-sharma-49362822a/',
      'https://www.linkedin.com/in/divya-rana-72778621b/'
    ];
    profiles.forEach((profile, index) => {
      setTimeout(() => {
        chrome.tabs.create({ url: profile });
      }, index * 5000);
    });

    chrome.runtime.sendMessage({ action: "openProfiles", links: profileLinks }, (response) => {
      console.log(response.status); // Log response status
    });
  });
});
