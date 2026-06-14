import Navbar from "./Navbar";

function MainLayout({ children }) {
  return (
    <div className="flex">

      <Navbar />

      <main className="flex-1 bg-gray-100">
        {children}
      </main>

    </div>
  );
}

export default MainLayout;