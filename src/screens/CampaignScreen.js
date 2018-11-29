import React, { Component } from "react";
import CampaignService from "../services/CampaignService";
import CampaignListComponent from "../components/CampaignListComponent";
import withAuthComponent from "../components/withAuthComponent";
import NavbarScreen from "./NavbarScreen";

class CampaignScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campaigns: []
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    CampaignService.getAll()
      .then(response => {
        console.log(response.data);
        this.setState({
          campaigns: response.data
        });
      })
      .catch(error => console.log(error));
  }
  
  handleDelete = id => {
    CampaignService.delete(id)
      .then(() => {
        alert("Campaign deleted!");
        let tmp = this.state.campaigns.filter(campaign => campaign.id !== id);
        this.setState({ campaigns: tmp });
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div>
        <NavbarScreen history={this.props.history} />
        <div className="row">
          <CampaignListComponent
            campaigns={this.state.campaigns}
            onDeletePress={this.handleDelete}
          />
        </div>
      </div>
    );
  }
}
export default withAuthComponent(CampaignScreen);
