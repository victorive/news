import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/react.svg";
import {
  useGetCurrentUserQuery,
  useLogoutUserMutation,
} from "../store/features/user/UserRequest";
import { useEffect } from "react";

const NavBar = () => {
  const { data, isError } = useGetCurrentUserQuery("");
  const [logout] = useLogoutUserMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  },[]);

  const handleLogout = async () => {
    await logout("")
      .unwrap()
      .then(() => navigate("/login"));
  };

  return (
    <header className="mb-2 shadow">
      <div className="flex items-center max-w-screen-xl flex-col overflow-hidden px-4 py-4 sm:mx-auto sm:flex-row w-full justify-between">
        <Link to={"/"} className="mr-auto my-auto">
          <img className="h-8 w-8" src={Logo} alt="" />
        </Link>
        <input type="checkbox" className="peer hidden" id="navbar-open" />
        <label
          className="ml-auto cursor-pointer sm:hidden my-auto"
          htmlFor="navbar-open"
        >
          <span className="sr-only">Toggle menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>
        <nav
          aria-labelledby="header-navigation"
          className="peer-checked:mt-8 peer-checked:max-h-44 ml-auto flex max-h-0 w-max flex-col items-center justify-between overflow-hidden transition-all  sm:max-h-full sm:flex-row sm:items-start"
        >
          <h2 className="sr-only" id="header-navigation">
            Header navigation
          </h2>
          <ul className="flex flex-col items-start gap-2 sm:flex-row ">
            {data?.id ? (
              <>
                <li className="sm:mr-12">
                  <Link to={"/"}>News</Link>
                </li>
                <li className="sm:mr-12">
                  <Link to={"/preferences"}>Preferences</Link>
                </li>
                <li className="sm:mr-12 cursor-pointer" onClick={handleLogout}>
                  Logout
                </li>
              </>
            ) : (
              <>
                <li className="sm:mr-12">
                  <Link to={"/login"}>Login/Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
