"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";

function Sign_in() {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // Loading state

  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("authToken");
    const role = Cookies.get("role");

    if (token && role && (role === "user" || role === "admin")) {
      redirectUser(role);
    }
  }, [router]);

  const redirectUser = (role) => {
    if (role === "admin") {
      router.push("/admin/dashboard");
    } else if (role === "user") {
      router.push("/user/dashboard");
    }
  };

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKENDURL}auth/login`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (
        response.data.status == "200" &&
        (response.data.role == "user" || response.data.role == "admin")
      ) {
        toast.success(
          response?.data?.message || "Login successful! Redirecting..."
        );
        const { token, role } = response.data;
        const id = response.data.data[0].id;



        if (token && role) {
          Cookies.set("authToken", token, {
            expires: 0.5,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
          });

          Cookies.set("role", role, {
            expires: 0.5,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
          });

          Cookies.set("UserId", id, {
            expires: 0.5,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
          });
          console.log(token)
          console.log(token)

          redirectUser(role);
        }
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false); // Set loading to false after response
    }
  };

  return (
    <section className="aai-signup-in">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-12 order-1 ps-xl-5 order-lg-2 mb-5 mb-lg-0">
            <div className="aai-form-wrapper">
              <div className="aai-form-header d-flex justify-content-center text-center flex-column align-items-center">
                <h2 className="aai-form-title">Sign in</h2>
              </div>

              <form onSubmit={handleSubmit} className="w-50 m-auto border p-4">
                <div className="row g-3">
                  <div className="col-lg-12">
                    <div className="aai-form-container">
                      <input
                        className="form-control shadow-none"
                        placeholder="Username"
                        type="text" // Use 'text' for username input
                        name="username"
                        value={values.username}
                        onChange={handleChanges}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 mb-2">
                    <div className="aai-form-container position-relative">
                      <input
                        className="form-control shadow-none"
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChanges}
                        required
                      />
                      <button
                        className="aai-form-eye"
                        type="button"
                        aria-label="Toggle Password Visibility"
                      >
                        {/* Add visibility toggle functionality if needed */}
                      </button>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="d-grid">
                      <button className="aai-btn btn-pill-solid" type="submit">
                        {loading ? "Signing In..." : "Sign In"}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <p className="aai-form-support-text">
                    Don't have an account?{" "}
                    <Link
                      href="/signup"
                      className="aai-form-support-link text-decoration-underline"
                    >
                      Sign Up
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Sign_in;
