import {
    BellOutlined,
    ClockCircleOutlined,
    LogoutOutlined,
    MedicineBoxOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ReconciliationOutlined,
    UserOutlined,
    UsergroupAddOutlined,
} from "@ant-design/icons";
import {
    Avatar,
    Button,
    Card,
    Flex,
    Layout,
    List,
    Menu,
    Popover,
    Space,
    Tag,
    Typography,
    theme,
} from "antd";

import Title from "./Title";
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { Link, Outlet, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const Clock = () => {
    const [time, setTime] = useState(dayjs());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(dayjs());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <Flex align="center" justify="center">
            <Card styles={{ body: { padding: 10 } }}>
                <Title
                    styleContainer={{ margin: 0 }}
                    justify="center"
                    title={
                        <Space>
                            <ClockCircleOutlined />
                            {time.format("HH:mm:ss")}
                        </Space>
                    }
                />
            </Card>
        </Flex>
    );
};

const LayoutPage = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const navigate = useNavigate();
    const menuSidebars = [
        {
            key: "users",
            icon: <UsergroupAddOutlined />,
            label: "Người dùng",
            link: "/admin/user-manage",
        },
        {
            key: "films",
            icon: <svg width="20" height="20" viewBox="0 0 40 40" fill="#1677FF" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.7812 4.04126C17.7094 4.04126 15.2344 6.51626 15.2344 9.58814C15.2344 12.66 17.7094 15.1352 20.7812 15.1352C23.8531 15.1352 26.3281 12.6599 26.3281 9.58814C26.3281 6.51626 23.8531 4.04126 20.7812 4.04126ZM9.53125 6.54126C7.14977 6.54126 5.23438 8.45665 5.23438 10.8381C5.23438 13.2195 7.14977 15.1352 9.53125 15.1352C11.9127 15.1352 13.8281 13.2195 13.8281 10.8381C13.8281 8.45673 11.9127 6.54126 9.53125 6.54126ZM7.73438 16.5413V25.1352H26.3281V16.5413H7.73438ZM35.0781 16.9044L27.7344 20.0517V21.6245L35.0781 24.7718V16.9044ZM4.92188 17.0881V19.5881H6.32812V17.0881H4.92188ZM13.75 26.5414V27.9475H14.7666L10.7726 38.594H12.2743L16.2983 27.9475L16.3281 38.594H17.7344L17.7642 27.9475L21.7882 38.594H23.2899L19.2959 27.9475H20.3125V26.5414C18.1248 26.5412 15.9377 26.5414 13.75 26.5414Z" fill="#1677FF" />
            </svg>,
            label: "Films",
            link: "/admin/film-manage",
        },
        {
            key: "orders",
            icon: <svg width="20" height="20" viewBox="0 0 40 40" fill="#1677FF" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.7812 4.04126C17.7094 4.04126 15.2344 6.51626 15.2344 9.58814C15.2344 12.66 17.7094 15.1352 20.7812 15.1352C23.8531 15.1352 26.3281 12.6599 26.3281 9.58814C26.3281 6.51626 23.8531 4.04126 20.7812 4.04126ZM9.53125 6.54126C7.14977 6.54126 5.23438 8.45665 5.23438 10.8381C5.23438 13.2195 7.14977 15.1352 9.53125 15.1352C11.9127 15.1352 13.8281 13.2195 13.8281 10.8381C13.8281 8.45673 11.9127 6.54126 9.53125 6.54126ZM7.73438 16.5413V25.1352H26.3281V16.5413H7.73438ZM35.0781 16.9044L27.7344 20.0517V21.6245L35.0781 24.7718V16.9044ZM4.92188 17.0881V19.5881H6.32812V17.0881H4.92188ZM13.75 26.5414V27.9475H14.7666L10.7726 38.594H12.2743L16.2983 27.9475L16.3281 38.594H17.7344L17.7642 27.9475L21.7882 38.594H23.2899L19.2959 27.9475H20.3125V26.5414C18.1248 26.5412 15.9377 26.5414 13.75 26.5414Z" fill="#1677FF" />
            </svg>,
            label: "Order",
            link: "/admin/order-manage",
        },
        {
            key: "logout",
            icon: <LogoutOutlined />,
            label: "Đăng xuất",
            link: "/",
        },
    ];

    const selectedMenu = () => {
        const menu = menuSidebars.find((menu) =>
            window.location.pathname.includes(menu.link)
        );

        if (menu) {
            return [menu.key];
        }
        return [];
    };

    const onClickMenu = ({ item }) => {
        const { link } = item.props;

        if (link) {
            navigate(link);
        }
    };

    return (
        <Layout style={{ height: "100vh" }}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                theme="light"
                width={250}
            >
                <div style={{
                    height: 64,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                }}>
                    <Typography.Title level={5} style={{ fontWeight: "bold", textAlign: "center" }}>
                        Trooc Booking
                    </Typography.Title>
                    {!collapsed && <Tag color="red">ADMIN</Tag>}
                </div>
                <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={selectedMenu()}
                    items={menuSidebars}
                    onClick={onClickMenu}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Flex justify="space-between" align="center">
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{ fontSize: "16px", width: 64, height: 64 }}
                        />
                        <Clock />
                        <Flex style={{ marginRight: 20 }} align="center" gap={20}>
                            <Button type="text" icon={<BellOutlined />} />
                            <Button type="text" icon={<UserOutlined />}>
                                Admin
                            </Button>
                        </Flex>
                    </Flex>
                </Header>
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        overflow: "auto",
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default LayoutPage;