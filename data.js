let scholarships = [];

fetch("dataset.json")
    .then(res => res.json())
    .then(data => {
        scholarships = data;
        console.log("Loaded data:", scholarships);

        displayResults(scholarships); // Display all scholarships initially instead of after filtering
    });

const dialog = document.getElementById("scholarship-dialog");

function showScholarshipDialog() {
    dialog.showModal();
}
function closeScholarshipDialog() {
    dialog.close();
}

document.getElementById("filter-form").addEventListener("submit", function(e) {
    e.preventDefault();

    filterScholarships();
    dialog.close();
});

function filterScholarships() {
    if (scholarships.length === 0) {
        alert("Data is still loading, try again.");
        return;
    }

    const field = document.getElementById("field-of-study").value.toLowerCase();
    const minAmount = Number(document.getElementById("min-amount").value);
    const minGpa = Number(document.getElementById("min-gpa").value);

    const results = scholarships.filter(s => {
        const amount = s.Amount_Value ?? 0;
        const gpa = s.MinGPA;

        return (
            (field === "" || (s.Field_of_study ?? "").toLowerCase().includes(field)) &&
            (isNaN(minAmount) || amount >= minAmount) &&
            (isNaN(minGpa) || gpa === null || gpa >= minGpa)
        );
    });

    displayResults(results); // displays result without imput 
}

function displayResults(results) {
    const container = document.getElementById("results");
    container.innerHTML = "";

    if (results.length === 0) {
        container.innerHTML = "<p>No scholarships found.</p>";
        return;
    }

    results.forEach(s => {
        const div = document.createElement("div");
        div.innerHTML = `
            <h3>${s.Name}</h3>
            <a href="${s.Link}" target="_blank" rel="noopener noreferrer">
            Visit Scholarship Page
            </a>
            <p>Field_of_Study: ${s.Field_of_study}</p>
            <p>Amount: $${s.Amount_Value?.[0] ?? "N/A"}</p>
            <p>GPA: ${s.MinGPA ?? "None required"}</p>
        `;
        container.appendChild(div);
    });
}