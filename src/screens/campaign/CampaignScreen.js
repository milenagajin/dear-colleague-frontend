import React, { Component } from "react";
import CampaignListComponent from "../../components/campaign/CampaignListComponent";
import withAuthComponent from "../auth/withAuthComponent";
import NavbarScreen from "../NavbarScreen";
import CampaignService from "../../services/CampaignService";

class CampaignScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campaigns: []
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.getCampaigns();   
  }

  async getCampaigns() {
    // alert('campaign');
    const { data } = await CampaignService.getAll();
    this.setState({
      campaigns: data
    });
  }

  async handleDelete(id) {
    try {
      await CampaignService.delete(id);
      this.setState({
        campaigns: this.state.campaigns.filter(campaign => campaign.id !== id)
      });
    } catch (error) {
      console.log(error);
    }
  }

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
