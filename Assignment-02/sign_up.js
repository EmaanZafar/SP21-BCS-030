// JavaScript for sign-up page

// Get the overlay and sign-up container
const overlay = document.querySelector('.overlay');
const signUpContainer = document.querySelector('.sign-up-container');

// Function to show the sign-up container
function showSignUp() {
  overlay.style.display = 'block';
  signUpContainer.style.display = 'block';
}

// Function to hide the sign-up container
function hideSignUp() {
  overlay.style.display = 'none';
  signUpContainer.style.display = 'none';
}

// Event listener to show the sign-up container when the page loads
document.addEventListener('DOMContentLoaded', showSignUp);

// Event listener to hide the sign-up container when clicking on the overlay
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) {
    hideSignUp();
  }
});

// Event listener to prevent the sign-up container from closing when clicked inside it
signUpContainer.addEventListener('click', (e) => {
  e.stopPropagation();
});

// Example: Close the sign-up container when the "Log In" link is clicked
const logInLink = document.querySelector('a[href="#"]');
logInLink.addEventListener('click', hideSignUp);

// Example: Handle form submission
const signUpForm = document.getElementById('signup-form');
signUpForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // Perform form validation and submission here
  alert('Form submitted');
});
