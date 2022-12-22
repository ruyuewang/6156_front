import React, {useState} from 'react';
import  {Card, Rate, Pagination} from "antd";
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
    const [current, setCurrent] = useState(1);
    const handlePageChange = (page) => {
        console.log("page: ", page)
        setCurrent(page);
    }

    return isFetching?"Loading":(
        <div>
            {
                data.count === 0 ? "No review" :
                    data.reviews.slice((current-1)*5, current*5).map((item, index) => {
                        return <Review key={index} {...item}/>
                    })
            }
            {
                data.count === 0 ?  "":
                    <Pagination onChange={handlePageChange} current={current} total={data.count} pageSize={5} className="restaurant-pagination"/>
            }

        </div>
    );
}

export default ReviewsForRestaurant;