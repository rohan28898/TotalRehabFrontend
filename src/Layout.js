import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const hideNavbarRoutes = [
    "/GenerateBill",
    "/search",
    "/upload",
    "/edit-invoice"
  ];

  const shouldHideNavbar = hideNavbarRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <>
      {!shouldHideNavbar && (
        <nav style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <Link to="/GenerateBill">Invoice</Link>
          <Link to="/search">Print Bill</Link>

          {/* LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            style={{
              cursor: "pointer",
              color: "black",
              backgroundColor: "red",
            }}
          >
            Logout
          </button>
        </nav>
      )}

      <Outlet />
    </>
  );
};

export default Layout;
