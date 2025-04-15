import HomeNavbar from "@/components/dashboard/HomeNavbar";

// import HomeNavbar from "../../../../components/dashboard/HomeNavbar";
const Layout = ({ children }) => {
    return (
        <div className="">
            <HomeNavbar />
            {children}
        </div>
    )
}

export default Layout;