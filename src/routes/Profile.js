import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService, onUpdateProfile } from "fb/fbAuth";
import { onGetNweet } from "fb/fbStore";

const Profile = ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };
  const getMyNweets = async () => {
    const nweets = await onGetNweet(userObj);
  };
  useEffect(() => {
    getMyNweets();
  }, []);
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName === newDisplayName) return;

    await onUpdateProfile(newDisplayName);
    refreshUser();
  };
  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          type="text"
          value={newDisplayName}
          autoFocus
          placeholder="Display name"
          onChange={onChange}
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
};
export default Profile;
