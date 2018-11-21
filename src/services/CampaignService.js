import React, { Component } from "react";
import axios from "axios";

const ENDPOINTS = {
  BASE_URL: "http://localhost:8000",
  CAMPAIGNS: "/api/campaigns"
};
export default class CampaignService {
  getOne = id => {
    return axios.get(`${ENDPOINTS.BASE_URL}${ENDPOINTS.CAMPAIGNS}/${id}`);
  };
}
