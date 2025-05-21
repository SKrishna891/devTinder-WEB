import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { Main_Url } from "../utils/constants";

const Login = () => {


    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState();

    const [isloginform, setIsLoginform] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin  = async() =>{
  try{
  const res = await axios.post(Main_Url + "/login",{
    emailId,password
  },{withCredentials:true});
 
  dispatch(addUser(res.data));
  return navigate("/");
  }catch(err){
    setError(err.response.data || "Something went wrong");
  }
    };

    const handlesignup = async() =>{
      try{
      const res = await axios.post(Main_Url+"/signup",{firstName,lastName,emailId,password},{withCredentials:true});
      dispatch(addUser(res.data.data));
      return navigate("/profile");
      }catch(err){
        setError(err.response.data || "Something went wrong");
      }
    }
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 to-purple-100">
        <div className="card w-96 bg-blue-800 text-white shadow-xl">
          <div className="card-body">
            <h2 className="text-center text-2xl font-semibold mb-4">{isloginform? "Login" : "Signup"}</h2>
            {!isloginform && <><label className="label">
              <span className="label-text text-white">First Name</span>
            </label>
            <input type="text"  value={firstName} placeholder="" className="input input-bordered w-full mb-4 text-black" onChange={(e)=>setFirstName(e.target.value)}/>

            <label className="label">
              <span className="label-text text-white">last Name</span>
            </label>
            <input type="text"  value={lastName} placeholder="" className="input input-bordered w-full mb-4 text-black" onChange={(e)=>setLastName(e.target.value)}/>
            </>}
            <label className="label">
              <span className="label-text text-white">EmailId</span>
            </label>
            <input type="text"  value={emailId} placeholder="Enter Email" className="input input-bordered w-full mb-4 text-black" onChange={(e)=>setEmailId(e.target.value)}/>
  
            <label className="label">
              <span className="label-text text-white">Password</span>
            </label>
            <input type="password" value={password} placeholder="Enter Password" className="input input-bordered w-full mb-6 text-black" onChange={(e)=>setPassword(e.target.value)} />
          <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center">
              <button className="btn btn-primary w-full" onClick={isloginform? handleLogin: handlesignup}>{isloginform?"Login": "signup"}</button>
            </div>
            <p className="m-auto py-2 cursor-pointer" onClick={()=>setIsLoginform((value) =>!value)}>{isloginform? "New user Signup!" : "Existing User login!"}</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Login;