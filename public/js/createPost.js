const postSubmissionForm = document.querySelector('#new-post');

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
  
  const response = await fetch ('/api/post/delete-post')
}

postSubmissionForm.addEventListener('submit', handlePostSubmission);
