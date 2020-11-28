import React, { Component } from 'react';

export default class Filter extends Component {

    render() {
        return (
                <div className="filter"> 
                    <button className="btn btn-success" onClick={this.props.originalPage}>Default</button> {/* button that calls return to default function */}
                <div className="filter-result">{this.props.count} Products</div> {/* render total number of products on the page */}
                <div className="filter-sort"> {/* sort-->calls sortProducts function in Functions */}
                    Order by Price {" "}
                    <select value={this.props.sort} onChange={this.props.sortProducts}>
                        <option>Select</option>
                        <option value="lowest">Lowest</option>
                        <option value="highest">Highest</option>
                    </select>
                </div>
                <div className="filter-size"> {/* filter by size-->calls filterProducts function in Functions */}
                    Sizes {" "}
                    <select value={this.props.size} onChange={this.props.filterProducts}>
                        <option value="">ALL</option>
                        <option value="XXS">XXS</option>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                    </select>
                </div>
                <div className="filter-category"> {/* filter by category-->calls filterCategory function in Functions */}
                    Category {" "}
                    <select value={this.props.category} onChange={this.props.filterCategory}>
                        <option value="">ALL</option>
                        <option value="Socks">Socks</option>
                        <option value="Hats">Hats</option>
                        <option value="Outfit">Outfit</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
            </div>
          
            
        )
    }
}