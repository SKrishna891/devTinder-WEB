import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { Main_Url } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
 
  const dispatch = useDispatch();
const navigate = useNavigate();
const userData = useSelector((store)=> store.user);
  const fectchuser = async ()=>{
   try{ 
    const res =  await axios.get(Main_Url+"/profile/view",{
      withCredentials:true
    });
    dispatch(addUser(res.data));}
    catch(err){
      if(err.status === 401){
        navigate("/login");
      }
      console.error(err);
    }
  }

  useEffect(()=>{
    if(!userData){
    fectchuser();}
  },[]);
  return (
    <div className="min-h-screen bg-violet-200 flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Body;
