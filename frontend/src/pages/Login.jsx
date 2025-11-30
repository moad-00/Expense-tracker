import { Form, Link } from "react-router-dom";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";

const Login = () => {
  return (
    <div className="intro">
      <div>
        <h1>
          Sign in to <span className="accent">Budgeting App!</span>
        </h1>
        <p>Access your dashboard and manage your expenses.</p>
      </div>
      <Form method="post" className="form-wrapper">
        <h2>Login</h2>
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
          autoComplete="current-password"
        />
        <input type="hidden" name="_action" value="login" /> 
        <button type="submit" className="btn btn--dark">
          <span>Sign In</span>
          <ArrowRightOnRectangleIcon width={20} />
        </button>
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </Form>
    </div>
  );
};

export default Login;