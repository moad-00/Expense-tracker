import illustration from "../assets/illustration.jpg";
import { Link } from "react-router-dom";
import { UserPlusIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";

const Intro = () => {
  return (
    <div className="intro">
      <div>
        <h1>
          Take control of <span className="accent">your money</span>
        </h1>
        <p>
          Personal budgeting is the secret to financial freedom. Start your
          journey today.
        </p>
        <div className="flex-sm">
          <Link to="/register" className="btn btn--dark" aria-label="Create Account">
            <span>Create Account</span>
            <UserPlusIcon width={20} />
          </Link>
          <Link to="/login" className="btn btn--outline" aria-label="Login">
            <span>Login</span>
            <ArrowRightOnRectangleIcon width={20} />
          </Link>
        </div>
      </div>
      <img
        src={illustration}
        alt="Illustration showing financial progress"
        width={600}
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </div>
  );
};

export default Intro;