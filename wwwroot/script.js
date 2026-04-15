const API_URL = "http://localhost:5157/api/employees";

/* ================= GLOBAL DATA ================= */
let allEmployees = [];

/* ================= LOADER ================= */
function showLoader() {
    document.getElementById("loader").style.display = "block";
}

function hideLoader() {
    document.getElementById("loader").style.display = "none";
}

/* ================= LOAD EMPLOYEES ================= */
async function loadEmployees() {
    showLoader();

    try {
        const res = await fetch(API_URL);

        if (!res.ok) {
            throw new Error("Failed to fetch employees");
        }

        const data = await res.json();

        allEmployees = data;       // ✅ store for search
        renderTable(data);         // ✅ single rendering place

    } catch (error) {
        alert(error.message);
        console.error(error);
    } finally {
        hideLoader();
    }
}

/* ================= RENDER TABLE ================= */
function renderTable(data) {
    const table = document.getElementById("employeeTable");
    table.innerHTML = "";

    data.forEach(emp => {
        table.innerHTML += `
        <tr>
            <td>${emp.id}</td>
            <td>${emp.name}</td>
            <td>${emp.role}</td>
            <td>${emp.salary}</td>
            <td>
                <button class="btn-edit" onclick="editEmployee(${emp.id}, \`${emp.name}\`, \`${emp.role}\`, ${emp.salary})">Update</button>
                <button class="btn-delete" onclick="deleteEmployee(${emp.id})">Delete</button>
            </td>
        </tr>`;
    });
}

/* ================= SEARCH / FILTER ================= */
function filterEmployees() {
    const search = document.getElementById("searchInput").value.toLowerCase();

    const filtered = allEmployees.filter(emp =>
        emp.name.toLowerCase().includes(search) ||
        emp.role.toLowerCase().includes(search)
    );

    renderTable(filtered);
}

/* ================= SAVE (ADD / UPDATE) ================= */
async function saveEmployee() {
    const id = document.getElementById("empId").value;

    const emp = {
        name: document.getElementById("name").value.trim(),
        role: document.getElementById("role").value.trim(),
        salary: parseFloat(document.getElementById("salary").value)
    };

    /* ===== VALIDATION ===== */
    if (!emp.name) {
        alert("Name is required");
        return;
    }

    if (!emp.role) {
        alert("Role is required");
        return;
    }

    if (isNaN(emp.salary)) {
        alert("Salary must be a number");
        return;
    }

    if (emp.salary <= 0) {
        alert("Salary must be greater than 0");
        return;
    }

    showLoader();

    try {
        let response;

        if (id) {
            response = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(emp)
            });
        } else {
            response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(emp)
            });
        }

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }

        clearForm();
        hideForm();
        loadEmployees();

    } catch (error) {
        alert(error.message);
        console.error(error);
    } finally {
        hideLoader();
    }
}

/* ================= EDIT ================= */
function editEmployee(id, name, role, salary) {
    showForm();

    document.getElementById("formTitle").innerText = "Edit Employee";

    document.getElementById("empId").value = id;
    document.getElementById("name").value = name;
    document.getElementById("role").value = role;
    document.getElementById("salary").value = salary;
}

/* ================= DELETE ================= */
async function deleteEmployee(id) {
    if (!confirm("Are you sure you want to delete this employee?")) return;

    showLoader();

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Delete failed");
        }

        loadEmployees();

    } catch (error) {
        alert(error.message);
        console.error(error);
    } finally {
        hideLoader();
    }
}

/* ================= FORM HELPERS ================= */
function clearForm() {
    document.getElementById("empId").value = "";
    document.getElementById("name").value = "";
    document.getElementById("role").value = "";
    document.getElementById("salary").value = "";
}

function showForm() {
    document.getElementById("formContainer").style.display = "block";
    document.getElementById("formTitle").innerText = "Add Employee";
    clearForm();
}

function hideForm() {
    document.getElementById("formContainer").style.display = "none";
    clearForm();
}

/* ================= INITIAL LOAD ================= */
loadEmployees();