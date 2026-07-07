import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="border-b border-ink/10 bg-base/95 backdrop-blur sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tight">
          TaskFlow
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium">
          {user ? (
            <>
              <span className="text-ink/60">Hi, {user.name.split(" ")[0]}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-1.5 rounded-full border border-ink/20 hover:border-accent hover:text-accent transition-colors"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-accent transition-colors">
                Log in
              </Link>
              <Link
                to="/register"
                className="px-4 py-1.5 rounded-full bg-ink text-base hover:bg-accent transition-colors"
              >
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
