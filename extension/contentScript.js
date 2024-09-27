function startAutomation(likeCount, commentCount) {
    let likedPosts = 0;
    let commentedPosts = 0;

    // Helper to randomly like a post
    function likePost(post) {
        const likeButton = post.querySelector('[aria-label="Like"]');
        if (likeButton && likedPosts < likeCount) {
            likeButton.click();
            likedPosts++;
        }
    }

    // Helper to post a comment
    function commentOnPost(post) {
        const commentButton = post.querySelector('[aria-label="Comment"]');
        if (commentButton && commentedPosts < commentCount) {
            commentButton.click();

            setTimeout(() => {
                const commentBox = post.querySelector('textarea');
                if (commentBox) {
                    commentBox.value = 'CFBR'; // Generic comment
                    commentBox.dispatchEvent(new Event('input', { bubbles: true }));

                    // Simulate posting the comment
                    const submitButton = post.querySelector('button[aria-label="Post comment"]');
                    if (submitButton) {
                        submitButton.click();
                        commentedPosts++;
                    }
                }
            }, 1000); // Small delay for comment box to load
        }
    }

    // Find all the posts in the LinkedIn feed
    const posts = document.querySelectorAll('.feed-shared-update-v2');

    posts.forEach(post => {
        if (likedPosts < likeCount) {
            likePost(post);
        }

        if (commentedPosts < commentCount) {
            commentOnPost(post);
        }
    });
}
