import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Row, Col, Descriptions, Rate, Tag, Button, Form, Input, Modal, Select} from "antd";
import "../../css/details.css";
import result from "../data/result.json";
import TextArea from "antd/lib/input/TextArea";
import {
    useCreateReviewMutation,
    useDeleteRestaurantMutation,
    useGetRestaurantByIDQuery,
    useUpdateRestaurantMutation
} from "../../api";
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../store/authSlice";
import ReviewForRestaurant from "../review/ReviewForRestaurant";

function Details() {
    const user_email = useSelector(selectCurrentUser);
    const {rid} = useParams();
    const navigate = useNavigate();
    // call api
    const {data, isFetching: isFetchingRestaurant} = useGetRestaurantByIDQuery({rid});
    const [deleteRestaurant] = useDeleteRestaurantMutation();
    const [createReview] = useCreateReviewMutation();

    // form control
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm()
    const handleWriteReview = () => {
        // form.setFieldsValue({
        //     name: data.name,
        //     rating: data.rating,
        //     cuisine: data.cuisine,
        //     address: data.address,
        //     phone: data.phone
        // })
        setIsModalOpen(true);
    };
    const handleDelete = () => {
        setIsConfirmModalOpen(true);
    };
    const handleReviewFormSubmit = () => {
        setIsModalOpen(false);
        form.validateFields()
            .then((values) => {
                form.resetFields();
                createReview({...values, rid:rid, uid:user_email});
            })
    };
    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
    };

    // confirm delete modal
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const handleDeleteRes = () => {
        setIsConfirmModalOpen(true)
    };
    const handleConfirmCancel = () => {
        setIsConfirmModalOpen(false);
    };
    const handleConfirmOk = () => {
        setIsConfirmModalOpen(false);
        let res = deleteRestaurant({rid});
        navigate("/");
    };

    return isFetchingRestaurant?"Loading" :(
        <Row className="detail-row">
            <Col span={10} xs={24} sm={24} md={10} xl={10}>
                <div
                    className="img"
                >
                    <img src={data.url} alt="detail"/>
                </div>
            </Col>
            <Col span={14} xs={24} sm={24} md={14} xl={14} className="detail-description">
                <Descriptions title={data.name} column={1} extra={<div>
                    <Button type="primary" onClick={handleWriteReview}>Write Review</Button>
                    <Button type="primary" danger style={{marginLeft: 5}} onClick={handleDelete}>Delete</Button>
                </div>}>
                    <Descriptions.Item>
                        <Rate disabled allowHalf value={data.rating}/>
                    </Descriptions.Item>
                    <Descriptions.Item>
                        <Tag>{data.cuisine}</Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Address">
                        {data.address}
                    </Descriptions.Item>
                    <Descriptions.Item label="Phone number">
                        {data.phone}
                    </Descriptions.Item>
                </Descriptions>
                <ReviewForRestaurant/>
            </Col>

            <Modal title="Write Review" open={isModalOpen} onOk={handleReviewFormSubmit} onCancel={handleCancel} centered>
                <Form labelCol={{span: 5}} form={form}>
                    <Form.Item
                        label="Rating"
                        name="rating"
                    >
                        <Rate/>
                    </Form.Item>
                    <Form.Item
                        label="Content"
                        name="content"
                    >
                        <TextArea rows={3}/>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Delete confirmation modal */}
            <Modal title="Confirmation" open={isConfirmModalOpen} onOk={handleConfirmOk} onCancel={handleConfirmCancel}>
                <p>Are you sure you want to delete the restaurant {data.name}?</p>
            </Modal>

        </Row>
    );
}

export default Details;