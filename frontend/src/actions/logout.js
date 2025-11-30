import { redirect } from "react-router-dom";

export async function logoutAction() {
    
    localStorage.removeItem("authToken"); 
    localStorage.removeItem("userName");
    
    
    window.dispatchEvent(
        new CustomEvent("notify", { detail: "You have been logged out successfully." })
    );

    
    return redirect("/login");
}
