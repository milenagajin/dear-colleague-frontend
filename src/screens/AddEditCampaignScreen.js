import React, { Component } from "react";
import CampaignService from "../services/CampaignService";
import withAuthComponent from "../components/withAuthComponent";
import NavbarScreen from "./NavbarScreen";

class AddEditCampaignScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      name: "",
      company_name: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    if (id) {
      console.log(CampaignService.getOne);
      CampaignService.getOne(id)
        .then(response => {
          this.setState({
            id: response.data.id,
            name: response.data.name,
            company_name: response.data.company_name
          });
        })
        .catch(error => console.log(error));
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

    if (this.state.id) {
      let edited = {};
      edited.id = this.state.id;
      edited.name = this.state.name;
      edited.company_name = this.state.company_name;

      CampaignService.saveOne(edited)
        .then(() => {
          this.redirect();
        })
        .catch(error => console.log(error));
    } else {
      let newCampaign = {};
      newCampaign.id = null;
      newCampaign.name = this.state.name;
      newCampaign.company_name = this.state.company_name;
      CampaignService.saveOne(newCampaign)
        .then(() => {
          this.redirect();
        })
        .catch(error => console.log(error));
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
