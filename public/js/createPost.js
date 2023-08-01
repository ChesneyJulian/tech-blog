const postSubmissionForm = document.querySelector('#new-post');
const deleteBtn = document.querySelector('#delete-btn');

const handlePostSubmission = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#title').value.trim();
  const content = document.querySelector('#content').value.trim();
  
  if (title && content) {
    const response = await fetch ('/api/post/new-post', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json'}
    });
    if(response.ok){
      document.location.replace('/dashboard');
    }
  }
};

const handlePostDelete = async (event) => {
  event.preventDefault();
  const postId = deleteBtn.value.trim();
  console.log(postId);
  const response = await fetch ('/api/post/delete', {
    method: 'DELETE',
    body: JSON.stringify({ postId }),
    headers: { 'Content-Type': 'application/json'}
  });

  if (response.ok) {
    document.location.replace('/dashboard');
    alert('Post Deleted');
  }
};

if (postSubmissionForm) {
  postSubmissionForm.addEventListener('submit', handlePostSubmission);
};
if (deleteBtn) {
  deleteBtn.addEventListener('click', handlePostDelete);
};