const commentSubmissionForm = document.querySelector('#new-comment');

const handleCommentSubmission = async (event) => {
  event.preventDefault();
  const postId = document.querySelector('#postId').value.trim();
  const content = document.querySelector('#comment').value.trim();
  
  if (content) {
    console.log('COMMENT: ', content);
    console.log('POST ID: ', postId );
    const response = await fetch ('/api/post/new-comment', {
      method: 'POST',
      body: JSON.stringify({ content, postId  }),
      headers: { 'Content-Type': 'application/json'}
    });
    console.log('made request - ', response);
    if (response.ok) {
      document.location.replace('/dashboard');
    } 
  }
  };

  commentSubmissionForm.addEventListener('submit', handleCommentSubmission); 