import { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const Menus = ["About Us", "Dashboard", "Booking", "Contact Us"];

  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated by looking for a token in localStorage
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    setIsAuthenticated(false);
    navigate('/login');
  };
  return (
    <div className={` ${open ? "w-60" : "w-20"} bg-dark h-100 p-4 pt-5 relative duration-300`}>
      <button className={`btn btn-secondary btn-sm rounded-circle position-absolute top-2 start-100 translate-middle 
          ${!open && "rotate-180"}`} onClick={() => setOpen(!open)}></button>

      <div className="text-white text-center mb-4">
        <h5 className="font-weight-bold">
          {isAuthenticated ? "User Panel" : "Please Login"}
        </h5>
      </div>

      {!isAuthenticated ? (
        <div className="d-flex flex-column">
           <button onClick={() => navigate('/login')} className="btn btn-primary mb-3">
            Login/Signup
          </button>
          <button onClick={() => navigate('/loginadmin')} className="btn btn-primary mb-3">
            Login as Admin
          </button>
        </div>
      ) : (
        <ul className="list-unstyled">
          {Menus.map((menu, index) => (
            <li key={index} className="mb-3">
              <Link
                to={`/${menu.replace(" ", "")}`}
                className="btn btn-outline-light btn-block text-left"
              >
                {menu}
              </Link>

            </li>
            
          ))}
          <li>
              <button onClick={handleLogout} className="btn btn-outline-danger btn-block text-left">
              Logout
            </button>
            </li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
