import React, { Component } from 'react';
import formatCurrency from "../util";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";

export default class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,
        };
    }

    openModal = (product) => {
        this.setState({ product });
    }

    closeModal = () => {
        this.setState({ product: null });
    }

    render() {
        const { product } = this.state;
        return (
            <div className="card-container">
                <div className="container"> {/* renders products as cards in the main page */}
                    {this.props.products.map(product => (
                    <div className=" card card border-danger mb-3" key={product._id}>
                        <img className="card-img-top" src={product.image} alt={product.title}></img>
                        <div className="card-body">
                            <a href={"#" + product._id} onClick={()=> this.openModal(product)}>
                                <h2 className="card-header">{product.title}</h2>
                            </a>
                            <br />
                            <h4 className="card-title">
                                {formatCurrency(product.price)}
                            </h4>
                        
                            <p className="card-text">Sizes: {product.availableSizes}</p>
                            <p className="card-text">Category: {product.category}</p>
                            <div> {/* add to cart-->calls addToCart function in Functions when onClick */}
                                <button onClick={()=> this.props.addToCart(product)} type="button" className="btn btn-success">Add to Cart</button>
                            </div>
                        </div>
                    </div> 
                    ))}
                </div>
                {
                    product && 
                        <Modal isOpen={true} onRequestClose={this.closeModal}>
                            <Zoom>
                                <button className="close-modal" onClick={this.closeModal}>x</button>
                                <div className="product-details">
                                    <img src={product.image} alt={product.title}></img>
                                    <div className="product-details-description">
                                        <p>
                                            {<strong>{product.title}</strong>}
                                        </p>
                                        <p>
                                            {product.description}
                                        </p>
                                        <p>
                                            Available Sizes: {" "}
                                            {product.availableSizes.map(x=>(
                                                <span>{" "} <button className="btn btn-success">{x}</button></span>
                                            ))}
                                        </p>
                                        <div className="product-price">
                                            <div>{formatCurrency(product.price)}</div>   
                                            <button className="btn btn-success" onClick={(event)=> {
                                                this.props.addToCart(product);
                                                this.closeModal();
                                            }}>
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Zoom>
                        </Modal>
                    
                }
            </div>
        )
    }
}
