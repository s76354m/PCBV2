document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("design-description-form");
    const followUpQuestionsContainer = document.getElementById("follow-up-questions");
    const followUpForm = document.getElementById("follow-up-form");
    const followUpInput = document.getElementById("follow-up-input");
    const submitButton = document.getElementById("submit-design-description");
    const followUpSubmitButton = document.getElementById("submit-follow-up");

    // Function to handle the submission of the initial design description
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const designDescription = document.getElementById("design-description").value;
        axios.post('/designs/interpret', { designDescription: designDescription })
            .then(response => {
                console.log("Initial design description submitted successfully.");
                handleFollowUpQuestions(response.data.questions);
            })
            .catch(error => {
                console.error("Error submitting initial design description:", error.response ? error.response.data : error);
            });
    });

    // Function to display follow-up questions and handle their submission
    function handleFollowUpQuestions(questions) {
        if (questions && questions.length > 0) {
            followUpQuestionsContainer.innerHTML = ""; // Clear previous questions
            questions.forEach(question => {
                const questionElement = document.createElement("p");
                questionElement.textContent = question;
                followUpQuestionsContainer.appendChild(questionElement);
            });
            followUpForm.style.display = "block"; // Show the follow-up form
        } else {
            followUpForm.style.display = "none";
            alert("Design description is complete. Proceeding to the next step.");
        }
    }

    // Submitting follow-up answers
    followUpForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const followUpAnswer = followUpInput.value;
        axios.post('/designs/refine', { answers: [followUpAnswer] })
            .then(response => {
                console.log("Follow-up answer submitted successfully.");
                console.log("Identified components:", response.data.identifiedComponents.join(", "));
                followUpInput.value = ""; // Clear the input for the next question
                alert("Answer submitted. Check console for identified components.");
            })
            .catch(error => {
                console.error("Error submitting follow-up answer:", error.response ? error.response.data : error);
            });
    });
});