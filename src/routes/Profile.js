import React from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "fb/fbAuth";

const Profile = () => {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };
  return (
    <>
      <button onClick={onLogOutClick}>Log out</button>
    </>
  );
};
export default Profile;
