import React, { useState, useEffect } from "react";
import {
    getCategoryByStoreId,
    getProductByStoreId
  } from "./../../services/RequestService";
  import { Layout,  Col, Row,Card,message} from "antd";
  import {  Link } from "react-router-dom";

  import {
    HddOutlined,
    InboxOutlined,
    ShoppingOutlined 
  } from "@ant-design/icons";
  const { Header, Sider, Content } = Layout;
const DashboardContent = () => {
    const [categoryCount, setCategoryCount] = useState(JSON.parse(localStorage.getItem("categoryCount")) || 0);
  const [productCount, setProductCount] = useState(JSON.parse(localStorage.getItem("productCount")) || 0);

  const [orderCount, setOrderCount] = useState(0);
    const getProductFunction = () => {
        getProductByStoreId(JSON.parse(localStorage.getItem("ownerInfo")).store.storeId)
        .then((data) => {
          console.log(data);
          setProductCount(
            data.length
          )
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
          setCategoryCount(
            data.length
          )
          })
        .catch((error) => {
          console.log(error.response)
          if (error) {
            // message.error(error.response.data.detail);
          }
        });
      }
      useEffect(() => {
       if(JSON.parse(localStorage.getItem("ownerInfo")))
       {
        getProductFunction()
        getCategoryFunction() 
       }
       
        
        
    }, []); 
    return ( 
       

        <Row gutter={[16,16]}>
        <Col xs={8} sm={8} md={8} lg={6} xl={6}>
          <Card hoverable >
            <Row>
              <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                <InboxOutlined
                  style={{ fontSize: "30px", color: "#1890ff" }}
                />
             <h5 style={{ color: "#a1a8af" }}><Link to="/categories">Categories</Link></h5>
              </Col>
             
             
             
              <Col xs={8} sm={8} md={8} lg={8} xl={8}>
              <h3>{categoryCount}</h3>
              </Col>

            </Row>
            
            
            
          </Card>
        </Col>
        <Col xs={8} sm={8} md={8} lg={6} xl={6}>
          <Card hoverable >
          <Row>
              <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                <HddOutlined
                  style={{ fontSize: "30px", color: "#1890ff" }}
                />
             <h5 style={{ color: "#a1a8af" }}><Link to="/product">Products</Link></h5>
              </Col>
             
             
             
              <Col xs={8} sm={8} md={8} lg={8} xl={8}>
              <h3>{productCount}</h3>
              </Col>

            </Row>
          </Card>
        </Col>
        <Col xs={8} sm={8} md={8} lg={6} xl={6}>
          <Card hoverable >
          <Row>
              <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                <ShoppingOutlined 
                  style={{ fontSize: "30px", color: "#1890ff" }}
                />
             <h5 style={{ color: "#a1a8af" }}>Orders</h5>
              </Col>
             
             
             
              <Col xs={8} sm={8} md={8} lg={8} xl={8}>
              <h3>{orderCount}</h3>
              </Col>

            </Row>
          </Card>
        </Col>
        </Row>
     
      
     );
}
 
export default DashboardContent;