import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Main_Url } from "../utils/constants";
import { addfeed } from "../utils/feedSlice";
import UserCard from "./userCard";
import { useEffect } from "react";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getfeed = async () => {
    if (Array.isArray(feed) && feed.length > 0) return;
    try {
      const res = await axios.get(`${Main_Url}/user/feed`, { withCredentials: true });
      dispatch(addfeed(res.data));
    } catch (err) {
      console.log(err?.response?.data || err.message);
    }
  };

  useEffect(() => {
    getfeed();
  }, []);

  if (!Array.isArray(feed)) return null;
  if (feed.length === 0) return <h1>No new Users</h1>;

  return (
    <div className="flex justify-center my-8">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
