import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';
  
  // If we are on the Home Page, we want a minimalist look (No shadow, centered)
  // If we are on Dashboard, we want the "App" look (Shadow, full width)

  if (!isDashboard) {
    // HOME / PUBLIC NAV: Minimalist, just a hidden login trigger or very subtle
    return (
      <nav className="flex justify-end p-6 absolute w-full top-0 z-50">
        <Link 
          to="/dashboard" 
          className="text-xs font-bold text-gray-300 hover:text-black transition uppercase tracking-widest"
        >
          Admin
        </Link>
      </nav>
    );
  }

  // DASHBOARD NAV: Functional & Sturdy
  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold text-gray-800">
        Vivek<span className="text-blue-600">Patel</span>
      </Link>

      <div className="space-x-6">
        <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium">
          View Site
        </Link>
        <span className="bg-black text-white px-4 py-2 rounded-lg text-sm">
          Dashboard Mode
        </span>
      </div>
    </nav>
  );
};

export default Navbar;