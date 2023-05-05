import {Navigate, Outlet} from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import Nav from "./Nav";
import Footer from "./Footer";
export default function GuestLayout() {
  const { user, token } = useStateContext();

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <>
    <Nav/>
    <div id="guestLayout">
      <Outlet />
    </div>
    <Footer/>
    </>
  );
}
