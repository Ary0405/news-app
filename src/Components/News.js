import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {
    static defaultProps = {
        country: 'in',
        pagesize: 6,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pagesize: PropTypes.number,
        category: PropTypes.string,
    }
    constructor() {
        super();
        this.state = {
            articles: [],
            page: 1,
            totalRes: 0,
            loading: false
        }
    }
    async componentDidMount() {
        this.props.setProgress(0);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e43506e75853446b850a8ee1b08db0d1&page=1&pageSize=${this.props.pagesize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            totalRes: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100);
    }
    handleNxtClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e43506e75853446b850a8ee1b08db0d1&page=${this.state.page + 1}&pageSize=${this.props.pagesize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles,
            loading: false
        })

    }
    handlePrevClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e43506e75853446b850a8ee1b08db0d1&page=${this.state.page - 1}&pageSize=${this.props.pagesize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })
    }
    fetchMoreData = async ()=>{
        this.setState({page : this.state.page + 1})
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e43506e75853446b850a8ee1b08db0d1&page=${this.state.page}&pageSize=${this.props.pagesize}`;
        // this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalRes: parsedData.totalResults,
            loading: false
        })
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    render() {
        return (
            <div className="container my-3">
                <h2>NewsRoom - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalRes}
                    loader={<h4>Loading...</h4>}
                    scrollableTarget="scrollableDiv">
                    <div className="row my-3">
                        {this.state.articles.map((element) => {
                            return <div key={element.url} className="col-md-4">
                                <NewsItem key={element.url} title={element.title} description={element.description} imageUrl={element.urlToImage} urlNews={element.url} author={element.author} publishedAt={element.publishedAt} />
                            </div>
                        })}
                    </div>
                </InfiniteScroll>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} onClick={this.handlePrevClick} className="btn btn-primary">Previous</button>
                    <button disabled={this.state.page >= Math.ceil(this.state.totalRes / this.props.pagesize)} onClick={this.handleNxtClick} className="btn btn-primary">Next</button>
                </div>
            </div>
        )
    }
}

export default News
