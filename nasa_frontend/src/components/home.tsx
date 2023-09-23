import React, { Component, useEffect, useState } from "react";
import axios from "axios";

interface HomeProps {}

interface HomeState {
  userData: string | null;
  nasaData: {
    title: string;
    url: string;
    explanation: string;
  } | null;
}

export default class Home extends Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      userData: null,
      nasaData: null,
    };
  }

  async componentDidMount() {
    try {
      const response1 = await fetch(`${process.env.REACT_APP_API_URL}/home`, {
        method: "POST",
        // crossDoman: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          token: window.localStorage.getItem("token"),
        }),
      });

      const userData = await response1.json();
      console.log(userData, "userData");
      this.setState({ userData: userData });

      const response2 = await fetch(
        "https://api.nasa.gov/planetary/apod?api_key=vlyhhp799gp1kecX50EEX2r5ZomDpm7y1hmMqvcG"
      )
      
      const nasaData = await response2.json();
      console.log(nasaData, "nasaData")
      this.setState({ nasaData: nasaData });
    } catch (error) {
      console.log(error)
    }
  }
  logOut = () => {
    window.localStorage.clear();
    window.location.href = "./signin";
  };
  render() {
    return (
        <div className="nasa-img-div">
          <h1 className="nasa-img-title">{this.state.nasaData?.title}</h1>
          <div className="nasa-img">
            <img src={this.state.nasaData?.url} alt="Nasa Picture of the Day" />
          </div>
          <p className="nasa-img-desc">{this.state.nasaData?.explanation}</p>
          <div className="logout-btn">
            <button onClick={this.logOut} className="btn btn-primary">
              Log out
            </button>
          </div>
        </div>
    );
  }
}
