import { toast } from "react-toastify";
import { fetchData } from "../helpers";
import { redirect } from "react-router-dom";

const API_BASE_URL = "https://rosy-marilee-hyperpathetical.ngrok-free.dev/api";

export async function deleteBudget({ params }) {
    const authToken = fetchData("authToken");

    if (!authToken) {
        throw new Error("User session expired. Please log in.");
    }
    
    try {
        await fetch(`${API_BASE_URL}/tasks/${params.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${authToken}`,
                'ngrok-skip-browser-warning': 'true'
            }
        });

        toast.success("Budget deleted successfully!");
    } catch (e) {
        throw new Error("There was an error deleting your budget.");
    }

    return redirect("/");
}