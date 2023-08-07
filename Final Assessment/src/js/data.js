document.addEventListener("DOMContentLoaded", function () {
  // add review data
  window.reviewData = [
    {
      name: "John Doe",
      date: "2023-08-01",
      rating: 4,
      review: "Great game, lots of fun!",
    },
    {
      name: "Jane Smith",
      date: "2023-08-02",
      rating: 5,
      review: "Best strategy game I've ever played.",
    },
    {
      name: "Mike Johnson",
      date: "2023-08-03",
      rating: 3,
      review: "The game is challenging but rewarding.",
    },
    {
      name: "Emily Lee",
      date: "2023-08-04",
      rating: 5,
      review: "I love the diverse strategies each faction offers.",
    },
    {
      name: "Alex Wang",
      date: "2023-08-05",
      rating: 4,
      review: "The competitive scene is intense and exciting.",
    },
  ];

  // Gets the container element and the review add form element to show the review card.
  const reviewCardsContainer = document.getElementById("review-cards");
  const addReviewForm = document.getElementById("add-review-form");

  // Function to generate review cards
  function generateReviewCards() {
    reviewCardsContainer.innerHTML = ""; // Clear existing cards

    // Create a review card by traversing the review data.
    reviewData.forEach((review) => {
      // Creates a review card element.
      const card = document.createElement("div");
      card.classList.add("review-card");

      // Format the rating as stars (e.g., ★ ★ ★ ☆ ☆)
      const stars = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);

      // Set the contents of the review card.
      card.innerHTML = `
        <h2>${review.name}</h2>
        <p>Date: ${review.date}</p>
        <p>Rating: ${stars}</p>
        <p>${review.review}</p>
      `;
      // Add the review card to the container.
      reviewCardsContainer.appendChild(card);
    });
  }

  // Function to handle input for year, month, and day fields
  function handleDateInputs(event) {
    const input = event.target;
    if (input.value.length === input.getAttribute("maxlength")) {
      const nextInput = input.nextElementSibling;
      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  // Add event listener for input in the date fields
  const dateInputs = document.querySelectorAll("#year, #month, #day");
  dateInputs.forEach((input) => {
    input.addEventListener("input", handleDateInputs);
  });

  // Function to handle form submission
  function handleFormSubmission(event) {
    event.preventDefault();
    const nameInput = document.getElementById("name");
    const yearInput = document.getElementById("year");
    const monthInput = document.getElementById("month");
    const dayInput = document.getElementById("day");
    const ratingInput = document.getElementById("rating");
    const reviewInput = document.getElementById("review");

    const year = yearInput.value;
    const month = monthInput.value.padStart(2, "0");
    const day = dayInput.value.padStart(2, "0");

    // Create a new review object.
    const newReview = {
      name: nameInput.value,
      date: `${year}-${month}-${day}`,
      rating: parseInt(ratingInput.value),
      review: reviewInput.value,
    };

    reviewData.push(newReview); // Add the new review to the reviewData array
    generateReviewCards(); // Re-generate the review cards with the new review
    addReviewForm.reset();
  }

  // Add event listener for form submission
  addReviewForm.addEventListener("submit", handleFormSubmission);

  // Generate the initial review cards on page load
  generateReviewCards();
});
