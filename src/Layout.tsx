import { Outlet } from "react-router-dom";
import Controls from "./components/Controls/Controls";
import Sidebar from "./components/SideBar/Sidebar";

function Layout() {

  return (
    <div className="" id="cssportal-grid" >
      <div className="" id="header" ><Controls /></div>
      <div className="" id="sideL"><Sidebar /></div>
      <div className="" id="main">        
        <main className="main-content">
          <Outlet /> {/* Aqui será renderizado o conteúdo das rotas */}
        </main>
      </div>
    </div>
  );
}

export default Layout;
