import React, { Component } from "react";
import CampaignService from "../../services/CampaignService";
import withAuthComponent from "../../components/auth/withAuthComponent";
import NavbarScreen from "../NavbarScreen";

class AddEditCampaignScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      name: "",
      company_name: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    const campaignId = this.props.match.params.campaignId;
    if (campaignId) this.getOne(campaignId);
  }

  async getOne(campaignId) {
    try {
      const { data } = await CampaignService.getOne(campaignId);
      this.setState(
        {
          id: data.id,
          name: data.name,
          company_name: data.company_name
        },
        console.log(this.state)
      );
    } catch (error) {
      console.log(error);
    }
  }

  redirect() {
    this.props.history.replace("/campaigns");
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleFormSubmit(event) {
    event.preventDefault();

    this.state.id ? this.editCampaign() : this.createCampaign();
  }

  async editCampaign() {
    try {
      let edited = {};
      edited.id = this.state.id;
      edited.name = this.state.name;
      edited.company_name = this.state.company_name;

      await CampaignService.saveOne(edited);
      this.redirect();
    } catch (error) {
      console.log(error);
    }
  }

  async createCampaign() {
    try {
      let newCampaign = {};
      newCampaign.id = null;
      newCampaign.name = this.state.name;
      newCampaign.company_name = this.state.company_name;
      await CampaignService.saveOne(newCampaign);
      this.redirect();
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <NavbarScreen history={this.props.history} />
        <div className="center">
          <div className="card">
            <h1>CAMPAIGN:</h1>
            <form>
              <input
                className="form-item"
                placeholder="Name of campaign"
                name="name"
                type="text"
                value={this.state.name}
                onChange={this.handleChange}
              />
              <input
                className="form-item"
                placeholder="Company name "
                name="company_name"
                type="text"
                value={this.state.company_name}
                onChange={this.handleChange}
              />
              <input
                className="form-submit"
                value="SUBMIT"
                type="submit"
                onClick={this.handleFormSubmit}
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuthComponent(AddEditCampaignScreen);
