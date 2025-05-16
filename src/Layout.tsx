import { Outlet } from "react-router-dom";
import {Controls} from "./components/Controls/Controls";
import SidebarMemo from "./components/SideBar/Sidebar";

function Layout() {

  return (
    <div id="cssportal" >
      <div id="header" ><Controls /></div>
      <div id="content">
        <div ><SidebarMemo /></div>
        <main className="main-content">
          <Outlet /> {/* Aqui será renderizado o conteúdo das rotas */}
        </main>
      </div>
    </div>
  );
}

export default Layout;
