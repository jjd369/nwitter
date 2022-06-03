import React, { useState, useEffect } from "react";
import { onGetNweets, unsub } from "fb/fbStore";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);

  const getNeets = async () => {
    const data = await onGetNweets();
    setNweets(data);
  };
  useEffect(() => {
    getNeets();
    unsub((nweets) => {
      setNweets(nweets);
    });
  }, []);

  return (
    <div className="container">
      <NweetFactory userObj={userObj}></NweetFactory>
      <div style={{ marginTop: 30 }}>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweet={nweet}
            isOwner={nweet.createId === userObj.uid}
          ></Nweet>
        ))}
      </div>
    </div>
  );
};
export default Home;
