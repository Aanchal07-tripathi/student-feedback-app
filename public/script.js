const form = document.getElementById("feedbackForm");

const feedbackList = document.getElementById("feedbackList");

form.addEventListener("submit", async function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;

    const course = document.getElementById("course").value;

    const feedback = document.getElementById("feedback").value;

    const response = await fetch("/api/feedback", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name: name,
            course: course,
            feedback: feedback
        })
    });

    const data = await response.json();

    if (response.ok) {

        alert("Feedback submitted successfully!");

        form.reset();

        loadFeedback();

    } else {

        alert(data.message);
    }
});


async function loadFeedback() {

    const response = await fetch("/api/feedback");

    const feedbacks = await response.json();

    feedbackList.innerHTML = "";

    feedbacks.forEach(function(item) {

        const card = document.createElement("div");

        card.className = "feedback-card";

        card.innerHTML = `
            <h3>${item.name}</h3>
            <p><strong>Course:</strong> ${item.course}</p>
            <p><strong>Feedback:</strong> ${item.feedback}</p>
        `;

        feedbackList.appendChild(card);
    });
}


loadFeedback();