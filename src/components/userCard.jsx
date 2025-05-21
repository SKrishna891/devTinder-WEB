import axios from "axios";
import { Main_Url } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromfeed } from "../utils/feedSlice";


const UserCard = ({user}) => {

    const {_id,firstName,lastName,photourl, age, gender, about} = user;

    const dispatch = useDispatch();

    const handleFeed = async (status,userId) =>{
      try{
    const res = await axios.post(Main_Url+"/request/send/"+ status + "/" + userId,{},{withCredentials:true});
     dispatch(removeUserFromfeed(userId));
    }
  catch(err){
   console.log(err);
  }
}

  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img className="bg-gray-500"
      src={photourl}
      alt="user" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName +" "+ lastName}</h2>
    {age&& gender&&(<p>{age + " "+ gender}</p>)}
    <p>{about}</p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary bg-pink-500" onClick={()=>handleFeed("intrested",_id)}>Intrested</button>
      <button className="btn btn-secondary bg-red-300" onClick={()=>handleFeed("ignored",_id)}>Ignore</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default UserCard;
