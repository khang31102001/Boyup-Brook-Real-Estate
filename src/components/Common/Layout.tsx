import { Outlet } from "react-router-dom";
import Header from "./Header";
import ScrollToTop from "./ScrollToTop";


const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <ScrollToTop />
        </>
    );
};

export default Layout