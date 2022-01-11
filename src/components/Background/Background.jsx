import React, { useState } from "react";
import {
    Row,
    Col,
    
  } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Link, withRouter } from "react-router-dom";
import imagePath from "../../config/imagePaths";

import "./Background.scss";

const Background = ({ children }) => {
  return (
      <Row gutter={[64,16]}>
          <Col span={14}>
          <div>
                <img
                className="loginBackground"
                src={imagePath.login_register_background}
                alt="ShopEase Logo"
                width="100%"
                height="100%"
                />
                <h1 className="shopName">ShopEASE</h1> 
            </div>
          </Col>
        <Col span={10}>
        <div>{children}</div>
        
        </Col>
      </Row>
  
     
     

  );
};

export default withRouter(Background);
