import { Outlet } from "react-router-dom";
import Header from "./header";

function Layout() {
  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen">
      {/* Header */}
      <div>
        <Header />
      </div>

      {/* Content */}
      <Outlet />
    </div>
  );
}
// function Layout() {
//   return (
//     <>
//       <div className="px-10 py-5">
//         <Header />
//         <Outlet />
//       </div>
//     </>
//   );
// }

export default Layout;
