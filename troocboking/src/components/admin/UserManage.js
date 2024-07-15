import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Title from "./Title";
import {
    Tag,
    Table,
    Button,
    Typography,
    Modal,
    Form,
    Input,
    Select,
    DatePicker,
    notification,
    Space,
    Row,
    Col
} from 'antd';

import {
    PlusOutlined,
    EyeOutlined,
    EditOutlined,
    SyncOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Option } = Select;

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');;

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:9999/user');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            notification.error({ message: 'Error fetching users', description: error.message });
        }
    };


    const handleFormSubmit = async (values) => {
        try {
            if (editingUser) {
                await axios.put(`http://localhost:9999/user/${editingUser.id}`, values);
                notification.success({ message: 'User updated successfully' });
            } else {
                await axios.post('http://localhost:9999/user', values);
                notification.success({ message: 'User created successfully' });
            }
            fetchUsers();
            setIsModalVisible(false);
            form.resetFields();
            setEditingUser(null);
        } catch (error) {
            console.error('Error saving user:', error);
            notification.error({ message: 'Error saving user', description: error.message });
        }
    };
    const handleEdit = (user) => {
        setEditingUser(user);
        setIsModalVisible(true);
        form.setFieldsValue({
            ...user,
            dob: dayjs(user.dob),
        });
    };



    const columns = [
        {
            title: 'STT',
            dataIndex: "index",
            key: "index",
            width: 70,
            align: "center",
            render: (_, __, index) => index + 1,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 200,
            ellipsis: true,
        },
        {
            title: 'Họ Tên',
            width: 170,
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'dob',
            width: 170,
            key: 'dob',
            render: (dob) => (
                <Typography.Text>
                    {dayjs(dob).format("DD/MM/YYYY")} - {" "}
                    {dayjs().diff(dob, "year")} tuổi
                </Typography.Text>
            )
        },
        {
            title: 'Chức vụ',
            dataIndex: 'role',
            key: 'role',
            width: 120,
            filters: [
                { text: 'ADMIN', value: 'ADMIN' },
                { text: 'MANAGER', value: 'MANAGER' },
                { text: 'DOCTOR', value: 'DOCTOR' },
                { text: 'PAITENT', value: 'PAITENT' },
            ],
            onFilter: (value, record) => record.role === value,
            render: (role) => {
                let color = 'default';
                switch (role) {
                    case 'admin':
                        color = 'red';
                        break;
                    case 'user':
                        color = 'green';
                        break;
                }
                return <Tag color={color}>{role}</Tag>;
            },
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: 120,
            render: (status) => (
                <Tag color={status ? 'green' : 'red'}>
                    {status ? 'Đang hoạt động' : 'Dừng hoạt động'}
                </Tag>
            ),
            filters: [
                { text: 'Đang hoạt động', value: true },
                { text: 'Dừng hoạt động', value: false },
            ],
            onFilter: (value, record) => record.status === value,
        },
        {
            title: 'Hành động',
            fixed: "right",
            align: "center",
            width: 200,
            ellipsis: true,
            render: (text, record) => (
                <Space size="middle">
                    <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(record)}></Button>
                </Space>
            ),
        },
    ];

    const filteredUsers = users.filter(user =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ padding: 20 }}>
            <Title title="Quản lý người dùng" />
            <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
                <Col>
                    <Space>
                        <Button icon={<SyncOutlined />} onClick={fetchUsers}>Làm mới</Button>
                        <Input
                            placeholder="Tìm kiếm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ width: 200 }}
                            prefix={<SearchOutlined />}
                        />
                    </Space>
                </Col>
                <Col>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setIsModalVisible(true)}
                    >
                        Thêm người dùng
                    </Button>
                </Col>
            </Row>
            <Table
                columns={columns}
                dataSource={filteredUsers}
                scroll={{ x: 'max-content' }}
                rowKey="_id"
            />
            <Modal
                title={editingUser ? 'Cập nhật người dùng' : 'Thêm người dùng'}
                visible={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false);
                    form.resetFields();
                    setEditingUser(null);
                }}
                onOk={() => form.submit()}
            >
                <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, type: 'email', message: 'Vui lòng điền đúng format email' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="fullName"
                        label="Họ tên"
                        rules={[{ required: true, message: 'Vui lòng điền họ tên' }]}
                    >
                        <Input />
                    </Form.Item>
                    {!editingUser && (
                        <Form.Item
                            name="password"
                            label="Mật khẩu"
                            rules={[{ required: true, message: 'Vui lòng điền mật khẩu' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                    )}
                    {editingUser && (
                        <>
                            <Form.Item name="dob" label="Ngày sinh">
                                <DatePicker format="DD/MM/YYYY" />
                            </Form.Item>
                        </>
                    )}
                    <Form.Item
                        name="role"
                        label="Role"
                        rules={[{ required: true, message: 'Vui lòng chọn role' }]}
                    >
                        <Select disabled={editingUser}>
                            <Option value="admin">Admin</Option>
                            <Option value="user">User</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default UserManagement;
