const postSubmissionForm = document.querySelector('#new-post');
const deleteBtn = document.querySelector('#delete-btn');
const editPostForm = document.querySelector('#edit-post-form');
const editBtn = document.querySelector('#edit-btn');

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
const handleEditClick = async (event) => {
  event.preventDefault();
  editPostForm.setAttribute("style", "");
}

const handlePostEdit = async (event) => {
  event.preventDefault();
  const postId = editBtn.value.trim();
  const title = document.querySelector('#update-title').value.trim();
  const content = document.querySelector('#update-content').value.trim();

  const response = await fetch ('/api/post/edit', {
    method: 'PUT',
    body: JSON.stringify({ title, content, postId }),
    headers: { 'Content-Type': 'application/json' }
  });

  if(response.ok) {
    document.location.replace(`/user-post/${postId}`);
  }
}

if (postSubmissionForm) {
  postSubmissionForm.addEventListener('submit', handlePostSubmission);
};
if (deleteBtn && editBtn) {
  deleteBtn.addEventListener('click', handlePostDelete);
  editBtn.addEventListener('click', handleEditClick);
  editPostForm.addEventListener('submit', handlePostEdit);
};