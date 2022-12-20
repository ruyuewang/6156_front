import React, {useEffect, useState} from 'react';
import {Pagination, Row} from "antd";
import List from "./List";
import {useSelector} from "react-redux";
import "../../css/lists.css"
import {selectCurrentSearch} from "../../store/searchSlice";
import {useGetAllRestaurantsMutation, useGetAllRestaurantsQuery, useGetRestaurantsMutation} from "../../api";

function Lists({limit = 12, offset= 0}) {
    const [current, setCurrent] = useState(1)
    const search = useSelector(selectCurrentSearch)
    const [data, setData] = useState([])
    const [total, setTotal] = useState(0)
    // call api
    const [getRestaurants] = useGetRestaurantsMutation();
    const [getAllRestaurants] = useGetAllRestaurantsMutation();

    useEffect(()=> {
        setCurrent(1)
    },[search]);

    useEffect(() => {
        (async ()=> {
            let result = (await getRestaurants({query:search?search:"",offset: 0, limit: 12})).data;
            setTotal(result.count);
            setData(result.restaurants);
        })()
    }, [limit, search])
    const handleChange = async (page) => {
        let result = (await getRestaurants({query:search?search:"",offset: page-1, limit: 12})).data;
        // @TODO
        setTotal(result.count);
        setData(result.restaurants);
        setCurrent(page);
    }

    return (
        <div style={{
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center"
        }}>
            <Row className="row">
                {
                    data.map(d => (<List key={d.rid} {...d}/>))
                }
            </Row>
            <Pagination current={current} total={total} onChange={handleChange} showSizeChanger={false}/>
        </div>
    );
}

export default Lists;