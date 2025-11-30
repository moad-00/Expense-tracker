import { NavLink } from "react-router-dom";
import logomark from "../assets/logomark.svg"; 
import { TrashIcon } from '@heroicons/react/24/solid';
import { fetchData, deleteItem } from "../helpers";

// ⚠️ Make sure this URL is still correct
const API_BASE_URL = "https://rosy-marilee-hyperpathetical.ngrok-free.dev/api";

const Nav = ({ userName }) => {
  const handleDeleteUser = async () => {
    if (!confirm("Are you sure you want to permanently delete your user account and ALL associated data? This cannot be undone.")) {
      return;
    }

    const authToken = fetchData("authToken");

    // 1. Tell the backend to log out the user (invalidate the token)
    if (authToken) {
      await fetch(`${API_BASE_URL}/logout`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Accept': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        }
      });
    }

    // 2. Clear ALL data from localStorage on the frontend
    localStorage.clear();

    // 3. Redirect to the login page by reloading the app
    window.location.href = "/login";
  };

  return (
    <nav>
      <NavLink to="/" aria-label="Home">
        <img src={logomark} alt="Logo" />
        <span>Home Budget</span>
      </NavLink>

      {userName && (
        <button className="btn btn--warning" onClick={handleDeleteUser}>
          <span>Log out </span>
          <TrashIcon width={20} />
        </button>
      )}
    </nav>
  );
};

export default Nav;