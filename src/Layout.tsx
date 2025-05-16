import { Outlet } from "react-router-dom";
import {Controls} from "./components/Controls/Controls";
import Sidebar from "./components/SideBar/Sidebar";

function Layout() {

  return (
    <div className="" id="cssportal" >
      <div className="" id="header" ><Controls /></div>
      <div id="content">
        <div className="" id="sideL"><Sidebar /></div>
        <main className="main-content">
          <Outlet /> {/* Aqui será renderizado o conteúdo das rotas */}
        </main>
      </div>
    </div>
  );
}

export default Layout;
