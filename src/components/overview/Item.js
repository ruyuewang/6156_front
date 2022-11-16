import React, {Component} from 'react'
import { Rate } from 'antd';


export default class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const img_url = `https://image.tmdb.org/t/p/w500/${this.props.poster_path}`;
        return(
            <div className="box" onClick={()=>{this.goDetail()}}>
                <img src= {img_url} className="img" alt=""/>
                <h4>Name: {this.props.title}</h4>
                <h4>Date: {this.props.release_date}</h4>
                {/*<h4>类型: {this.props.genres.join(',')}</h4>*/}
                <Rate disabled defaultValue={(this.props.vote_average)/2}  />
            </div>
        )
    }

    goDetail = () =>{
        this.props.history.push('/overview/detail/' + this.props.id)
    }
}