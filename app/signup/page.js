"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

function Sign_up() {
  const router = useRouter();

  // Check if the user is already logged in
  useEffect(() => {
    const token = Cookies.get("authToken");
    const Role = Cookies.get("role");

    if (token && Role) {
      if (Role === "admin") {
        router.push("/admin/dashboard");
      } else if (Role === "user") {
        router.push("/user/dashboard");
      }
    }
  }, [router]);

  // Form data state
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user", // Default role
  });

  const [error, setError] = useState(""); // For displaying general error
  const [success, setSuccess] = useState(""); // For displaying success message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Update the correct form field
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { password, confirmPassword } = formData;

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setSuccess("");
      return;
    }

    try {
      // Send registration request
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKENDURL}auth/register`,
        formData, // Use formData here
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handle response success
      toast.success(
        response?.data?.message || "Registration successful! Redirecting..."
      );
      setSuccess(response?.data?.message || "Registration successful! Redirecting...");
      setTimeout(() => {
        router.push("/"); // Redirect to sign-in page after successful registration
      }, 2000);
    } catch (error) {
      // Handle errors
      if (error.response && error.response.data) {
        // Extract error message from response
        const errorMessage = error.response.data.error
          ? error.response.data.error[0] // Access the first error in the array
          : "An error occurred. Please try again.";

        setError(errorMessage); // Set error to state
        toast.error(errorMessage); // Display error toast
      } else {
        setError("An error occurred. Please try again.");
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <section className="aai-signup-in">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-12 order-1 ps-xl-5 order-lg-2 mb-5 mb-lg-0">
            <div className="aai-form-wrapper">
              <div className="aai-form-header d-flex justify-content-center text-center flex-column align-items-center">
                <h2 className="aai-form-title">Sign Up</h2>
              </div>

              {/* Display error and success messages */}
              {error && <p className="text-danger">{error}</p>}
              {success && <p className="text-success">{success}</p>}

              <form onSubmit={handleSubmit} className="w-50 m-auto border p-4">
                <div className="row g-3">
                  <div className="col-lg-12">
                    <div className="aai-form-container">
                      <input
                        className="form-control shadow-none"
                        placeholder="Full Name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="aai-form-container">
                      <input
                        className="form-control shadow-none"
                        placeholder="Username"
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="aai-form-container">
                      <input
                        className="form-control shadow-none"
                        placeholder="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
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
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 mb-2">
                    <div className="aai-form-container position-relative">
                      <input
                        className="form-control shadow-none"
                        placeholder="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="d-grid">
                      <button className="aai-btn btn-pill-solid" type="submit">
                        Sign Up
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <p className="aai-form-support-text">
                    Already have an account?{" "}
                    <Link
                      href="/signin"
                      className="aai-form-support-link text-decoration-underline"
                    >
                      Sign In
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

export default Sign_up;
