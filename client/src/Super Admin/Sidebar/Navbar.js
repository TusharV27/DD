const Navbar = ({ isOpen, toggleDrawer }) => {
  return (
    <nav className="bg-black p-4 fixed top-0 left-0 w-full flex items-center justify-between z-50 sm:hidden">
      <button onClick={toggleDrawer} className="text-white focus:outline-none">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <h1 className="text-white text-xl">Dining Dots</h1>
    </nav>
  );
};

export default Navbar;
