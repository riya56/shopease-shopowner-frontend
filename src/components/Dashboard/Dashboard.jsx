import React, { useState, useEffect } from "react";
import { Layout, Menu, Badge, Col, Row, Dropdown, Avatar,Card,message} from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  HddOutlined,
  BarChartOutlined,
  InboxOutlined,
  TeamOutlined,
  ShopOutlined,
  ShoppingOutlined 
} from "@ant-design/icons";

import moment from "moment";
import "./Dashboard.scss";
import { Switch, Link, useLocation } from "react-router-dom";


import PrivateRoute from "../../routes/privateRoutes";
import Categories from "../Categories/Categories";
import Products from "../Products/Products";
import StoreProfile from "../StoreProfile/StoreProfile";
import DashboardContent from "./DashboardContent";
import Order from "../Order/Order"




import Profiles from "../Profiles/Profiles";
import { logout } from "../../services/RequestService";


const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  


  const toggle = () => {
    setCollapsed(!collapsed);
  };
  const menuConfig = (
    <Menu>
      <Menu.Item key="0">
        <a
          href="/profile"
          onClick={() => {
            // DataModal("", `My Profile`, true, editProfile);
          }}
        >
          My Profile
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <a
         href="/login"
          onClick={() => {
            console.log(JSON.parse(localStorage.getItem("userInfo")).refreshToken);
           logout({refresh:JSON.parse(localStorage.getItem("userInfo")).refreshToken})
           .then((data)=>{
            console.log(data);
            
           })
           localStorage.removeItem("userInfo");
           localStorage.removeItem("ownerInfo");
           localStorage.removeItem("owner");
          }}
        >
          Logout
        </a>
      </Menu.Item>
      <Menu.Divider />
    </Menu>
  );
 
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          {" "}
          {collapsed ? <h2>SS</h2> : <h2>ShopEASE</h2>}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
        >
            <Menu.Item key="/dashboard" icon={<BarChartOutlined />}>
              <Link to="/dashboard">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="/categories" icon={<InboxOutlined />}>
              <Link to="/categories">Categories</Link>
            </Menu.Item>
            <Menu.Item key="/products" icon={<HddOutlined />}>
              <Link to="/products">Products</Link>
            </Menu.Item>
            <Menu.Item key="/Order" icon={<HddOutlined />}>
            <Link to= "/Order">Orders </Link>         
            </Menu.Item>
          </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>

          <Row>
            <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2}>
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: toggle,
                }
              )}
            </Col>
            <Col xs={11} sm={13} md={13} lg={19} xl={19} xxl={19}></Col>
               
            <Col xs={3} sm={3} md={3} lg={1} xl={1} xxl={1}>
              <Dropdown overlay={menuConfig} trigger={["click"]}>
               
                <Avatar
                  size="medium"
                  icon={<UserOutlined />}
                  onClick={(e) => e.preventDefault()}
                /> 
              </Dropdown> 
            </Col>
            <Col  xs={6} sm={6} md={6} lg={1} xl={1} xxl={1}>
                <span>{JSON.parse(localStorage.getItem("userInfo")).username}</span>
                </Col>
            <Col xs={2} sm={2}></Col>
          </Row>

           
          </Header>
          <Content
        className="site-layout-background"
        style={{
          margin: '24px 16px',
          padding: 24,
          height: "100vh",
        }}
      >
          <Switch>
            <PrivateRoute exact={true} path="/categories" component={Categories} />
             <PrivateRoute exact={true} path="/products" component={Products} /> 
            <PrivateRoute exact={true} path="/profile" component={Profiles} />
            <PrivateRoute exact={true} path="/order" component={Order} />
            <PrivateRoute exact={true} path="/dashboard" component={DashboardContent} />
            
        </Switch>
        </Content>
        </Layout>
      </Layout> );
}
 
export default Dashboard;

