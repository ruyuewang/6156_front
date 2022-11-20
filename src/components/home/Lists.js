import React, {useEffect, useState} from 'react';
import {Pagination, Row} from "antd";
import List from "./List";
import {useSelector} from "react-redux";
import "../../css/lists.css"
import result from "../data/result.json"
import {selectCurrentSearch} from "../../store/searchSlice";

function Lists({limit = 12}) {
    const [current, setCurrent] = useState(1)
    const search = useSelector(selectCurrentSearch)
    const [data, setData] = useState([])
    const [total, setTotal] = useState(0)
    useEffect(()=>{
        setCurrent(1)
    },[search])
    useEffect(() => {
        const skip = current - 1
        const filterData = result.filter(item => {
            return (new RegExp(search, "i")).test(item.name)
        })
        setTotal(filterData.length)
        setData(filterData.slice(skip, skip + limit))
    }, [current, limit, search])
    const handleChange = (page) => {
        setCurrent(page)
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
                    data.map(d => (<List key={d.id} {...d}/>))
                }
            </Row>
            <Pagination current={current} total={total} pageSize={limit} onChange={handleChange}/>
        </div>
    );


}

export default Lists;