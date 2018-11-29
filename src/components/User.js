import React from "react";

const User = ({ user, campaign_id }) => {
  return (
    <td>
      <a href={`/campaigns/${campaign_id}/users/${user.id}`}>{user.name}</a>
    </td>
  );
};
export default User;
