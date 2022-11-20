import React from 'react';
import {Card, Col, Image, Rate, Row, Tag} from "antd";
import {useNavigate} from "react-router-dom";
import "../../css/list.css"

function List({img_url, name, categories, rating, id}) {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/details/${id}`)
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
                        <img src={img_url} alt="loading failed"/>
                    </div>
                    <div className="text">
                        <div className="title">{name}</div>
                        <div className="description">{categories.map((item, index) => {
                            return <Tag key={index}>{item.title}</Tag>
                        })}
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