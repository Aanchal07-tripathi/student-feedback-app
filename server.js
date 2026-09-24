const express = require("express");

const app = express();

const PORT = 3000;

let feedbacks = [];

app.use(express.json());

app.get("/", (req, res) => {
    res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>Student Feedback App</title>

    <style>
        body {
            font-family: Arial;
            background-color: #f2f2f2;
            padding: 40px;
        }

        .container {
            width: 500px;
            margin: auto;
            background-color: white;
            padding: 30px;
            border-radius: 10px;
        }

        h1 {
            text-align: center;
        }

        input, textarea {
            width: 100%;
            padding: 10px;
            margin-top: 5px;
            margin-bottom: 15px;
            box-sizing: border-box;
        }

        textarea {
            height: 100px;
        }

        button {
            width: 100%;
            padding: 12px;
            background-color: blue;
            color: white;
            border: none;
            cursor: pointer;
        }

        .feedback {
            margin-top: 20px;
            padding: 15px;
            background-color: #eeeeee;
        }
    </style>
</head>

<body>

<div class="container">

    <h1>Student Feedback Form</h1>

    <form id="feedbackForm">

        <label>Student Name</label>
        <input type="text" id="name" required>

        <label>Course</label>
        <input type="text" id="course" required>

        <label>Feedback</label>
        <textarea id="feedback" required></textarea>

        <button type="submit">
            Submit Feedback
        </button>

    </form>

    <h2>Submitted Feedback</h2>

    <div id="feedbackList"></div>

</div>

<script>

const form = document.getElementById("feedbackForm");

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

    alert(data.message);

    if (response.ok) {

        form.reset();

        loadFeedback();

    }

});


async function loadFeedback() {

    const response = await fetch("/api/feedback");

    const data = await response.json();

    const list = document.getElementById("feedbackList");

    list.innerHTML = "";

    data.forEach(function(item) {

        const div = document.createElement("div");

        div.className = "feedback";

        div.innerHTML =
            "<h3>" + item.name + "</h3>" +
            "<p><b>Course:</b> " + item.course + "</p>" +
            "<p><b>Feedback:</b> " + item.feedback + "</p>";

        list.appendChild(div);

    });

}


loadFeedback();

</script>

</body>
</html>
    `);
});


app.get("/api/feedback", (req, res) => {

    res.json(feedbacks);

});


app.post("/api/feedback", (req, res) => {

    const { name, course, feedback } = req.body;

    if (!name || !course || !feedback) {

        return res.status(400).json({
            message: "All fields are required"
        });

    }

    feedbacks.push({
        name: name,
        course: course,
        feedback: feedback
    });

    res.status(201).json({
        message: "Feedback submitted successfully!"
    });

});


app.listen(PORT, () => {

    console.log("Server running on port " + PORT);

});