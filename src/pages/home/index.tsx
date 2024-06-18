import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { saveUser, signIn } from "../../db";
import { AuthContext } from "../../context";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { setUser, user, setAuthenticating } = useContext(AuthContext);
  const [authType, setAuthType] = useState<"signin" | "signup">("signin");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  const handleAuth = async (event: any) => {
    event.preventDefault();
    try {
      setAuthenticating(true);
      if (authType === "signin") {
        const { email, password } = event.target.elements;
        const user = signIn({
          email: email.value,
          password: password.value,
        });
        if (user) {
          setUser(user);
          navigate("/dashboard");
        } else {
          toast.error("Sorry, wrong password or no account found");
        }
        setAuthenticating(false);
      } else {
        const { email, name, password, password2 } = event.target.elements;
        if (password?.value === password2?.value) {
          const res = await axios.post(
            "https://jsonplaceholder.typicode.com/users",
            {
              name: name.value,
              email: email.value,
              password: password.value,
            },
          );
          saveUser(res.data);
          toast.success("Account created, sign in to continue");
          setAuthType("signin");
        } else {
          toast.error("Passwords do not match");
        }
      }
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      setAuthenticating(false);
    }
  };

  return (
    <main className="home-main">
      <section className="home">
        <div className="home-info">
          <div className="home-info-container">
            <div className="home-info-title">Welcome to Kazi HQ</div>
            <p>
              This platform is for all Kazi HQ employees, login to view tasks
              and departnents.
            </p>
          </div>
        </div>
        <div className="home-auth">
          <form onSubmit={handleAuth}>
            <div className="home-auth-title">
              {authType === "signin" ? "Sign in" : "Signup"}
            </div>
            {authType === "signin" ? (
              <div className="auth-signin">
                <div className="form-group">
                  <label htmlFor="email">Work Email</label>
                  <input id="email" type="email" placeholder="Email" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input id="password" type="password" placeholder="Password" />
                </div>
              </div>
            ) : (
              <div className="auth-signup">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input id="name" type="text" placeholder="Name" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Work Email</label>
                  <input id="email" type="email" placeholder="Email" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input id="password" type="password" placeholder="Password" />
                </div>
                <div className="form-group">
                  <label htmlFor="password2">Confirm Password</label>
                  <input
                    id="password2"
                    type="password"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>
            )}
            <div className="auth-info">
              {authType === "signin" ? (
                <p>
                  New to the platform?{" "}
                  <span onClick={() => setAuthType("signup")} className="link">
                    Ceate account
                  </span>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <span onClick={() => setAuthType("signin")} className="link">
                    Sign in
                  </span>
                </p>
              )}
            </div>
            <button>{authType === "signin" ? "Sign in" : "Sign up"}</button>
          </form>
        </div>
      </section>
    </main>
  );
};
