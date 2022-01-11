import React, { useState,useEffect } from "react";
import { Row, Col, Button, Form, Input, message } from "antd";
import { LockOutlined, HomeOutlined } from "@ant-design/icons";

import { useParams } from "react-router-dom";
import { Link, withRouter } from "react-router-dom";
 import { passwordResetTokenCheck,passwordResetComplete } from "./../../services/RequestService";
import "./ResetPassword.scss";
const ResetPassword = ({ history }) => {
  const [formResetpass] = Form.useForm();
  let [showLoader, showLoaderChange] = useState(0);
  const [tokenStatus, setTokenStatus] = useState(null)
  const { uidb64,token } = useParams();
  const resetpass = () => {
    showLoaderChange(1);
  
      formResetpass
        .validateFields()
        .then((values) => {
            if(tokenStatus.success == true)
            {
                let newData = {
                    token:tokenStatus.token,
                    uidb64:tokenStatus.uidb64,
                    password:values["password"]
                };
               
                passwordResetComplete(
                    newData
                  )
                    .then( (data) => {
                      console.log(data);
                      showLoaderChange(0);
                      history.push("/login");
                      message.success(data.message,2);
                    })
                    .catch((e) => {
                        console.log(e);
                      showLoaderChange(0);
                       message.error(e.response.data.detail);
                    });
            }
           
        })
        .catch((e) => {
          showLoaderChange(0);
        });
  
  };
useEffect(() => {
    passwordResetTokenCheck(uidb64,token).then((data)=>{
        console.log(data);
        setTokenStatus(data);

    })
}, [])
  return (
    <div>
      {/* <Row>
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <div className="title">
            <p>ShopEASE</p>
          </div>
        </Col>
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <div className="homeNavigationOTP">
            <span>
              <Link to="/">
                <HomeOutlined />
              </Link>
            </span>
          </div>
        </Col>
      </Row> */}
      <div className="resetPanel">
        <Row>
          <Col span={24}>
            <h1>Reset Password</h1>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24}>
            <Form form={formResetpass}>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "Enter your password" }]}
              >
                <Input.Password
                  size="large"
                  placeholder="Enter your password"
                  prefix={<LockOutlined />}
                />
              </Form.Item>
              <Form.Item
                name="confirm-password"
                rules={[
                  { required: true, message: "Confirm your password" },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (
                        !value ||
                        getFieldValue("password") === value
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        "The two passwords that you entered do not match!"
                      );
                    },
                  }),
                ]}
                dependencies={["password"]}
                hasFeedback
              >
                <Input.Password
                  size="large"
                  placeholder="Confirm your password"
                  prefix={<LockOutlined />}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  loading={showLoader}
                  shape="round"
                  type="primary"
                  onClick={resetpass}
                  style={{ width: "50%" }}
                >
                  Submit
                </Button>
               
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default withRouter(ResetPassword);
