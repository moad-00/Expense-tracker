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
          name="userName" 
          placeholder="Your Name"
          required
          autoComplete="name"
        />
        <input
          type="email"
          name="userEmail" 
          placeholder="Email Address"
          required
          autoComplete="email"
        />
        <input
          type="password"
          name="password" 
          placeholder="Password"
          required
          autoComplete="new-password"
        />
        
        <input
          type="password"
          name="password_confirmation" 
          placeholder="Confirm Password"
          required
          autoComplete="new-password"
        />

       
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
