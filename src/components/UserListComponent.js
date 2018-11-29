import React from "react";
import User from "./User";

const UserListComponent = ({ users, campaign_id }) => {
  let count = 0;

  return (
    <div>
      <table className="table table-hover table-dark table-fixed">
        <thead>
          <tr className="bg-warning">
            <th>Ranking</th>
            <th>Employee</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            {
              count++;
            }
            return (
              <tr>
                <td>{count}</td>
                <User key={user.id} campaign_id={campaign_id} user={user} />
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserListComponent;
