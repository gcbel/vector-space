/* VARIABLES */
const newCommentButton = document.querySelector("#new-comment");
const xCommentButton = document.querySelector("#x-out");
const newCommentSection = document.querySelector("#new-comment-section");
const commentNewComment = document.querySelector("#post-new-comment-button");
const commentContentAlert = document.querySelector("#comment-content-alert");
const commentAlert = document.querySelector("#comment-alert");

/* FUNCTIONS */
/* Show/hide new comment prompts */
function toggleNewCommentSection() {
  newCommentSection.classList.toggle("hidden");
  newCommentSection.classList.toggle("center");
}

/* Post new comment */
async function submitNewComment() {
  // Get value of post id
  const url = window.location.href;
  const regex = /post\/(\d+)/;
  const postId = url.match(regex)[1];

  const content = document.querySelector("#comment-content").value;

  if (!content) {
    commentContentAlert.classList.remove("hidden");
  } else {
    commentContentAlert.classList.add("hidden");
    const response = await fetch("/api/content/comment", {
      method: "POST",
      body: JSON.stringify({ content, post_id: postId }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      toggleNewCommentSection();
      location.reload();
    } else {
      commenteAlert.classList.remove("hidden");
    }
  }
}

/* EVENT LISTENERS */
newCommentButton.addEventListener("click", toggleNewCommentSection);
xCommentButton.addEventListener("click", toggleNewCommentSection);
commentNewComment.addEventListener("click", submitNewComment);
