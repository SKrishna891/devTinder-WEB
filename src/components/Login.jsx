import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { Main_Url } from "../utils/constants";

const Login = () => {



    const [emailId, setEmailId] = useState("trump@gmail.com");
    const [password, setPassword] = useState("Trump@123");
    const [error, setError] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleButtonClick  = async() =>{
  try{
  const res = await axios.post(Main_Url + "/login",{
    emailId,password
  },{withCredentials:true});
 
  dispatch(addUser(res.data));
  return navigate("/");
  }catch(err){
    setError(err.response.data || "Something went wrong");
  }
    }
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 to-purple-100">
        <div className="card w-96 bg-blue-800 text-white shadow-xl">
          <div className="card-body">
            <h2 className="text-center text-2xl font-semibold mb-4">Login</h2>
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
              <button className="btn btn-primary w-full" onClick={handleButtonClick}>Login</button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Login;