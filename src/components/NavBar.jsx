import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Main_Url } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () =>{

  const user = useSelector((store)=> store.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handlelogout = async () =>{
    const res = await axios.post(Main_Url + "/logout",{withCredentials: true});
    dispatch(removeUser());
    return navigate("/login");
  }
    return(
        <div className="navbar  bg-blue-400 bg-base-100 shadow-sm">
        <div className="flex-1">
          <Link to = "/" className="btn btn-ghost text-xl">🧑‍💻 devTinder</Link>
        </div>
        {user && <div className="flex px-4 items-center" >
          <p className="px-2">Hello {user.firstName}</p>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
              
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user.photourl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <Link to = "/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li><a>Settings</a></li>
              <li><a onClick={handlelogout}>Logout</a></li>
            </ul>
          </div>
        </div>}
      </div>
    )
};

export default Navbar;