import React, {Component} from 'react'
import { Spin, Alert, Pagination} from 'antd'
import Item from './Item'


export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies:[], //movie list
            currentPage: parseInt(props.match.params.page)|| 1, //current page number
            pageSize: 24,
            total: 0,
            isLoading: true,//true: is loading
            movieType: props.match.params.type
        }
    }

    componentWillMount() {
        this.loadMovieListByType()
    }

    componentWillReceiveProps(nextProps) {
        //reset state when address change, after reset, we can resend request
        //console.log(nextProps.match);
        this.setState({ //异步重置，记得回调
            isLoading: true,
            currentPage: parseInt(nextProps.match.params.page) || 1,
            movieType: nextProps.match.params.type,
            total: 0
        }, function(){
            this.loadMovieListByType();
        })
    }

    render() {
        return(
            <div>
                {this.renderList()}
            </div>
        )
    }

    loadMovieListByType = () => {
        //const start = this.state.pageSize*(this.state.currentPage - 1);
        // const url = `https://douban.uieee.com/v2/movie/${this.state.movieType}?start=${start}&count=${this.state.pageSize}`;
        const url2 = `https://api.themoviedb.org/3/movie/${this.state.movieType}?page=${this.state.currentPage}&language=en-US&api_key=1f563975b39935ae66e9a0df2aa20105`;
        fetch(url2)
            .then(response => response.json())
            .then(data =>{
                this.setState({
                    isLoading: false,
                    movies:data.results,
                    total: data.total_results
                })
            });
        // const data = require('../data/top');
        // setTimeout(()=>{
        //     this.setState({
        //         isLoading: false,
        //         movies:data.results,
        //         total: data.total_results
        //     })
        // }, 1000)
    };

    //when page number changes, load new page
    pageChanged = (page)=>{
        window.location.href='#/overview/'+ this.state.movieType +'/'+page
    };

    renderList = () => {
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
            return(
                <div>
                    <div style={{display: 'flex', flexWrap:'wrap'}}>
                        {this.state.movies.map(item => {
                            return(
                                <Item {...item} key={item.id} history={this.props.history}/>
                            )
                        })}
                    </div>
                    <div>
                        <Pagination defaultCurrent={this.state.currentPage} pageSize={this.state.pageSize} total={this.state.total}
                                    onChange={this.pageChanged}/>
                    </div>
                </div>
            )
        }
    };
}

//use fetch API to get data, fetch API is base on Promise