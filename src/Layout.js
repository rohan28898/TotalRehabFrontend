import { Outlet, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const Layout = () => {
    const withouSidebarRoutes = ["404", "/LR", "/etc"];

    // const { pathname } = useLocation();
    // if (withouSidebarRoutes.some((item) => pathname.includes(item)))
    //   return null;
  return (
    <>
      <nav>
        
            {/* <Link to="/">Home | </Link> */}
         
            <Link to="/GenerateBill">Invoice | </Link>
         
            {/* <Link to="/upload">Upload|</Link> */}

            <Link to="/search">Print Bill</Link>
            
        
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;