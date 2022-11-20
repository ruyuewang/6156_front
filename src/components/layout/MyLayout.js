import {Outlet, useLocation} from "react-router-dom";
import React from 'react';
import {Avatar, Layout, List, Menu, Popover} from "antd";
import Search from "antd/es/input/Search";
import {UserOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {search} from "../../store/searchSlice";
import "../../css/layout.css"

const Popup = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        navigate("/login")
    }
    const handleProfile = ()=>{
        navigate("/user")
    }
    const content = (
        <List header={<div>User01</div>}>
            <List.Item onClick={handleProfile}>Profile</List.Item>
            <List.Item onClick={handleLogout}>Logout</List.Item>
        </List>
    );
    return (
        <Popover content={content}>
            <UserOutlined/>
        </Popover>
    )
}
const {Header, Content} = Layout
let items = [
    {
        label: "Home",
        key: "1"
    },
    {
        label: "Details",
        key: "2"
    },
]

function MyLayout() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const handleClick = ({key}) => {
        switch (key) {
            case "1":
                navigate("/")
                break
            default:
                break
        }
    }
    const handleSearch = (value) => {
        dispatch(search(value))
    }
    // nav
    let selectedKeys
    let currentItems
    if (location.pathname.indexOf("/details") !== -1) {
        selectedKeys = ["2"]
        currentItems = items
    } else {
        selectedKeys = ["1"]
        currentItems = items.slice(0, 1)
    }


    return (
        <Layout>
            <Header className="header">
                <div className="left">
                    <div className="logo">Logo</div>
                    <Menu
                        selectedKeys={selectedKeys}
                        theme={"dark"}
                        items={currentItems}
                        mode="horizontal"
                        style={{fontSize: 16, width: 300}}
                        onClick={handleClick}
                    />
                </div>
                <div className="right">
                    <Search placeholder="Search restaurant" enterButton style={{width: 400}} size="large"
                            onSearch={handleSearch}/>
                    <Avatar size="large" icon={<Popup/>} style={{marginLeft: 20, marginRight: 40}}/>
                </div>
            </Header>
            <Content className="content">
                <Outlet/>
            </Content>
        </Layout>

    );
}

export default MyLayout;