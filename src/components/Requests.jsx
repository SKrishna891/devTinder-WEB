import axios from "axios";
import { Main_Url } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removerequest } from "../utils/RequestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(`${Main_Url}/request/review/${status}/${_id}`, {}, { withCredentials: true });
      dispatch(removerequest(_id));
    } catch (err) {
      console.error(err?.response?.data || err.message);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${Main_Url}/users/requests/received`, { withCredentials: true });
      dispatch(addRequests(res.data));
    } catch (err) {
      console.error(err?.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (requests.length === 0) {
      fetchRequests();
    }
  }, []);

  if (!requests) return null;
  if (requests.length === 0) return <h1>No requests</h1>;

  return (
    <div>
      {requests.map((req) => {
        const { _id, firstName, lastName, photourl, age, gender } = req.fromUserId;
        return (
          <div key={_id} className="flex m-4 p-4 items-center bg-base-300 justify-between">
            <div>
              <img alt="photo" src={photourl} className="w-20 h-20 rounded-full" />
            </div>
            <div>
              <h2>{firstName + " " + lastName}</h2>
              {age && gender && <p>{age + " " + gender}</p>}
            </div>
            <div>
              <button className="btn btn-primary mx-2" onClick={() => reviewRequest("rejected", req._id)}>Reject</button>
              <button className="btn btn-secondary mx-2" onClick={() => reviewRequest("accepted", req._id)}>Accept</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
