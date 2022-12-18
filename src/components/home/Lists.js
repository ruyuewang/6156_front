import React, {useEffect, useState} from 'react';
import {Pagination, Row} from "antd";
import List from "./List";
import {useSelector} from "react-redux";
import "../../css/lists.css"
import {selectCurrentSearch} from "../../store/searchSlice";
import {useGetAllRestaurantsQuery, useGetRestaurantsMutation} from "../../api";

function Lists({limit = 12, offset= 0}) {
    const [current, setCurrent] = useState(1)
    const search = useSelector(selectCurrentSearch)
    const [data, setData] = useState([])
    const [total, setTotal] = useState(0)
    // call api
    const [getRestaurants]  = useGetRestaurantsMutation();
    const {data: allRestaurantsData, isFetching} = useGetAllRestaurantsQuery();

    useEffect(()=> {
        setCurrent(1)
    },[search]);

    useEffect(() => {
        (async ()=> {
            let result = (await getRestaurants({query:"c", offset: 0, limit: 12})).data
            const filterData = result.filter(item => {
                return (new RegExp(search, "i")).test(item.name)
            });
            setTotal(filterData.length);
            setData(filterData);
        })()
    }, [current, limit, search])
    const handleChange = (page) => {
        setCurrent(page)
    }

    return isFetching?"Loading" : (
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
            <Pagination current={current} total={data.length} pageSize={limit} onChange={handleChange}/>
        </div>
    );
}

export default Lists;