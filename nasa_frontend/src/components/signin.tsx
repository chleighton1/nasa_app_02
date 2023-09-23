import React, { Component, FormEvent } from "react";
import googleButton from "../assets/google_signin_buttons/web/1x/btn_google_signin_dark_pressed_web.png";

function navigate(url: string) {
  window.location.href = url;
}

async function auth() {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/request`, {
    method: "post",
  });
  const data = await response.json();
  if (data) {
    window.localStorage.setItem("token", data.data);
    window.localStorage.setItem("loggedIn", "true");
  }
  navigate(data.url);
}

interface SigninState {
  email: string;
  password: string;
}

export default class Signin extends Component<{}, SigninState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e: FormEvent) {
    e.preventDefault();
    const { email, password } = this.state;
    console.log(email, password);
    fetch(`${process.env.REACT_APP_API_URL}/signin`, {
      method: "POST",
      // crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status === "ok") {
          alert("login successful");
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("loggedIn", "true");
          window.location.href = "/home";
        } else {
          alert(data.error);
        }
      });
  }

  render() {
    return (
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <form onSubmit={this.handleSubmit}>
              <h3>Sign In</h3>

              <div className="mb-3">
                <label>Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  required
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
              </div>

              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  required
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Sign In
                </button>
              </div>

              <p className="forgot-password text-right">
                Need an account? <a href="/signup">Sign Up</a>
              </p>
            </form>

            <button className="g-btn" type="button" onClick={() => auth()}>
              <img src={googleButton} alt="google sign in" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
