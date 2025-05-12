import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-[#53967B33] text-[#494545] p-4 flex justify-between items-center">
      
      <Link to="/" className="flex items-center gap-3">
      {/* Logo Image */}
      <img
        src="/image/logo.jpg" // 直接指向 public 裡的路徑
        alt="Logo"
        className="h-[50px] w-[50px] object-cover rounded-full ml-0"
      />
      {/* Title */}
      <div
          className="text-[#484444] font-sans text-[20px] font-normal leading-none"
          style={{ letterSpacing: "0px" }}
        >Forum <br /> Discussion Board </div> 
      </Link>

      <div className="flex items-center gap-2">
        {user ? (
          <>
            <Link to="/posts" className="bg-[#FAFFFD] px-4 py-2 rounded-full hover:bg[#c9f2e5]"
            >
              Board
            </Link>
            <Link to="/profile" className="bg-[#FAFFFD] px-4 py-2 rounded-full hover:bg[#c9f2e5]"
            >
              Profile
            </Link>

            <button
              onClick={handleLogout}
              className="bg-[#DCFBEF] px-4 py-2 rounded-full hover:bg[#c9f2e5]"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="bg-[#FAFFFD] px-4 py-2 rounded-full hover:bg[#c9f2e5]"
            >Login</Link>
            <Link
              to="/register"
              className="bg-[#DCFBEF] px-4 py-2 rounded-full hover:bg[#c9f2e5]"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
