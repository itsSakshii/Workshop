

import './App.css';
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [mobileNumber, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [eNumber, setEnumber] = useState("");
  const [address, setAddress] = useState("");
  const [studentRecords, setStudent] = useState([]);

  const [errors, setErrors] = useState({
    name: "",
    mobileNumber: "",
    email: "",
    eNumber: "",
    address: "",
  });

  const onSubmit = () => {
    let isValid = true;

    
    if (!name || !/^[A-Za-z\s]+$/.test(name)) {
      setErrors(prevErrors => ({ ...prevErrors, name: "*Please enter a valid name without special characters or numbers" }));
      isValid = false;
    } else {
      setErrors(prevErrors => ({ ...prevErrors, name: "" }));
    }

    // Validate mobile number
    if (!mobileNumber || !/^\d{10}$/.test(mobileNumber)) {
      setErrors(prevErrors => ({ ...prevErrors, mobileNumber: "*Please enter a valid 10-digit mobile number" }));
      isValid = false;
    } else {
      setErrors(prevErrors => ({ ...prevErrors, mobileNumber: "" }));
    }

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors(prevErrors => ({ ...prevErrors, email: "*Please enter a valid email address" }));
      isValid = false;
    } else {
      setErrors(prevErrors => ({ ...prevErrors, email: "" }));
    }

    // Validate enrollment number uniqueness
    if (studentRecords.some(record => record.eNumber === eNumber)) {
      setErrors(prevErrors => ({ ...prevErrors, eNumber: "*Enrollment number must be unique" }));
      isValid = false;
    } else {
      setErrors(prevErrors => ({ ...prevErrors, eNumber: "" }));
    }

    // Validate address
    if (!address) {
      setErrors(prevErrors => ({ ...prevErrors, address: "*Please enter an address" }));
      isValid = false;
    } else {
      setErrors(prevErrors => ({ ...prevErrors, address: "" }));
    }

    if (isValid) {
      const jsonData = {
        name: name,
        mobile: mobileNumber,
        email: email,
        eNumber: eNumber,
        address: address,
      };

      // Update studentRecords by creating a new array
      setStudent(prevRecords => [...prevRecords, jsonData]);
     
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <div>
            <label>
              Student Name : <input type="text" value={name} onChange={(e) => setName(e.target.value)} maxLength={60} required />
              {errors.name && <span className="error">{errors.name}</span>}
            </label>{" "}
          </div>
          <div>
            <label>
              Student Phone Number : <input type="tel" value={mobileNumber} onChange={(e) => setMobile(e.target.value)} required />
              {errors.mobileNumber && <span className="error">{errors.mobileNumber}</span>}
            </label>{" "}
          </div>
          <div>
            <label>
              Student Email : <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              {errors.email && <span className="error">{errors.email}</span>}
            </label>{" "}
          </div>
          <div>
            <label>
              Student En. Number : <input type="text" value={eNumber} onChange={(e) => setEnumber(e.target.value)} required />
              {errors.eNumber && <span className="error">{errors.eNumber}</span>}
            </label>{" "}
          </div>
          <div>
            <label>
              Student Address : <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
              {errors.address && <span className="error">{errors.address}</span>}
            </label>{" "}
          </div>
          <div>
            <button onClick={onSubmit}>Submit</button>
          </div>
          <br></br>
          { (
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Email</th>
                    <th>Enroll.No</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  {studentRecords.map((val, key) => (
                    <tr key={key}>
                      <td>{val.name}</td>
                      <td>{val.mobile}</td>
                      <td>{val.email}</td>
                      <td>{val.eNumber}</td>
                      <td>{val.address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </p>
      </header>
    </div>
  );
}

export default App;


