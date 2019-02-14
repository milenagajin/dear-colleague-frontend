import React from "react";
import User from "./User";

const UserListComponent = ({
  numOfVotes,
  users,
  campaignId,
  onDeletePress,
  onInvatationPress,
  isAdmin,
  setToUserId,
  isVotedForUser
}) => {
  console.log(users);
  let count = 0;
  let th, th1;

  if(isAdmin){ 
    th = <th>Invite</th>; th1= <th>Delete</th>
  } else {
    th = <th>Vote</th>; th1 = null; 
  }
  
  return (
    <div>
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr className="bg-warning">
            <th>Ranking</th>
            <th>Employee</th>
            <th>Votes</th>
            {th}
            {th1}
            <th />
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            count++;

            return (
              <User
                numOfVotes={numOfVotes}
                isVotedForUser={isVotedForUser}
                setToUserId={setToUserId}
                isAdmin={isAdmin}
                key={user.id}
                campaignId={campaignId}
                count={count}
                user={user}
                onDeletePress={onDeletePress}
                onInvatationPress={onInvatationPress}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserListComponent;
