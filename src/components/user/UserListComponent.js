import React from "react";
import User from "./User";

const UserListComponent = ({
  users,
  campaignId,
  onDeletePress,
  onInvatationPress,
  isAdmin,
  setToUserId,
  isVotedForUser
}) => {
  let count = 0;
  let th;
  isAdmin === "true" ? (th = <th>Invite</th>) : (th = <th>Vote</th>);
  return (
    <div>
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr className="bg-warning">
            <th>Ranking</th>
            <th>Employee</th>
            <th>Votes</th>
            {th}
            <th />
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            count++;

            return (
              <User
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
