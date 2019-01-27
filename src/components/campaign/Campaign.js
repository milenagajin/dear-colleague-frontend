import React from "react";

const Campaign = ({ campaign, onDeletePress }) => {
  return (
    <div className="card w-50">
      <div className="card-body">
        <h5 className="card-title">{campaign.name}</h5>
        <p className="card-text">For company: {campaign.company_name}</p>
        <a href={`campaigns/${campaign.id}/users`} className="btn btn-primary">
          See votes
        </a>
        <a href={`campaigns/edit/${campaign.id}`} className="btn btn-primary">
          Edit details
        </a>
        <button
          className="btn btn-danger"
          onClick={() => onDeletePress(campaign.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Campaign;
