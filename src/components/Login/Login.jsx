import React,{useState,useEffect} from 'react';
import { Link,withRouter } from "react-router-dom";
import { Row, Col, Form, Input, Button, message, } from 'antd';
import {
    LockOutlined,
    MailOutlined,
  } from "@ant-design/icons";
  import {
    login,
    getUserStore,
    addStore,
    getCategoryByStoreId,
    getProductByStoreId
  } from "./../../services/RequestService";
  import Background from "../Background/Background";
  import StoreProfile from "../StoreProfile/StoreProfile";
  import "./Login.scss";
  import moment from "moment";
  import { inject } from "mobx-react";
  import { toJS } from "mobx";


const Login = ({auth,history}) => {
    const [formLogin] = Form.useForm();
    const [formStoreProfile] = Form.useForm();
    let [showLoader, showLoaderChange] = useState(0);
    let [showStoreForm, setShowStoreForm] = useState(0);
    const loginUser = () => {
      
      console.log(toJS(auth.userInfo));
      showLoaderChange(1);
        formLogin
        .validateFields()
        .then((values) => {
            console.log(values);
         //API below   
          login({
            email: values["email"],
            password: values["password"],
          })
            .then((data) => {
               console.log(data);
              // set state   
             
                showLoaderChange(0);
                
               
               
               if(data.data.store_flag)
               {
               
                
                auth.setUserInfo({
                  accessToken: data.data.tokens.access,
                  refreshToken:data.data.tokens.refresh,
                  email: data.data.email,
                  ownerId:data.data.id,
                  username:data.data.username,
                
                });
                auth.setCommonHeaders();
                console.log(toJS(auth.userInfo));
                getUserStore(data.data.id).then((response)=>{
                  console.log(response);
                  auth.setOwnerInfo({
                    store:response
                  });
                }).then(()=>{
                  getProductFunction()
               
                  getCategoryFunction()
                })
                
               
                 setTimeout(() => {
                  history.push("/dashboard");
                 }, 1500);
                 
               
               
               
               }
               else{
                 getUserStore(data.data.id).then((response)=>{
                  console.log(response);
                }).catch((error) => {
                  auth.setUserInfo({
                    accessToken: data.data.tokens.access,
                    refreshToken:data.data.tokens.refresh,
                    email: data.data.email,
                    ownerId:data.data.id,
                    username:data.data.username,
                  
                  });
                  auth.setCommonHeaders();
                  console.log(toJS(auth.userInfo));
                  setShowStoreForm(1)
                  // console.log(error.response)
                  message.info("please enter your store details");
                });
                
               }
              
              formLogin.resetFields();
            })
            .catch((error) => {
              showLoaderChange(0)
              console.log(error.response)
              if (error) {
               
                message.error(error.response.data.detail);
              }
            });
            
        })
        
      };
      const submitStoreDetails = () =>{
        formStoreProfile
        .validateFields()
        .then((values) => {
            console.log(values);
          addStore({
           
            storeName: values["storeName"],
            storeCode: values["storeCode"],
            streetName: values["streetName"],
            postalcode: values["postalCode"],
            city: values["city"],
            province: values["province"],
            primaryContact: values["primaryContact"],
            secondaryContact: values["secondaryContact"],
            fromDate: moment().format("YYYY-MM-DD"),
            thruDate: "2099-01-01",
            creator: JSON.parse(localStorage.getItem("userInfo")).username,
            created: moment().format("YYYY-MM-DD"),
            ownerId: JSON.parse(localStorage.getItem("userInfo")).ownerId
        })
            .then((data) => {
               console.log(data);
               setShowStoreForm(1)
              if (data.type !== "error") {
                auth.setOwnerInfo({
                  store:data.data
                });
                setTimeout(() => {
                  history.push("/dashboard");
                 }, 1000);
                message.success("login successful !!");
              }
              formStoreProfile.resetFields();

            })
            .catch((error) => {
              showLoaderChange(0)
              console.log(error.response)
              if (error) {
                message.error(error.response.data.detail);
              }
            });
            
        })
        
    }
    const getProductFunction = () => {
      getProductByStoreId(JSON.parse(localStorage.getItem("ownerInfo")).store.storeId)
      .then((data) => {
        console.log(data);
       localStorage.setItem("productCount", JSON.stringify(data.length));
        })
      .catch((error) => {
        console.log(error.response)
        if (error) {
          message.error(error.response);
        }
      });
    }
    const getCategoryFunction = () => {
      getCategoryByStoreId(JSON.parse(localStorage.getItem("ownerInfo")).store.storeId)
      .then((data) => {
        console.log(data);
        localStorage.setItem("categoryCount", JSON.stringify(data.length));
        })
      .catch((error) => {
        console.log(error.response)
        if (error) {
          // message.error(error.response.data.detail);
        }
      });
    }
    useEffect(() => {
      // getProductFunction()
      // getCategoryFunction()
  }, []); 
    return ( 
        <Background>
          {showStoreForm == 0 ?  
            <div className="loginPanel">
              <div
                style={{
                  marginBottom: "15px",
                  fontWeight: "800",
                  color: "black",
                textAlign:"center"
                }}
              >
                LOGIN
              </div>
              <Form form={formLogin} initialValues={{ size: "small" }}>
              
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
                  <Input placeholder="Email" prefix={<MailOutlined />} />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password placeholder="Password" prefix={<LockOutlined />} />
                </Form.Item>
              
                <Form.Item>
                  <Button
                    loading={showLoader}
                    shape="round"
                    type="primary"
                    style={{ width: "100%" }}
                    
                    onClick={loginUser}
                  >
                    Login
                  </Button>
                  <br />
                  <br />
                  <p className="fontSmall">
                    Dont't have an account ?&nbsp;
                    <span>
                      <Link to="/register"><font color="rgb(60, 42, 90)">Register</font></Link>
                    </span>
                    <br />
                    <br />
                    <span>
                      <Link to="/password-reset-email"><font color="rgb(60, 42, 90)">Forgot Password</font></Link>
                    </span>
                  </p>
                </Form.Item>
              </Form>
            </div>
            :
            <div className="registerPanel">
            
          <div
            style={{
              marginBottom: "20px",
              fontWeight: "700",
              color: "#6170f7",
              textAlign:"center"
            }}
          >
            Add Store Details
          </div>
          <StoreProfile submitStoreDetails={submitStoreDetails} formStoreProfile={formStoreProfile}/>
        </div>
      }
        
      </Background>  );
}
 
export default inject(
  "auth",
 )(withRouter(Login));