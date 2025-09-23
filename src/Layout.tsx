import { Outlet } from "react-router";
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Layout = () => {
  return (
    <SidebarProvider>
      {/* Sidebar */}
      <aside
        role="complementary"
        aria-label="Sidebar with navigation and tools"
        className="hidden"
      >
        <AppSidebar />
      </aside>

      <section className="flex flex-col w-full h-full m-2 rounded overflow-hidden">
        {/* Top navigation */}
        <header role="banner" className="stick z-10 top-0 rounded-t">
          <Navbar />
        </header>
        {/* Main content area */}
        <main role="main">
          <Outlet />
        </main>
        {/* Footer */}
        <footer role="contentinfo">
          <Footer />
        </footer>
      </section>
     </SidebarProvider>
  );
};

export default Layout;
