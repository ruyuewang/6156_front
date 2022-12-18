import React from 'react';
import {Card, Col, Image, Rate, Row, Tag} from "antd";
import {useNavigate} from "react-router-dom";
import "../../css/list.css"

function List({url, name, cuisine, rating, rid}) {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/details/${rid}`)
    }
    return (
        <Col className="col" sm={12} md={8} xl={5}>
            <Card
                hoverable={true}
                // loading={true}
                // cover={
                //
                // }
                // style={{height: 300}}
                onClick={handleClick}
            >
                <div className="part">
                    <div className="cover">
                        <img src={url} alt="loading failed"/>
                    </div>
                    <div className="text">
                        <div className="title">{name}</div>
                        <div className="description">
                           <Tag>{cuisine}</Tag>
                        </div>
                        <div className="info">
                            <Row>
                                <Col span={24}>
                                    <Rate disabled
                                          allowHalf
                                          defaultValue={rating}/>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </Card>
        </Col>
    );
}

export default List;