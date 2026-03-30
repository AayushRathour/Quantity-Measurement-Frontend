// Try localhost and 127.0.0.1 to avoid host mismatch issues on some setups.
const API_BASES = [
    "http://localhost:8080/api/v1/auth",
    "http://127.0.0.1:8080/api/v1/auth"
];

function normalizeApiError(rawMessage, status, endpoint) {
    const text = (rawMessage || "").toString();
    const lowerText = text.toLowerCase();

    if (endpoint === "/login") {
        const loginCredentialError =
            lowerText.includes("bad credentials") ||
            lowerText.includes("invalid credentials") ||
            lowerText.includes("username") ||
            lowerText.includes("password") ||
            status === 401 ||
            status === 403 ||
            status === 400;

        if (loginCredentialError) {
            return "Wrong email or password.";
        }
    }

    if (lowerText.includes("duplicate entry") || lowerText.includes("constraint") || lowerText.includes("already exists")) {
        return "This email is already registered. Please login or use a different email.";
    }

    if (status === 400) {
        return endpoint === "/signup"
            ? "Invalid signup data. Please check your name, email, and password."
            : "Invalid login request. Please check your credentials.";
    }

    if (status === 401 || status === 403) {
        return "Email or password is incorrect.";
    }

    if (status >= 500) {
        return "Server error occurred. Please try again in a moment.";
    }

    return "Request failed. Please try again.";
}

function extractErrorMessage(err) {
    if (!err || !err.message) {
        return "Something went wrong. Please try again.";
    }

    try {
        const parsed = JSON.parse(err.message);
        return normalizeApiError(parsed.message || parsed.error, parsed.status || 0, parsed.path?.includes("/signup") ? "/signup" : "/login");
    }
    catch {
        return normalizeApiError(err.message, err.status || 0, err.endpoint || "");
    }
}

async function requestAuth(endpoint, payload) {
    for (const baseUrl of API_BASES) {
        let timeoutId;
        try {
            const controller = new AbortController();
            timeoutId = setTimeout(() => controller.abort(), 10000);

            const res = await fetch(`${baseUrl}${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!res.ok) {
                const errText = await res.text();
                const apiError = new Error(errText || `Request failed with status ${res.status}`);
                apiError.status = res.status;
                apiError.endpoint = endpoint;
                throw apiError;
            }

            return res;
        }
        catch (err) {
            const isNetworkError =
                err.name === "AbortError" ||
                err.message === "Failed to fetch" ||
                err.message.includes("NetworkError") ||
                err.message.includes("fetch");

            if (!isNetworkError) {
                throw err;
            }

        }
        finally {
            clearTimeout(timeoutId);
        }
    }

    throw new Error(
        "Cannot connect to backend API on port 8080. Start your Spring Boot server and allow CORS for http://127.0.0.1:5500."
    );
}

// SIGNUP API
async function signupUser(data) {
    try {
        const res = await requestAuth("/signup", data);

        alert("Signup successful please login!");
        const result = await res.json();
        return result;

    } 
    catch (err) {
        alert("Signup failed: " + extractErrorMessage(err));
    }
}

// LOGIN API
async function loginUser(data) {
    try {
        const res = await requestAuth("/login", data);

        const token = await res.text();

        // STORE TOKEN
        localStorage.setItem("token", token);

        // redirect to dashboard
        window.location.href = "dashboard.html";

    } 
    catch (err) {
        alert("Login failed: " + extractErrorMessage(err));
    }
}