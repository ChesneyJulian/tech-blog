const postSubmissionForm = document.querySelector('#new-post');

const handlePostSubmission = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#title').value.trim();
  const content = document.querySelector('#content').value.trim();

  if (title && content) {
    const response = await fetch ('/api/posting-routes/new-post', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json'}
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      response.status
    }
  }
};

postSubmissionForm.addEventListener('submit', handlePostSubmission);