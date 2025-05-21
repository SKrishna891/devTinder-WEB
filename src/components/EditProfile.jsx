import { useState } from "react"
import UserCard from "./userCard";
import axios from "axios";
import { Main_Url } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";


const EditProfile = ({user}) => {
    const[firstName, setFirstName]= useState(user.firstName);
    const[lastName, setLastName]= useState(user.lastName);
    const[age, setAge]= useState(user.age || "");
    const[gender, setGender]= useState(user.gender || "");
    const[photourl, setPhotoUrl] = useState(user.photourl || "");
    const [error, setError] =useState("");
    const[showToast, setShowToast]= useState(false);
    const dispatch = useDispatch();
    const saveProfile = async () =>{
        setError("");
        try{
        const res = await axios.post(Main_Url+"/profile/editData",{firstName,lastName,gender,age,photourl},{withCredentials:true});
        dispatch(addUser(res?.data?.data));
        setShowToast(true);
        setTimeout(()=>{
            setShowToast(false)
        },3000);
    }
        catch(err){
         setError(err.data);
        }
    }
  return (
    <div className="flex justify-center mx-4">
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 to-purple-100">
    <div className="card w-96 bg-blue-800 text-white shadow-xl">
      <div className="card-body">
        <h2 className="text-center text-2xl font-semibold mb-4">Edit Profile</h2>
        <label className="label">
          <span className="label-text text-white">firstName</span>
        </label>
        <input type="text"  value={firstName} placeholder="first Name" className="input input-bordered w-full mb-4 text-black" onChange={(e)=>setFirstName(e.target.value)}/>
        <label className="label">
          <span className="label-text text-white">LastName</span>
        </label>
        <input type="text"  value={lastName} placeholder="last Name" className="input input-bordered w-full mb-4 text-black" onChange={(e)=>setLastName(e.target.value)}/>
        <label className="label">
          <span className="label-text text-white">Age</span>
        </label>
        <input type="text"  value={age} placeholder="age" className="input input-bordered w-full mb-4 text-black" onChange={(e)=>setAge(e.target.value)}/>
        <label className="label">
          <span className="label-text text-white">Gender</span>
        </label>
        <input type="text"  value={gender} placeholder="gender" className="input input-bordered w-full mb-4 text-black" onChange={(e)=>setGender(e.target.value)}/>
        <label className="label">
          <span className="label-text text-white">Photo</span>
        </label>
        <input type="text"  value={photourl} placeholder="photo" className="input input-bordered w-full mb-4 text-black" onChange={(e)=>setPhotoUrl(e.target.value)}/>
        <div className="card-actions justify-center">
          <button className="btn btn-primary w-full" onClick={saveProfile}>Save Profile</button>
        </div>
      </div>
    </div>
  </div>
  <div className="my-10 mx-4">
  <UserCard user={{firstName,lastName,gender,age,photourl}}/>
  </div>
  {showToast && (<div className="toast toast-top toast-center">
  <div className="alert alert-success">
    <span>Profile Updated  successfully.</span>
  </div>
</div>)}
  </div>
  )
}

export default EditProfile
