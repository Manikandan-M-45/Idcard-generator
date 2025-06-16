import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = ({setIsLoggedIn}) => {
  const [formData, setFormData] = useState({
    user: "",
    pass: "",
  });
  const Navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", formData);
      console.log('res:', res)
      if (res) {
        alert("Logged in Successfully");
        setIsLoggedIn(true);
        Navigate("/");
      }
    } catch (error) {
      alert("Enter Valid credentials");
      setIsLoggedIn(false);
      console.log("error in login: ", error.message);
    }
  };

  return (
    <div>
      <form method="post" style={{ width: "50%", margin: "auto" }}>
        <fieldset>
          <legend
            style={{
              fontSize: "20px",
              fontWeight: "800",
              padding: "20px",
              textAlign: "center",
            }}
          >
            Login
          </legend>
          <input
            type="text"
            name="user"
            onChange={handleChange}
            value={formData.user}
            placeholder="ENTER USERNAME"
            style={{
              height: "30px",
              fontSize: "15px",
              marginLeft: "10%",
              width: "80%",
              marginTop: "10px",
              textAlign: "center",
            }}
          />
          <br />
          <input
            type="password"
            name="pass"
            onChange={handleChange}
            value={formData.pass}
            placeholder="ENTER PASSWORD"
            style={{
              height: "30px",
              fontSize: "15px",
              marginLeft: "10%",
              width: "80%",
              marginTop: "10px",
              textAlign: "center",
            }}
          />
          <br />
          <br />
          <div style={{ textAlign: "center" }}>
            <button onClick={login}>Login</button>{" "}
            <Link to={"/register"} style={{ marginLeft: "10px" }}>
              New user?
            </Link>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
