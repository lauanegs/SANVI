import { Outlet } from "react-router-dom";
import Controls from "./components/Controls";
import Sidebar from "./components/Sidebar";

function Layout() {

  return (
    <div className="root-content" >
      <div className="controls" ><Controls /></div>
      <div className="content-wrapper">
          <div className="sidebar"><Sidebar /></div>
          <div className="content">        
            <main className="main-content">
              <Outlet /> {/* Aqui será renderizado o conteúdo das rotas */}
            </main>
        </div>
      </div>
    </div>
  );
}

export default Layout;
