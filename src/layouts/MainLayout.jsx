import { Outlet } from "react-router-dom";
import Header from "../components/homecomponents/Header";

export default function MainLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="pt-14">
        {children ?? <Outlet />}   {/* ✅ THIS IS MUST */}
      </div>
    </div>
  );
}