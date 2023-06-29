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
        // if (data.data == "session expired") {
        //   alert("Session expired, please log in again");
        //   window.localStorage.clear();
        //   window.location.href = "./signin";
        // }
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

      // <div className="nasa-img-div">
      //   <h1 className="nasa-img-title">The Belt of Venus over Mount Everest</h1>
      //   <div className="nasa-img">
      //     <img
      //       src="https://apod.nasa.gov/apod/image/2306/BeltofEverest_Mukherjee_960.jpg"
      //       alt="Nasa Picture of the Day"
      //     />
      //   </div>
      //   <p className="nasa-img-desc">
      //     Sit amet mattis vulputate enim nulla aliquet porttitor. Tellus
      //     molestie nunc non blandit. Dignissim sodales ut eu sem integer vitae
      //     justo. Donec ac odio tempor orci dapibus. Auctor urna nunc id cursus.
      //     Pellentesque elit eget gravida cum sociis natoque penatibus. Nisi
      //     lacus sed viverra tellus in hac. Eleifend donec pretium vulputate
      //     sapien nec sagittis aliquam. Urna neque viverra justo nec ultrices dui
      //     sapien eget mi. Gravida in fermentum et sollicitudin ac orci phasellus
      //     egestas tellus. Natoque penatibus et magnis dis parturient. Posuere
      //     lorem ipsum dolor sit amet consectetur. Eu lobortis elementum nibh
      //     tellus. In arcu cursus euismod quis viverra. Mattis enim ut tellus
      //     elementum sagittis vitae et. Faucibus scelerisque eleifend donec
      //     pretium vulputate sapien nec. Duis at consectetur lorem donec massa
      //     sapien. Faucibus ornare suspendisse sed nisi lacus sed.
      //   </p>
      //   <div className="logout-btn">
      //     <button onClick={this.logOut} className="btn btn-primary">
      //       Log out
      //     </button>
      //   </div>
      // </div>
    );
  }
}
