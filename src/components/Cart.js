import React, { Component } from 'react'
import formatCurrency from '../util';


export default class Cart extends Component {
    render() {
        const{cartItems} = this.props;
        return (
            <div>
                <div>
                {cartItems.length === 0? (
                <div className="cart cart-header">Cart is Empty</div>
                ): (
                <div className="cart cart-header">
                    You have {cartItems.length} item(s) in cart {" "}
                </div>
                )}
                <br />
            </div>
            <div>
                <div className="cart">
                    <ul className="cart-items">
                        {cartItems.map(item => (
                            <li key={item._id}>
                            <div>
                                <img src={item.image} alt={item.title}></img>
                            </div>
                            <div>
                                <div>{item.title}</div>
                                <div className="right">
                                    <div className="incrementor">
                                        <button className="btn btn-outline-success" onClick={()=>this.props.decrement(item)}>-</button>
                                        <h5>{item.count}</h5>
                                        <button className="btn btn-outline-success" onClick={()=>this.props.addToCart(item)}>+</button>
                                    </div>
                                    {formatCurrency(item.price)} x {item.count}{" "}
                                    <button className="btn btn-danger" onClick={()=>this.props.removeFromCart(item)}>
                                        Remove
                                    </button>
                                </div>
                                
                            </div>
                        </li>
                        ))}       
                    </ul>
                </div>
                {cartItems.length !== 0 && (
                    <div className="cart">
                    <div className="total">
                        <div>
                            Total:{" "}
                            {formatCurrency(cartItems.reduce((a, c) => a + (c.price * c.count), 0))}
                        </div>
                        <button className="btn btn-success">Check Out</button>
                    </div>
                </div>
                )}
            </div>
            </div>
            
        ) 
    }
}