import React, { Component } from 'react'
import formatCurrency from '../util';
import Fade from "react-reveal/Fade";

export default class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            address: "",
            email: "",
            showCheckOut: false
        };
    }

handleInput =(event) =>{
    this.setState({[event.target.name]: event.target.value})
}

createOrder = (event) => {
    event.preventDefault();
    const order = {
        name: this.state.name,
        email: this.state.email,
        address: this.state.address,
        cartItems: this.props.cartItems,
    };
    this.props.createOrder(order);
}

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
                    <Fade left cascade>
                        <ul className="cart-items"> {/* render of each item in the cart */}
                            {cartItems.map(item => (
                                <li key={item._id}>
                                <div>
                                    <img src={item.image} alt={item.title}></img>
                                </div>
                                <div>
                                    <div>{item.title}</div>
                                    <div className="right">
                                        <div className="incrementor"> {/* incrementor, decrementor, and remove on the item card in the aggregator section */}
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
                    </Fade>
                </div> {/* below: the aggregator total price function */}
                {cartItems.length !== 0 && (
                    <div>
                    <div className="cart">
                    <div className="total">
                        <div>
                            Total:{" "}
                            {formatCurrency(cartItems.reduce((a, c) => a + (c.price * c.count), 0))}
                        </div>
                        <button onClick={()=>this.setState({ showCheckOut: true })} className="btn btn-success">Proceed</button>
                    </div>
                </div>
                {this.state.showCheckOut && (
                    <Fade right cascade>
                    <div className="cart">
                    <form onSubmit={this.createOrder}>
                        <ul className="form-container">
                            <li>
                                <label>Email:</label>
                                <input 
                                name="email"
                                type="email"
                                required
                                onChange={this.handleInput}
                                ></input>
                            </li>
                            <li>
                                <label>Name:</label>
                                <input 
                                name="name"
                                type="text"
                                required
                                onChange={this.handleInput}
                                ></input>
                            </li>
                            <li>
                                <label>Address:</label>
                                <input 
                                name="address"
                                type="text"
                                required
                                onChange={this.handleInput}
                                ></input>
                            </li>
                            <li>
                                <button className="btn btn-success" type="submit">Confirm Checkout</button>
                            </li>
                        </ul>
                    </form>
                    </div>
                    </Fade>
                )}
                </div>
                )}
            </div>
            </div>
        ) 
    }
}