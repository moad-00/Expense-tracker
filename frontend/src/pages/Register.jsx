import { Form, Link } from "react-router-dom";
import { UserPlusIcon } from "@heroicons/react/24/solid";

const Register = () => {
  return (
    <div className="intro">
      <div>
        <h1>
          Welcome to <span className="accent">Budgeting App!</span>
        </h1>
        <p>Register to start your personal finance journey.</p>
      </div>
      <Form method="post" className="form-wrapper">
        <h2>Create an Account</h2>
        <input
          type="text"
          name="userName" // Maps to 'name' in backend
          placeholder="Your Name"
          required
          autoComplete="name"
        />
        <input
          type="email"
          name="userEmail" // Maps to 'email' in backend
          placeholder="Email Address"
          required
          autoComplete="email"
        />
        <input
          type="password"
          name="password" // Maps to 'password' in backend
          placeholder="Password"
          required
          autoComplete="new-password"
        />
        {/* CRITICAL FIX: Add a second, visible password field for confirmation.
           * Laravel requires a password_confirmation field.
           * Making it visible improves UX and reliability over a hidden input.
        */}
        <input
          type="password"
          name="password_confirmation" // Maps to 'password_confirmation' in backend
          placeholder="Confirm Password"
          required
          autoComplete="new-password"
        />

        {/* Removed duplicate _action field */}
        <input type="hidden" name="_action" value="register" /> 

        <button type="submit" className="btn btn--dark">
          <span>Create Account</span>
          <UserPlusIcon width={20} />
        </button>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </Form>
    </div>
  );
};

export default Register;