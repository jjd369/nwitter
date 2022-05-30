import React, { useState, useEffect } from "react";
import { onAddDoc, onGetDocs } from "fb/fbStore";
const Home = () => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  const getNeets = async () => {
    const data = await onGetDocs();
    setNweets(data);
  };
  useEffect(() => {
    getNeets();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await onAddDoc({ nweet, createAt: new Date() });
    setNweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map((nweet) => (
          <div key={nweet.id}>
            <h4>{nweet.nweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
