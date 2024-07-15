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
    EditOutlined,
    SyncOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Option } = Select;

const OrderManagement = () => {
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
            const response = await axios.get('http://localhost:9999/order');
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
    const handleEdit = async (user) => {
        setEditingUser(user);
        // Gửi PUT request đến API để cập nhật trạng thái
        try {
            await axios.put(`http://localhost:9999/order/${user.id}`, {
                status: false,
                id: user.id,
                userId: user.userId,
                filmName: user.filmName,
                selectedSeats: user.selectedSeats,
                selectedDate: user.selectedDate,
                items: user.items,
                totalAmount: user.totalAmount
            });
            notification.success({ message: 'Order status updated successfully' });
            fetchUsers(); // Cập nhật lại danh sách đơn hàng
        } catch (error) {
            console.error('Error updating order status:', error);
            notification.error({ message: 'Error updating order status', description: error.message });
        }
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
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 100,
            ellipsis: true,
        },
        {
            title: 'Film Name',
            width: 170,
            dataIndex: 'filmName',
            key: 'filmName',
        },
        {
            title: 'Seats',
            width: 100,
            dataIndex: 'selectedSeats',
            key: 'selectedSeats',
            render: (selectedSeats) => selectedSeats.join(', '),
        },
        {
            title: 'Date',
            dataIndex: 'selectedDate',
            width: 170,
            key: 'dob',
            render: (selectedDate) => (
                <Typography.Text>
                    {dayjs(selectedDate).format("MM/DD/YYYY")}
                </Typography.Text>
            )
        },
        {
            title: 'Items',
            dataIndex: 'items',
            key: 'items',
            width: 200,
            render: (items) => (
                <div>
                    {items.map(item => (
                        <div key={item.name}>
                            {item.name} (x{item.quantity})
                        </div>
                    ))}
                </div>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 120,
            render: (status) => (
                <Tag color={status ? 'green' : 'red'}>
                    {status ? 'Chưa sử dụng' : 'Đã sử dụng'}
                </Tag>
            ),
            filters: [
                { text: 'Đang hoạt động', value: true },
                { text: 'Dừng hoạt động', value: false },
            ],
            onFilter: (value, record) => record.status === value,
        },
        {
            title: 'Active',
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
        user.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ padding: 20 }}>
            <Title title="Quản lý đơn hàng" />
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
            </Row>
            <Table
                columns={columns}
                dataSource={filteredUsers}
                scroll={{ x: 'max-content' }}
                rowKey="_id"
            />
        </div>
    );
};

export default OrderManagement;
