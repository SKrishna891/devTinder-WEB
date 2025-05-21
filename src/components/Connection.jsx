import axios from "axios";
import { Main_Url } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";


const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store)=>store.connections);

    const fecthConnections = async () =>{
        try{
        const res = await axios.get(Main_Url+"/users/connections",{withCredentials: true});
        dispatch(addConnections(res.data));
    }catch(err){
        console.log(err);
    }};

    useEffect(()=>{
        if(!connections){
        fecthConnections();}
    },[]);

    if(!connections) return;
    if(connections===0) return <h2>No connections</h2>
  return (
    <div>
      <h1>Connections</h1>
      {connections.map((coonnection)=>{
        const {_id,firstName,lastName, photourl, age, gender, about} = coonnection.toUserId;
        return(
            <div key={_id} className="flex items-center bg-base-300 m-4 p-4">
                <div>
                    <img alt="photo" src={photourl} className="w-20 h-20 rounded-full"/>
                </div>
                <div>
            <h2>{firstName + " "+lastName}</h2>
                <p>{age + gender}</p>
                <p>{about}</p></div>
            </div>
        )
      })}
    </div>
  )
}

export default Connections;
