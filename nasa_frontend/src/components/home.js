import React, { Component, useEffect, useState } from "react";
import axios from "axios";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
      nasaData: "",
    };
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/home`, {
      method: "POST",
      crossDoman: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        this.setState({ userData: data.data });
      });
    fetch(
      "https://api.nasa.gov/planetary/apod?api_key=vlyhhp799gp1kecX50EEX2r5ZomDpm7y1hmMqvcG"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data, "nasaData");
        this.setState({ nasaData: data });
      })
      .catch((error) => console.log(error));
  }
  logOut = () => {
    window.localStorage.clear();
    window.location.href = "./signin";
  };
  render() {
    return (
        <div className="nasa-img-div">
          <h1 className="nasa-img-title">{this.state.nasaData.title}</h1>
          <div className="nasa-img">
            <img src={this.state.nasaData.url} alt="Nasa Picture of the Day" />
          </div>
          <p className="nasa-img-desc">{this.state.nasaData.explanation}</p>
          <div className="logout-btn">
            <button onClick={this.logOut} className="btn btn-primary">
              Log out
            </button>
          </div>
        </div>
    );
  }
}
