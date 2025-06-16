import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    user: "",
    pass: "",
  });
  const Navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/register", formData);

      if (res) {
        alert("Registered Successfully");
        Navigate("/login");
      }
    } catch (error) {
      if (error.response.status === 500) {
        alert("User already exists");
      }
      if (error.response.status === 400) {
        alert("Enter Valid credentials");
      }
      console.log("error in register: ", error.message);
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
            Register
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
            <button onClick={register}>Register</button>{" "}
            <Link to={"/login"} style={{ marginLeft: "10px" }}>
              Already have account?
            </Link>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;
