import { redirect } from "react-router-dom";

// ⚠️ Make sure this URL is still correct
const API_BASE_URL = "https://rosy-marilee-hyperpathetical.ngrok-free.dev/api";

const notifyUser = (message) => {
    window.dispatchEvent(new CustomEvent("notify", { detail: message }));
};

// Register
export async function registerAction({ request }) {
    const data = await request.formData();
    const { userName, userEmail, password, password_confirmation } = Object.fromEntries(data);

    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: userName,
                email: userEmail,
                password,
                password_confirmation
            }),
        });

        const result = await response.json();

        if (!response.ok) {
            const errorMessage = result.message || (result.errors ? Object.values(result.errors).flat().join(' | ') : "Registration failed.");
            throw new Error(errorMessage);
        }

        localStorage.setItem("userName", JSON.stringify(result.user.name));
        localStorage.setItem("authToken", JSON.stringify(result.token)); 

        notifyUser(`Welcome, ${result.user.name}! Account created successfully.`);
        return redirect("/");

    } catch (error) {
        notifyUser(error.message || "Registration failed.");
        return { error: true };
    }
}

// Login
export async function loginAction({ request }) {
    const data = await request.formData();
    const { userEmail, password } = Object.fromEntries(data);

    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ email: userEmail, password }),
        });

        const result = await response.json();

        if (!response.ok) {
            const errorMessage = result.message || "Login failed. Invalid email or password.";
            throw new Error(errorMessage);
        }

        localStorage.setItem("userName", JSON.stringify(result.user.name));
        localStorage.setItem("authToken", JSON.stringify(result.token));

        notifyUser(`Welcome back, ${result.user.name}!`);
        return redirect("/");

    } catch (error) {
        notifyUser(error.message || "Login failed.");
        return { error: true };
    }
}