import React, { Component } from 'react';
import formatCurrency from "../util";

export default class Products extends Component {
    render() {
        return (
            <div className="card-container">
                <div className="container">
                    {this.props.products.map(product => (
                    <div className=" card card border-danger mb-3" key={product._id}>
                        <img className="card-img-top" src={product.image} alt={product.title}></img>
                        <div className="card-body">
                            <h2 className="card-header">{product.title}</h2>
                            <br />
                            <h4 className="card-title">
                                {formatCurrency(product.price)}
                            </h4>
                        
                            <p className="card-text">Sizes: {product.availableSizes}</p>
                            <p className="card-text">Category: {product.category}</p>
                            <div>
                                <button onClick={()=> this.props.addToCart(product)} type="button" className="btn btn-success">Add to Cart</button>
                            </div>
                        </div>
                    </div> 
                    ))}
                </div>
            </div>
        )
    }
}
