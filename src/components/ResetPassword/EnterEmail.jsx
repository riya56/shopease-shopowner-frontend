import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { Row, Col, Button, Form, Input, message } from "antd";
import { LockOutlined, HomeOutlined,MailOutlined } from "@ant-design/icons";
import { requestResetEmail } from "./../../services/RequestService";
import "./EnterEmail.scss";
const EnterEmail = ({history}) => {
    const [formEnterEmail] = Form.useForm();
    const getLink = () =>{
        formEnterEmail.validateFields()
        .then((values)=>{
            console.log(values);
            requestResetEmail({
                email:values["email"]
            })
            .then((data) => {
                console.log(data);
                
                if(data.data.success)
                {
                  message.success(data.data.success);
                }
                else{
                  message.error("This email is not registered");
                }
            })
            .catch((error) => {
                console.log(error.response)
                if (error) {
                  message.error(error.response.data.detail);
                }
              });
        })
    }
    return ( 
      
        <div className="emailPanel">
            <h2>Enter email to get reset link</h2>
            <Form form={formEnterEmail}>
            <Row>
              <Col span={24}>
              <Form.Item
                name="email"
                rules={[
                    {
                      type: "email",
                      message: "The input is not valid email!",
                    },
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter your email"
                  prefix={<MailOutlined />}
                />
              </Form.Item>
              </Col>
        </Row>
             <Row>
               <Col span={6}>
               
               </Col>
               <Col span={12}>
               <Form.Item>
                <Button
                
                  shape="round"
                  type="primary"
                  onClick={getLink}
                  style={{width:"100%"}}
                >
                  Submit
                </Button>
               
              </Form.Item>
               </Col>
               <Col span={6}>
               
               </Col>
             </Row>

             
            </Form>
         
        </div>
     );
}
 
export default withRouter(EnterEmail);