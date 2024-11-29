// components/Header.js
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

const Header = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(""); // State to hold the user's role

  // Check if the token and role exist on initial render
  useEffect(() => {
    const token = Cookies.get("authToken");
    const storedRole = Cookies.get("role");

    if (token && storedRole) {
      setIsLoggedIn(true);
      setRole(storedRole); // Set the role from cookies
    }
  }, []);

  const handleLogout = () => {
    // Remove cookies and redirect to home
    Cookies.remove("authToken");
    Cookies.remove("role");
    Cookies.remove("UserId");
    setIsLoggedIn(false); // Update the login state
    setRole(""); // Reset the role
    router.push("/"); // Redirect to the home page
  };

  return (
    <header className="header">
      <div className="logo">Header</div>
      <div className="user-info">
        {isLoggedIn ? (
          <>
            <span>Welcome, {role === 'admin' ? 'Admin' : 'User'}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <span>Please Log In</span> // You can add a login button or link here
        )}
      </div>
    </header>
  );
};

export default Header;
