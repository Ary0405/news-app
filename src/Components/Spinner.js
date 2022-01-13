import React, { Component } from 'react'
import loading from './Spin-1s-200px.gif'
export default class Spinner extends Component {
    render() {
        return (
            <div>
                <img src={loading} alt="loading" style={{width : "20px"}} className='text-center' />
            </div>
        )
    }
}
