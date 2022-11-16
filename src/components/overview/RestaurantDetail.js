import React, {Component} from 'react'
import {Alert, Button, Spin} from 'antd'
import { LeftOutlined } from '@ant-design/icons';

export default class MovieDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {},
            isLoading: true
        }
    }

    componentWillMount() {
        console.log(this.props.match.params.id);
        const url = `https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=1f563975b39935ae66e9a0df2aa20105`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    info: data,
                    isLoading: false
                })
            })
    }

    render() {
        return(
            <div>
                <Button type="primary" onClick={this.goBack}>
                    <LeftOutlined />
                    Backward
                </Button>
                {this.renderInfo()}
            </div>
        )
    }

    renderInfo = () => {
        if(this.state.isLoading) {
            return(
                <Spin tip="Loading...">
                    <Alert
                        message="Requesting Movie Data"
                        description="Further details about the context of this alert."
                        type="info"
                    />
                </Spin>)
        }else {
            const img_url = `https://image.tmdb.org/t/p/w500/${this.state.info.poster_path}`;
            return (
                <div style={{textAlign: 'center'}}>
                    <h1>{this.state.info.title}</h1>
                    <img src={img_url} alt=""/>
                    <h2>Release Date: {this.state.info.release_date}</h2>
                    <p>Overview: {this.state.info.overview}</p>
                </div>

            )


        }
    };


    //go backward function
    goBack = ()=> {
        this.props.history.go(-1);
    }
}