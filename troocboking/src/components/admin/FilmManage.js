import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Title from "./Title";
import {
    Table,
    Button,
    Modal,
    Form,
    Input,
    notification,
    Space,
    Row,
    Col
} from 'antd';
import { PlusOutlined, SyncOutlined, SearchOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const FilmManage = () => {
    const [film, setFilm] = useState([]);
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchFilm();
    }, []);

    const fetchFilm = async () => {
        try {
            const response = await axios.get('http://localhost:9999/film');
            setFilm(response.data);
        } catch (error) {
            console.error('Error fetching film:', error);
        }
    };

    const handleFormSubmit = async (values) => {
        try {
            // Chuyển đổi giá trị slot từ JSON string thành object
            values.slot = JSON.parse(values.slot);
            await axios.post('http://localhost:9999/film', values);
            notification.success({ message: 'Film created successfully' });
            fetchFilm();
            setIsModalVisible(false);
            form.resetFields();
        } catch (error) {
            console.error('Error saving film:', error);
            notification.error({ message: 'Error saving film' });
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
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: 200,
            ellipsis: true,
        },
        {
            title: 'Subtitle',
            width: 200,
            dataIndex: 'subtitle',
            key: 'subtitle',
        },
        {
            title: 'Duration',
            width: 120,
            dataIndex: 'duration',
            key: 'duration',
        },
        {
            title: 'Director',
            width: 120,
            dataIndex: 'director',
            key: 'director',
        },
        {
            title: 'Distributer',
            width: 120,
            dataIndex: 'distributer',
            key: 'distributer',
        },

    ];

    return (
        <div style={{ padding: 20 }}>
            <Title title="Film Management" />
            <Row justify="space-between" align="middle" style={{ marginBottom: 10 }}>
                <Col>
                    <Space>
                        <Button icon={<SyncOutlined />} onClick={fetchFilm} />
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
                        Add film
                    </Button>
                </Col>
            </Row>
            <Table columns={columns} dataSource={film} scroll={{ x: 'max-content' }} rowKey="id" />
            <Modal
                title={'Add Film'}
                visible={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false);
                    form.resetFields();

                }}
                onOk={() => form.submit()}
            >
                <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{ required: true, message: 'Please enter a film title' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="subtitle"
                        label="Subtitle"
                        rules={[{ required: true, message: 'Please enter the subtitle' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="director"
                        label="Director"
                        rules={[{ required: true, message: 'Please enter the director' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="duration"
                        label="Duration"
                        rules={[{ required: true, message: 'Please enter duration' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="overview"
                        label="Overview"
                        rules={[{ required: true, message: 'Please enter the description' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="rate"
                        label="Rate"
                        rules={[{ required: true, message: 'Please enter rate' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="distributer"
                        label="Distributer"
                        rules={[{ required: true, message: 'Please enter distributer' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="image"
                        label="Image"
                        rules={[{ required: true, message: 'Please enter link image' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="slot"
                        label="Slot"
                        rules={[{ required: true, message: 'Please enter slot' }]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default FilmManage;
