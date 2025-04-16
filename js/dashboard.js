document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("studentForm");
    const nameInput = document.getElementById("name");
    const rollInput = document.getElementById("roll");
    const tableBody = document.getElementById("studentTableBody");

    if (!form || !nameInput || !rollInput || !tableBody) {
        console.error("Missing form or table elements in the HTML.");
        return;
    }

    // Avoid binding event multiple times
    if (!form.dataset.listenerAttached) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = nameInput.value.trim();
            const roll = rollInput.value.trim();

            if (name && roll) {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${name}</td>
                    <td>${roll}</td>
                    <td class="status not-submitted">❌ Not Submitted</td>
                    <td>
                        <button class="markBtn">Mark Submitted</button>
                    </td>
                `;

                tableBody.appendChild(row);

                // Clear input fields
                nameInput.value = "";
                rollInput.value = "";

                // Add event to toggle submission status
                const btn = row.querySelector(".markBtn");
                const statusCell = row.querySelector(".status");

                btn.addEventListener("click", () => {
                    const isSubmitted = statusCell.classList.contains("submitted");

                    if (isSubmitted) {
                        statusCell.textContent = "❌ Not Submitted";
                        statusCell.className = "status not-submitted";
                        btn.textContent = "Mark Submitted";
                    } else {
                        statusCell.textContent = "✅ Submitted";
                        statusCell.className = "status submitted";
                        btn.textContent = "Mark Not Submitted";
                    }
                });
            } else {
                alert("Please fill out both name and roll number.");
            }
        });

        // Mark that event listener is already attached
        form.dataset.listenerAttached = "true";
    }
});
