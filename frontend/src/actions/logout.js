import { redirect } from "react-router-dom";

export async function logoutAction() {
    // 1. Clear the authentication token and username
    localStorage.removeItem("authToken"); 
    localStorage.removeItem("userName");
    
    // 2. Dispatch a notification (using CustomEvent, as used in your project)
    window.dispatchEvent(
        new CustomEvent("notify", { detail: "You have been logged out successfully." })
    );

    // 3. Redirect to the login page
    return redirect("/login");
}