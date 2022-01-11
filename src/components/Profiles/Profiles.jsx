import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import { Card, Modal, Button } from "antd";
import { Row, Col, Form, Input, message, Popover } from "antd";
import {
  getOwnerByEmail,
  updateStore,
  getUserStore
} from "./../../services/RequestService";
import moment from "moment";
import { inject } from "mobx-react";
import { Link,withRouter } from "react-router-dom";


const { TabPane } = Tabs;

const Profiles = ({auth}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [owner, setOwner] = useState(null);

  const [formStoreProfile] = Form.useForm();
  const [formUserProfile] = Form.useForm();
  const submitUserDetails = () => {};
  const submitStoreDetails = () => {
    formStoreProfile
        .validateFields()  
        .then((values) =>{
          console.log(values);
          updateStore(
            {
              ownerId:JSON.parse(localStorage.getItem("ownerInfo")).store.ownerId ,
            storeId: JSON.parse(localStorage.getItem("ownerInfo")).store.storeId ,
            storeRefId:JSON.parse(localStorage.getItem("ownerInfo")).store.storeRefId,
             storeCode:values["storeCode"],
            storeName: values["storeName"],
            streetName: values["streetName"],
            postalcode: values["postalcode"],
            city: values["city"],
            province: values["province"],
            primaryContact: values["primaryContact"],
            secondaryContact: values["secondaryContact"],
            modifier: JSON.parse(localStorage.getItem("userInfo")).username,
            modified: moment().format("YYYY-MM-DD"),
           
            })
            .then((data) => {
              console.log(data);
              
              message.success("Store details updated successfully!!")
             
                auth.setOwnerInfo({
                  store:data
                })
              formStoreProfile.resetFields();
              setIsModalVisible(false);
            })
            .catch((error) => {
              console.log(error.response)
              if (error.response.data) {
                let errorKeys = error.response ?  Object.keys(error.response.data) : [];
                errorKeys.map((key)=>error.response.data[`${key}`] ?  message.error(key + " " +error.response.data[`${key}`]) : null)
              }
            })
        })
  };
  //const dummyData = [{ storeName: "My store" }];
  const showModal = () => {
    setIsModalVisible(true);

     formStoreProfile.setFieldsValue({
       storeCode:JSON.parse(localStorage.getItem("ownerInfo")).store.storeCode,
      storeName:JSON.parse(localStorage.getItem("ownerInfo")).store.storeName,
      streetName:JSON.parse(localStorage.getItem("ownerInfo")).store.streetName,
      postalcode:JSON.parse(localStorage.getItem("ownerInfo")).store.postalcode,
      city:JSON.parse(localStorage.getItem("ownerInfo")).store.city,
      province:JSON.parse(localStorage.getItem("ownerInfo")).store.province,
      primaryContact:JSON.parse(localStorage.getItem("ownerInfo")).store.primaryContact,
      secondaryContact:JSON.parse(localStorage.getItem("ownerInfo")).store.secondaryContact
     });
  };
  const showUserModal = () => {
    setIsUserModalVisible(true);

    //  formStoreProfile.setFieldsValue({
    //    storeName: dummyData[0].storeName,
    //  });
  };
  const handleOk = () => {
    setIsModalVisible(false);
    setIsUserModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsUserModalVisible(false);
  };
  const getOwner= () => {
    console.log(JSON.parse(localStorage.getItem("userInfo")).email);
        getOwnerByEmail(JSON.parse(localStorage.getItem("userInfo")).email).then((data) => {
          console.log(data);
          setOwner(data);
          localStorage.setItem("owner", JSON.stringify(data));
          })
        .catch((error) => {
          console.log(error.response)
          if (error) {
            message.error(error.response);
          }
        });
  }
  useEffect(() => {
   getOwner()
}, []); 
  return (
    <div className="card-container">
      <Tabs type="card">
        <TabPane tab="User Profile" key="1">
          <p>
            <>
              <Card
                title={owner != null ? owner.username : "" }
                // extra={
                //   <Button type="primary" onClick={showUserModal}>
                //     Edit
                //   </Button>
                // }
                style={{ width: 300 }}
              >
                <p>User Name : {owner != null ? owner.username : "" }</p>
                <p> First Name : {owner != null ?owner.firstname: ""} </p>
                <p> Last Name : {owner != null ?owner.lastname: ""} </p>
                <p> Email ID : {owner != null ?owner.email: ""}</p>
                
              </Card>

              <Modal
                title="Personal Information"
                visible={isUserModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <p>
                  <Form
                    form={formUserProfile}
                    initialValues={{ size: "small" }}
                  >
                    <Form.Item
                      name="userName"
                      rules={[
                        {
                          required: true,
                          message: "Please input user name!",
                        },
                      ]}
                    >
                      <Input placeholder="User Name" />
                    </Form.Item>
                    <Form.Item
                      name="fname"
                      rules={[
                        {
                          required: true,
                          message: "Please input your first name!",
                        },
                      ]}
                    >
                      <Input placeholder="First Name" />
                    </Form.Item>
                    <Form.Item
                      name="lname"
                      rules={[
                        {
                          required: true,
                          message: "Please input your last name!",
                        },
                      ]}
                    >
                      <Input placeholder="Last Name" />
                    </Form.Item>
                    <Form.Item
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please input your email ID!",
                        },
                      ]}
                    >
                      <Input placeholder="Email ID" />
                    </Form.Item>
                    <Form.Item
                      name="userNum"
                      rules={[
                        {
                          required: true,
                          message: "Please input your phone number!",
                        },
                      ]}
                    >
                      <Input placeholder="Phone Number" />
                    </Form.Item>

                    <Form.Item>
                      <Button
                        shape="round"
                        type="primary"
                        style={{ width: "100%" }}
                        onClick={submitUserDetails}
                      >
                        Update
                      </Button>
                      <br />
                      <br />
                    </Form.Item>
                  </Form>
                </p>
              </Modal>
            </>
          </p>
        </TabPane>
        <TabPane tab="Store Information" key="2">
          <p>
            <>
              <Card
                title={JSON.parse(localStorage.getItem("ownerInfo")).store.storeName}
                extra={
                  <Button type="primary" onClick={showModal}>
                    Edit
                  </Button>
                }
                style={{ width: 300 }}
              >
                <p>Store Name: {JSON.parse(localStorage.getItem("ownerInfo")).store.storeName}</p>
                <p>Street Name: {JSON.parse(localStorage.getItem("ownerInfo")).store.streetName} </p>
                <p>Postal Code: {JSON.parse(localStorage.getItem("ownerInfo")).store.postalcode}</p>
                <p>City : {JSON.parse(localStorage.getItem("ownerInfo")).store.city}</p>
                <p>Province: {JSON.parse(localStorage.getItem("ownerInfo")).store.province}</p>
                <p>Primary Contact(Owner): {JSON.parse(localStorage.getItem("ownerInfo")).store.primaryContact} </p>
                <p>Secondary Contact : {JSON.parse(localStorage.getItem("ownerInfo")).store.secondaryContact} </p>
              </Card>

              <Modal
                title="Store Information"
                visible={isModalVisible}
                footer={null}
               
                onCancel={handleCancel}
              >
                <p>
                  <Form
                    form={formStoreProfile}
                    initialValues={{ size: "small" }}
                  >
                    <Form.Item
                      name="storeName"
                      rules={[
                        {
                          required: true,
                          message: "Please input store name!",
                        },
                      ]}
                    >
                      <Input placeholder="Store Name" />
                    </Form.Item>
                    <Form.Item
                      name="streetName"
                      rules={[
                        {
                          required: true,
                          message: "Please input street name!",
                        },
                      ]}
                    >
                      <Input placeholder="Street Name" />
                    </Form.Item>
                    <Form.Item
                      name="storeCode"
                      rules={[
                        {
                          required: true,
                          message: "Please input Store Code!",
                        },
                      ]}
                    >
                      <Input placeholder="Store Code" />
                    </Form.Item>
                    <Form.Item
                      name="postalcode"
                      rules={[
                        {
                          required: true,
                          message: "Please input postalCode!",
                        },
                      ]}
                    >
                      <Input placeholder="Postal Code" />
                    </Form.Item>
                    <Form.Item
                      name="city"
                      rules={[
                        {
                          required: true,
                          message: "Please input city!",
                        },
                      ]}
                    >
                      <Input placeholder="City" />
                    </Form.Item>
                    <Form.Item
                      name="province"
                      rules={[
                        {
                          required: true,
                          message: "Please input city!",
                        },
                      ]}
                    >
                      <Input placeholder="Province" />
                    </Form.Item>
                    <Form.Item
                      name="primaryContact"
                      rules={[
                        {
                          required: true,
                          message: "Please input primary contact!",
                          length: 10,
                        },
                      ]}
                    >
                      <Input placeholder="Primary Contact" />
                    </Form.Item>
                    <Form.Item
                      name="secondaryContact"
                      rules={[
                        {
                          required: true,
                          message: "Please input secondary contact!",
                          length: 10,
                        },
                      ]}
                    >
                      <Input type="number" placeholder="Secondary Contact" />
                    </Form.Item>

                    <Form.Item>
                      <Button
                        shape="round"
                        type="primary"
                        style={{ width: "100%" }}
                        onClick={submitStoreDetails}
                      >
                        Update
                      </Button>
                      <br />
                      <br />
                    </Form.Item>
                  </Form>
                </p>
              </Modal>
            </>
          </p>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default inject(
  "auth",
 )(withRouter(Profiles));
