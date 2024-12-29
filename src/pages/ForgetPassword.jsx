import { Box, Modal, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';

const ForgetPassword = () => {

  const [errors, setErrors] = useState({});

  const [obj,setObj]=useState({})

  const [otp, setOtp] = useState(['', '', '', '']);

  const handleInputChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);
    setOtp(newOtp);
  };

  const validateInputs = () => {
    let validationErrors = {};
    if (!obj.email || obj.email.trim() === "") {
      validationErrors.email = "Email is required.";
    }
    if (!obj.password) {
      validationErrors.password = "Password is required.";
    }
    if (!obj.confirmPassword || obj.confirmPassword.trim() === "") {
      validationErrors.confirmPassword = "confirmPassword is required.";
    }else if(obj.confirmPassword !== obj.password){
      validationErrors.confirmPassword = "confirmPassword is does Not Match the Password.";
    }
    return validationErrors;
  };

  const handleValidateOtp = () => {
    setIsOpen(false)
  }
  const handleObj = (e) => {
    const { name, value } = e.target;
    setObj({ ...obj, [name]: value });
  };

  const [isOpen, setIsOpen] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      axios.post('http://103.60.212.74:8080/login/forgot-password', { email:obj.email })
        .then(res => {
          if(res.status === 200){
            setIsOpen(true)
          }else{
            
          }
        })
    }
  }

  return (
    <div>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 3,
          }}
        >
          <h6 gutterBottom align="center">
            Enter OTP
          </h6>
          <Box display="flex" justifyContent="space-between" mb={2}>
            {otp.map((digit, index) => (
              <TextField
                key={index}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                inputProps={{ maxLength: 1 }}
                sx={{ width: '20%' }}
                variant="outlined"
                size="small"
                autoFocus={index === 0}
              />
            ))}
          </Box>
          <button onClick={handleValidateOtp}>Submit</button>
        </Box>
      </Modal>

      <div className="container">
        <h2>Forget Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="">Email Address::</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter Email..."
              onChange={handleObj}
              value={obj.email || ""}
            />
            {errors.email && <p className="text-danger">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="">New Password:</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter Password..."
              onChange={handleObj}
              value={obj.password || ""}
            />
            {errors.password && <p className="text-danger">{errors.password}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="">confirmPassword:</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              placeholder="Enter confirmPassword..."
              onChange={handleObj}
              value={obj.confirmPassword || ""}
            />
            {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword}</p>}
          </div>
          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
