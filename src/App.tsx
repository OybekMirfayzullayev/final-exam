// import Login from "../src/auth/Login"

import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";

function App() {
  return (
    <>
      <div className="flex h-screen">
        <div className="w-64 flex-shrink-0">
          <SideBar />
        </div>

        <div className="flex flex-col flex-grow">
          <div className="h-[70px] flex-shrink-0">
            <Navbar />
          </div>

          <div className="flex-grow overflow-y-auto bg-gray-100 p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
