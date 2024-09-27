// Listen for messages from the popup or other parts of the extension ----1st Part
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'startAutomation') {

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (!tabs || tabs.length === 0) {
                console.error("No active tab found.");
                return;
            }

            const activeTab = tabs[0];
            console.log("Active Tab URL: ", activeTab.url);

            // Ensure the tab URL includes LinkedIn's feed
            if (activeTab.url && activeTab.url.includes('linkedin.com/feed')) {
                console.log("On LinkedIn feed, executing automation...");

                // Inject the script to the LinkedIn feed tab
                chrome.scripting.executeScript({
                    target: { tabId: activeTab.id },
                    function: startAutomation,
                    args: [message.likeCount, message.commentCount]
                });
            } else {
                console.error("Not on LinkedIn feed page.");
            }
        });
    }
});
//----2nd Part----
function startAutomation(likeCount, commentCount) {
    console.log(`Starting automation with likeCount: ${likeCount}, commentCount: ${commentCount}`);

    const posts = document.querySelectorAll('div.feed-shared-update-v2');
    console.log(`Found ${posts.length} posts.`);

    if (posts.length === 0) {
        console.log("No posts found.");
        return;
    }

    let likedPosts = 0;
    let commentedPosts = 0;

    const processPost = (index) => {
        if (index >= posts.length || (likedPosts >= likeCount && commentedPosts >= commentCount)) {
            console.log("Finished liking and commenting.");
            return;
        }

        const post = posts[index];
        const userNameElement = post.querySelector('.feed-shared-actor__name');
        const userName = userNameElement ? userNameElement.innerText : 'Sahil Rana';

        // Like posts
        if (likedPosts < likeCount) {
            const likeButton = post.querySelector('button[aria-label="React Like"], button[aria-label="Like"], button[data-control-name="like_button"]');
            if (likeButton) {
                setTimeout(() => {
                    likeButton.click();
                    likedPosts++;
                    console.log(`Liked post ${index + 1} by ${userName}`);

                    // Automatically prompt for a comment after liking
                    const commentButton = post.querySelector('button[aria-label="Comment"], button[aria-label="Add a comment"]');
                    if (commentButton && commentedPosts < commentCount) {
                        commentButton.click();
                        console.log(`Clicked comment button for post ${index + 1}`);

                        // Prompt user for a unique comment for each post
                        const userComment = prompt(`Enter your comment for post by ${userName}:`);

                        if (userComment) {
                            const tryFindCommentBox = (attempts) => {
                                if (attempts <= 0) {
                                    console.log(`Comment box not found for post ${index + 1}`);
                                    return;
                                }

                                const commentBox = post.querySelector('textarea[aria-label*="comment"], textarea[aria-label*="Add a comment"]');
                                if (commentBox) {

                                    commentBox.value = userComment; // Use user input for comment
                                    commentBox.dispatchEvent(new Event('input', { bubbles: true })); // Trigger input event
                                    commentBox.focus(); // Ensure the focus is on the comment box

                                    const submitButton = post.querySelector('button[aria-label="Post comment"], button[aria-label="Send"]');
                                    if (submitButton) {
                                        submitButton.click();
                                        commentedPosts++;
                                        console.log(`Commented on post ${index + 1} by ${userName}`);
                                    } else {
                                        console.log(`Submit button not found for post ${index + 1}:`, post.innerHTML);
                                    }
                                } else {
                                    setTimeout(() => tryFindCommentBox(attempts - 1), 500); // Retry finding the comment box
                                }
                            };

                            tryFindCommentBox(3);
                        } else {
                            console.log(`No comment provided for post ${index + 1}`);
                        }
                    } else {
                        console.log(`Comment button not found or comment limit reached for post ${index + 1}:`, post.innerHTML);
                    }
                }, 3000); // Set a delay before liking/commenting
            } else {
                console.log(`Like button not found for post ${index + 1}:`, post.innerHTML);
            }
        } else {
            console.log(`Like limit reached for post ${index + 1}`);
        }


        setTimeout(() => processPost(index + 1), 3000);
    };

    processPost(0);
}
