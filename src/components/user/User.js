import React from "react";

const User = ({
  numOfVotes,
  user,
  campaignId,
  count,
  onDeletePress,
  onInvatationPress,
  isAdmin,
  setToUserId,
  isVotedForUser
}) => {

  const getLink = () => {
    return (
      <a href={`/campaigns/${campaignId}/users/${user.id}`}>{user.name}</a>
    );
  };

  const deleteBtn = () => {
    return (
      <button
        className="btn btn-warning"
        onClick={() => onDeletePress(user.id)}
      >
        DELETE
      </button>
    );
  };

  const voteBtn = () => {
    if(numOfVotes >= 3 ){
      return <span>Voted max times</span>
    }

    if (!isVotedForUser(user.id)) {
      return (
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#voteModal"
          onClick={() => setToUserId(user.id)}
        >
        Vote
        </button>
      );
    } else {
      return <span>U've already voted</span>;
    }
  };


  return (
    
    <tr>
      <td>{count}</td>
      <td>{isAdmin ? getLink() : user.name}</td>
      <td>{user.votes}</td>
      <td>
        {isAdmin ? (
          <button
            onClick={() => onInvatationPress(user.email, campaignId)}
            className="btn btn-warning"
          >
            Send invatation link
          </button>
        ) : (
          voteBtn()
        )}
      </td>
      <td>{isAdmin && deleteBtn()}</td>
    </tr>
  );
};
export default User;
