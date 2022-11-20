import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Row, Col, Image, Descriptions, Rate, Tag} from "antd";
import "../../css/details.css"
import result from "../data/result.json"

function Details() {
    const {id} = useParams()
    const [data, setData] = useState({})
    useEffect(() => {
        let currentData = null
        result.forEach(item => {
            if (item.id === id) {
                currentData = item
            }
        })
        setData(currentData)
    }, [id])
    return (
        <Row className="detail-row">
            <Col span={9}>
                <div
                    className="img"
                >
                    <img src={data.img_url} alt="detail"/>
                </div>
            </Col>
            <Col span={12} className="detail-description">
                <Descriptions title={data.name} column={1}>
                    <Descriptions.Item>
                        <Rate disabled value={data.rating}/>
                    </Descriptions.Item>
                    <Descriptions.Item>
                        {data.categories ? data.categories.map((item, index) => {
                            return <Tag key={index}>{item.title}</Tag>
                        }) : ""}
                    </Descriptions.Item>
                    <Descriptions.Item label="Abstract">{data.summary}</Descriptions.Item>
                    <Descriptions.Item
                        label="Address">{data.location ? data.location.join(" | ") : ""}</Descriptions.Item>
                    <Descriptions.Item label="Phone number">{data.phone}</Descriptions.Item>
                </Descriptions>
            </Col>
        </Row>
    );


}

export default Details;