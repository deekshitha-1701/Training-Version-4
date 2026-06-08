// ================= REGISTER USER =================
function registerUser(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm_password").value;

    // Password validation
    if (password !== confirmPassword) {
        alert("Password and Confirm Password do not match");
        return false;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check existing user
    let existingUser = users.find(user => user.email === email);

    if (existingUser) {
        alert("User already exists");
        return false;
    }

    // Save user
    let user = {
        name,
        email,
        password
    };

    users.push(user);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration Successful");

    // Redirect to login page
    window.location.href = "login.html";
}


// ================= LOGIN USER =================
function loginUser(event) {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let validUser = users.find(
        user => user.email === email && user.password === password
    );

    if (validUser) {

        // Save logged in user
        localStorage.setItem("loggedInUser", JSON.stringify(validUser));

        alert("Login Successful");

        // Redirect to dashboard
        window.location.href = "dashboard.html";

    } else {
        alert("Invalid Email or Password");
    }
}


// ================= LOGOUT =================
function logoutUser() {

    localStorage.removeItem("loggedInUser");

    alert("Logged out successfully");

    window.location.href = "login.html";
}


// ================= ADD STUDENT =================
function addStudent(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let email = document.getElementById("email").value;
    let cgpa = document.getElementById("cgpa").value;

    let students = JSON.parse(localStorage.getItem("students")) || [];

    let student = {
        name,
        age,
        email,
        cgpa
    };

    students.push(student);

    localStorage.setItem("students", JSON.stringify(students));

    alert("Student Added Successfully");

    // Redirect to view page
    window.location.href = "view.html";
}


// ================= DISPLAY STUDENTS =================
function loadStudents() {

    let students = JSON.parse(localStorage.getItem("students")) || [];

    let tableBody = document.getElementById("studentTableBody");

    if (!tableBody) {
        return;
    }

    tableBody.innerHTML = "";

    students.forEach((student, index) => {

        tableBody.innerHTML += `
            <tr>
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.email}</td>
                <td>${student.cgpa}</td>
                <td>

    <button onclick="editStudent(${index})">
        Edit
    </button>

    <button onclick="deleteStudent(${index})">
        Delete
    </button>

</td>
            </tr>
        `;
    });
}

// ================= EDIT STUDENT =================
function editStudent(index) {

    localStorage.setItem("editIndex", index);

    window.location.href = "edit.html";
}


// ================= UPDATE STUDENT =================
function updateStudent(event) {

    event.preventDefault();

    let index = localStorage.getItem("editIndex");

    let students = JSON.parse(localStorage.getItem("students")) || [];

    students[index] = {

        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        email: document.getElementById("email").value,
        cgpa: document.getElementById("cgpa").value
    };

    localStorage.setItem("students", JSON.stringify(students));

    alert("Student Updated Successfully");

    window.location.href = "view.html";
}

// ================= DELETE STUDENT =================
function deleteStudent(index) {

    let students = JSON.parse(localStorage.getItem("students")) || [];

    students.splice(index, 1);

    localStorage.setItem("students", JSON.stringify(students));

    loadStudents();
}