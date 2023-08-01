const commentSubmissionForm = document.querySelector('#new-comment');

const handleCommentSubmission = async (event) => {
  event.preventDefault();
  const postId = document.querySelector('#postId').value.trim();
  const content = document.querySelector('#comment').value.trim();
  
  if (content) {
    const response = await fetch ('/api/post/new-comment', {
      method: 'POST',
      body: JSON.stringify({ content, postId  }),
      headers: { 'Content-Type': 'application/json'}
    });

    if (response.ok) {
      document.location.reload();
    } 
  }
  };

  commentSubmissionForm.addEventListener('submit', handleCommentSubmission); 