import React from 'react';
import {
    Row,
    Col,
    Button,
    Form,
    Input,
    message,
    Card,
    Popover,
  } from "antd";
const StoreProfile = ({submitStoreDetails,formStoreProfile}) => {
  
    return ( 
        
                <Form form={formStoreProfile} initialValues={{ size: "small" }}>
                    <Form.Item
                        name="storeName"
                        rules={[
                        {
                            required: true,
                            message: "Please input store name!",
                        },
                        ]}
                    >
                        <Input placeholder="Store Name"  />

                    </Form.Item>
                    <Form.Item
                        name="storeCode"
                        rules={[
                        {
                            required: true,
                            message: "Please input store code!",
                        },
                        ]}
                    >
                        <Input type="number" placeholder="Store Code"  />
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
                        <Input placeholder="Street Name"  />
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
                        <Input placeholder="City"  />
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
                        name="postalCode"
                        rules={[
                        {
                            required: true,
                            message: "Please input postalCode!",
                            
                        },
                        ]}
                    >
                        <Input placeholder="Postal Code"  />
                    </Form.Item>
                    <Form.Item
                        name="primaryContact"
                        rules={[
                        {
                            required: true,
                            message: "Please input primary contact!",
                            length:10
                        },
                        ]}
                    >
                        <Input type="number" placeholder="Primary Contact"  />
                    </Form.Item>
                        <Form.Item
                        name="secondaryContact"
                        rules={[
                        {
                            required: true,
                            message: "Please input secondary contact!",
                            length:10
                        },
                        ]}
                    >
                        <Input type="number" placeholder="Secondary Contact"  />
                    </Form.Item>
                    
                    <Form.Item>
                        <Button
                       
                        shape="round"
                        type="primary"
                        style={{ width: "100%" }}
                        
                        onClick={submitStoreDetails}
                        >
                        Submit
                        </Button>
                        <br />
                        <br />
                        
                    </Form.Item>
                    </Form>
                   
     );
}
 
export default StoreProfile;