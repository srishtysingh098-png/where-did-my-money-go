let expenses = [];

function addExpense() {
    const description = document.getElementById("description").value;
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;

    if (description === "" || amount === "" || category === "") {
        alert("Please fill all the fields!");
        return;
    }

    const expense = {
        id: Date.now(),
        description: description,
        amount: Number(amount),
        category: category
    };

    expenses.push(expense);

    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("category").value = "";

    displayExpenses();
}

function displayExpenses() {
    const expenseList = document.getElementById("expenseList");

    expenseList.innerHTML = "";

    if (expenses.length === 0) {
        expenseList.innerHTML =
            '<p class="empty">No expenses added yet.</p>';
        return;
    }

    expenses.forEach(function(expense) {

        const expenseItem = document.createElement("div");
        expenseItem.className = "expense-item";

        expenseItem.innerHTML = `
            <div class="expense-info">
                <strong>${expense.description}</strong>
                <span class="category">${expense.category}</span>
            </div>

            <span class="amount">₹${expense.amount}</span>

            <button class="delete-btn"
                onclick="deleteExpense(${expense.id})">
                Delete
            </button>
        `;

        expenseList.appendChild(expenseItem);
    });

    updateSummary();
}

function deleteExpense(id) {
    expenses = expenses.filter(function(expense) {
        return expense.id !== id;
    });

    displayExpenses();
}

function updateSummary() {
    let total = 0;

    expenses.forEach(function(expense) {
        total += expense.amount;
    });

    document.getElementById("total").textContent = "₹" + total;
    document.getElementById("count").textContent = expenses.length;
}
