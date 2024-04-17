document.addEventListener("DOMContentLoaded", function() {
    const designForm = document.getElementById("designForm");

    // Function to handle the submission of the initial design description
    designForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const designDescription = document.getElementById("designDescription").value;
        axios.post('/designs/interpret', { designDescription: designDescription })
            .then(response => {
                console.log("Initial design description submitted successfully.");
                displayFollowUpQuestions(response.data.questions);
            })
            .catch(error => {
                console.error("Error submitting initial design description:", error.response ? error.response.data : error);
            });
    });

    // Function to display follow-up questions and handle their submission
    function displayFollowUpQuestions(questions) {
        const followUpQuestionsDiv = document.getElementById("followUpQuestions");
        if (questions && questions.length > 0) {
            followUpQuestionsDiv.innerHTML = ""; // Clear previous questions
            const form = document.createElement('form');
            form.id = 'followUpForm';
            questions.forEach((question, index) => {
                const label = document.createElement('label');
                label.textContent = question;
                const input = document.createElement('input');
                input.type = 'text';
                input.name = `answer${index}`;
                input.required = true;
                form.appendChild(label);
                form.appendChild(document.createElement('br'));
                form.appendChild(input);
                form.appendChild(document.createElement('br'));
            });
            const submitButton = document.createElement('button');
            submitButton.type = 'submit';
            submitButton.textContent = 'Submit Answers';
            form.appendChild(submitButton);
            followUpQuestionsDiv.appendChild(form);
            followUpQuestionsDiv.style.display = 'block';

            // Add event listener for the dynamically created follow-up form
            document.getElementById('followUpForm').addEventListener('submit', function(e) {
                e.preventDefault();
                const answers = Array.from(document.querySelectorAll('#followUpForm input[type="text"]')).map(input => input.value);
                axios.post('/designs/refine', { answers: answers })
                    .then(response => {
                        console.log("Follow-up answers submitted successfully.");
                        console.log("Identified components:", response.data.identifiedComponents.join(", "));
                        alert("Answers submitted. Check console for identified components.");
                        // Correctly clear the input fields after submission
                        document.querySelectorAll('#followUpForm input[type="text"]').forEach(input => input.value = "");
                    })
                    .catch(error => {
                        console.error("Error submitting follow-up answers:", error.response ? error.response.data : error);
                    });
            });
        } else {
            followUpQuestionsDiv.style.display = "none";
            alert("Design description is complete. Proceeding to the next step.");
        }
    }
});