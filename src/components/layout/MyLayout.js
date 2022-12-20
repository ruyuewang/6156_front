import {Outlet, useLocation} from "react-router-dom";
import React from 'react';
import {Avatar, Layout, List, Menu, Popover} from "antd";
import Search from "antd/es/input/Search";
import {UserOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {search} from "../../store/searchSlice";
import "../../css/layout.css"
import {logOut, selectCurrentUser} from "../../store/authSlice";

const Popup = () => {
    // get the current user email
    const user_email = useSelector(selectCurrentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logOut());
        navigate("/login");
    }
    const handleProfile = ()=>{
        navigate("/user")
    }
    const content = (
        <List header={<div>{user_email}</div>}>
            <List.Item onClick={handleProfile}>User Page</List.Item>
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
        /**
         * {
         *     type:"search",
         *     action:{
         *         payload:value
         *     }
         * }
         */
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
        <Layout style={{minHeight: "100%"}}>
            <Header className="header">
                <div className="left">
                    <div className="logo">Deadline Fighter</div>
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
                    <Search placeholder="Search restaurant" enterButton style={{width: 300}} size="large"
                            onSearch={handleSearch}/>
                    <Avatar size="large" icon={<Popup/>} style={{marginLeft: 15}}/>
                </div>
            </Header>
            <Content className="content" style={{minHeight: "100%"}}>
                <Outlet/>
            </Content>
        </Layout>

    );
}

export default MyLayout;