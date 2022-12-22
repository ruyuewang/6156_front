import React, {useState} from 'react';
import {Button, Card, Form, Input, Rate} from "antd";
import "../../css/review.css"
import {useDeleteReviewMutation, useGetReviewsByUserQuery} from "../../api";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../store/authSlice";

const {TextArea} = Input;

function Review({rrid, rating, content, uid, rid, name}) {
    const [isEdit, setIsEdit] = useState(false)
    const [form] = Form.useForm()
    // call api
    const [deleteReview] = useDeleteReviewMutation();
    // const handleEdit = () => {
    //     setIsEdit(true)
    //     form.setFieldsValue({
    //         rating, content
    //     })
    // }
    const handleCancel = () => {
        setIsEdit(false)
        form.resetFields()
    }
    // const handleSave = async () => {
    //     setIsEdit(false)
    //     const values = await form.validateFields()
    //     // todo: edit request
    //     console.log(values)
    //     form.resetFields()
    // }
    const handleDelete = () => {
        console.log("rrid", rrid)
        deleteReview({rid: rrid});
    }
    return (
        <Card
            title={name}
            className="review"
            extra={
                <div>
                    {
                        isEdit ? (
                            <>
                                {/*<Button type="primary" onClick={handleSave}>Save</Button>&nbsp;*/}
                                <Button type="primary" danger onClick={handleCancel}>Cancel</Button>
                            </>

                        ) : (
                            <>
                                {/*<Button type="primary" onClick={handleEdit}>Edit</Button>&nbsp;*/}
                                <Button type="primary" danger onClick={handleDelete}>Delete</Button>
                            </>
                        )
                    }

                </div>
            }
            bordered={true}
        >
            {
                isEdit ? (
                    <>
                        <Form form={form}>
                            <Form.Item name="rating">
                                <Rate allowHalf/>
                            </Form.Item>
                            <Form.Item name="content">
                                <TextArea rows={4}/>
                            </Form.Item>
                        </Form>
                    </>
                ) : (
                    <>
                        <Rate disabled allowHalf defaultValue={rating}/>
                        <p className="review-content">{content}</p>
                    </>
                )
            }

        </Card>
    )
}

function Reviews() {
    const user_email = useSelector(selectCurrentUser);
    const {data, isFetching} = useGetReviewsByUserQuery({uid: user_email});
    console.log("review data", data)
    return isFetching?"Loading":(
        <div>
            {
                data.reviews.map((item, index) => {
                    return <Review key={index} {...item}/>
                })
            }
        </div>
    );
}

export default Reviews;