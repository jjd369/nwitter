import React, { useState } from "react";
import { onDeleteDocs, onUpdateDocs } from "fb/fbStore";
import { onDeleteAttachement } from "fb/fbStoage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({ nweet, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setnewNweet] = useState(nweet.text);

  const toggleEditing = () => setEditing((prev) => !prev);

  const onChange = async (event) => {
    const {
      target: { value },
    } = event;
    setnewNweet(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await onUpdateDocs(nweet.id, newNweet);
    toggleEditing();
  };
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if (!ok) return;
    //delete nweet
    await onDeleteDocs(nweet.id);
    nweet.attatchmentUrl && (await onDeleteAttachement(nweet.attatchmentUrl));
  };

  return (
    <div className="nweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              value={newNweet}
              placeholder="Edit new nweet"
              required
              autoFocus
              onChange={onChange}
              className="formInput"
            ></input>
            <input type="submit" value="Update Nweet" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{nweet.text}</h4>
          {nweet.attachmentUrl && (
            <img src={nweet.attachmentUrl} alt="attachment" />
          )}
          {isOwner && (
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
