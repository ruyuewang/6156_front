import React, {useState} from 'react';
import {Card, Rate} from "antd";
import "../../css/review.css"
import {useGetReviewsByRestaurantQuery} from "../../api";
import {useParams} from "react-router-dom";


function Review({rrid, rating, content, uid, rid, name}) {
    return (
        <Card
            title={uid}
            className="review"
            bordered={true}
        >
            {
                <>
                    <Rate disabled allowHalf defaultValue={rating}/>
                    <p className="review-content">{content}</p>
                </>
            }

        </Card>
    )
}

function ReviewsForRestaurant() {
    const {rid} = useParams();
    const {data, isFetching} = useGetReviewsByRestaurantQuery({rid: rid});
    return isFetching?"Loading":(
        <div>
            {
                data.count === 0 ? "No review" :
                    data.reviews.map((item, index) => {
                        return <Review key={index} {...item}/>
                    })
            }
        </div>
    );
}

export default ReviewsForRestaurant;