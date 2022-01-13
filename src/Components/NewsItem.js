import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, urlNews, author,publishedAt} = this.props;
        return (
            <>
                <div>   
                    <div className="card my-3">
                        <img src={!imageUrl ? "https://cdn-icons-png.flaticon.com/512/2748/2748558.png": imageUrl} className="card-img-top" alt="Pic Not Found" />
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <a href={urlNews} rel="noreferrer" target="_blank" className="btn btn-primary">Read More</a>
                            <br />
                            <p className="card-text my-2"><small className="text-muted">By : {author}</small></p>
                            <p className="card-text my-2"><small className="text-muted">Published At  : {new Date(publishedAt).toGMTString()}</small></p>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default NewsItem
