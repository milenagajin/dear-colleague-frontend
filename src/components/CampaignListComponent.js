import React from "react";
import Campaign from "./Campaign";

const CampaignListComponent = ({ campaigns, onDeletePress }) => {
  return campaigns.map(campaign => {
    return (
      <Campaign
        key={campaign.id}
        campaign={campaign}
        onDeletePress={onDeletePress}
      />
    );
  });
};

export default CampaignListComponent;
