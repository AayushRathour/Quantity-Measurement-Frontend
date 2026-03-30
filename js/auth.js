const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const googleLoginBtn = document.getElementById("googleLoginBtn");

const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");

const fullName = document.getElementById("fullName");
const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const nameRegex = /^[A-Za-z][A-Za-z\s]{2,49}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{8,20}$/;

const queryParams = new URLSearchParams(window.location.search);
const oauthToken = queryParams.get("token");
const oauthError = queryParams.get("oauthError");

if (oauthToken) {
    localStorage.setItem("token", oauthToken);
    window.location.href = "dashboard.html";
}

if (oauthError) {
    alert("Google login failed. Please try again.");
}

loginTab.onclick = () => {
    loginForm.classList.remove("hidden");
    signupForm.classList.add("hidden");
    loginTab.classList.add("active");
    signupTab.classList.remove("active");
};

signupTab.onclick = () => {
    signupForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
    signupTab.classList.add("active");
    loginTab.classList.remove("active");
};

document.querySelectorAll(".toggle-password").forEach((btn) => {
    btn.onclick = () => {
        const target = document.getElementById(btn.dataset.target);
        const isPassword = target.type === "password";
        target.type = isPassword ? "text" : "password";
        btn.innerText = isPassword ? "Hide" : "Show";
    };
});

googleLoginBtn.onclick = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
};

function validateEmail(email) {
    return emailRegex.test(email);
}

function validateName(name) {
    return nameRegex.test(name);
}

function validatePassword(password) {
    return passwordRegex.test(password);
}


loginForm.onsubmit = (e) => {
    e.preventDefault();

    const email = loginEmail.value.trim();
    const password = loginPassword.value;

    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!validatePassword(password)) {
        alert("Password must be 8-20 characters and include uppercase, lowercase, number, and special character.");
        return;
    }

    // Call API (from auth-api.js)
    loginUser({
        email: email,
        password: password
    });
};


signupForm.onsubmit = (e) => {
    e.preventDefault();

    const name = fullName.value.trim();
    const email = signupEmail.value.trim();
    const password = signupPassword.value;
    const confirm = confirmPassword.value;

    if (!validateName(name)) {
        alert("Name must be 3-50 letters and spaces only.");
        return;
    }

    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!validatePassword(password)) {
        alert("Password must be 8-20 characters and include uppercase, lowercase, number, and special character.");
        return;
    }

    if (password !== confirm) {
        alert("Passwords do not match");
        return;
    }

    signupUser({
        name: name,
        email: email,
        password: password
    });
};