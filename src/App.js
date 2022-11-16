import './App.css';
import React, {Component} from 'react'
//import router component
import {HashRouter, Route, Routes, Link} from 'react-router-dom'
//import route components
import HomeContainer from './components/home/HomeContainer'
import OverviewContainer from './components/overview/OverviewContainer'
//import UI from antd
import 'antd/dist/antd.css';
import {Avatar, Layout, Menu } from 'antd';
import Search from "antd/es/input/Search";
import {UserOutlined} from "@ant-design/icons";
import { Col, Divider, Row } from 'antd';
const {Header, Content, Footer} = Layout;
const items = [
  {
    label: "Home",

    key: "1"
  },
  {
    label: "About",
    key: "2"
  },
]


class App extends Component{
  constructor(props){
    super(props)
  }


  render(){
    return (
        <HashRouter>
          <Layout className="layout" style={{height:'100%'}}>

            {/*Header*/}
            <Header>
              <div class="menu-left">
                <div className="logo">Logo</div>
                <Menu theme={"dark"}
                      items={items}
                      mode="horizontal"
                      style={{fontSize: 16, width: 300}}
                />
              </div>
              <div class="menu-right">
                <Search placeholder="Search restaurant" enterButton style={{width: 300}} size="large" />
                <Avatar size="large" icon={<UserOutlined/>} style={{marginLeft: 20}}/>
              </div>
            </Header>

            {/*Content*/}
            <Content style={{ padding: '0px', background: '#fff', flex: 1}}>

              <Routes>
                <Route path="/home" element={<HomeContainer/>}/>
                <Route path="/overview" element={<OverviewContainer/>}/>
              </Routes>
            </Content>

            {/*Footer*/}
            <Footer style={{ textAlign: 'center' }}>6156 Project ©2022 Created by Deadline Fighter</Footer>
          </Layout>
        </HashRouter>
    );
  }
}


export default App;
