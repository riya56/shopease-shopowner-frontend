import React, { useState,useEffect } from "react";
import { Row, Col, Button, Form, Input, message,Spin } from "antd";
import { LockOutlined, HomeOutlined } from "@ant-design/icons";

import { useParams } from "react-router-dom";



import { Link, withRouter } from "react-router-dom";
import { verifyEmail } from "./../../services/RequestService";

const VerifyEmail = ({ history }) => {
  const { token } = useParams();
  
  
  useEffect(() => {
    
      verifyEmail(token)
      .then((data) => {
        console.log(data);
        message.success(data.email);
        history.push("/login");
      })
      .catch((error) => {
        console.log(error.response)
        if (error) {
          message.error(error.response.data.email);
        }
      });
    
  }, []);
  return (
    <div style={{display:"block",marginLeft:"auto",marginRight:"auto",width:"0%"}}>
      <Spin size="large" />
    </div>
  );
};

export default withRouter(VerifyEmail);
