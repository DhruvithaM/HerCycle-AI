import { Outlet } from "react-router-dom";

import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";

function DashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#FFF8FC]">
      {/* ================= Sidebar ================= */}

      <Sidebar />

      {/* ================= Main Area ================= */}

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto min-h-full max-w-[1800px] px-8 py-6">
          {/* ================= Topbar ================= */}

          <Topbar />

          {/* ================= Page Content ================= */}

          <div className="mt-8">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;