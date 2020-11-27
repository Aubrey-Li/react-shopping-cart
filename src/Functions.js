import React from 'react';
import Cart from './components/Cart';
import Filter from './components/Filter';
import Products from './components/products';
import library from "./library.json";


class Functions extends React.Component {
  constructor(){
    super();
    this.state = {
      products: library.products,
      size: "",
      sort: "",
      category: "",
      cartItems: [],
      sortedProducts: [],
    };
  }

  sortProducts = (event) => {
    const sort = event.target.value;
    console.log(event.target.value);
    this.setState(state => ({
      sort: sort,
      products: this.state.products.slice()
      .sort((a,b) =>
        sort === "lowest"
          ? a.price > b.price 
            ? 1
            : -1
          : sort === "highest"
          ? a.price < b.price
            ? 1
            : -1
          : a._id > b._id
            ? 1
            : -1
      ),
    }));
  };

  filterProducts = event => {
    console.log(event.target.value);
    if (event.target.value === "") {
      if (this.state.category === "") {
        this.setState({size: event.target.value, 
          products: library.products
          .slice()
          .sort((a,b) =>
            this.state.sort === "lowest"
              ? a.price > b.price 
                ? 1
                : -1
              : this.state.sort === "highest"
              ? a.price < b.price
                ? 1
                : -1
              : a._id > b._id
                ? 1
                : -1
          )
      })}
      else {
        this.setState({size: event.target.value, 
          products: library.products
          .slice()
          .sort((a,b) =>
            this.state.sort === "lowest"
              ? a.price > b.price 
                ? 1
                : -1
              : this.state.sort === "highest"
              ? a.price < b.price
                ? 1
                : -1
              : a._id > b._id
                ? 1
                : -1
          )
          .filter(
            (product) => product.category === this.state.category
          )
        })
      } 
    }
    else {
      if (this.state.category === "") {
        this.setState({size: event.target.value, 
          products: library.products
          .slice()
          .sort((a,b) =>
            this.state.sort === "lowest"
              ? a.price > b.price 
                ? 1
                : -1
              : this.state.sort === "highest"
              ? a.price < b.price
                ? 1
                : -1
              : a._id > b._id
                ? 1
                : -1
          )
          .filter(
            (product) => product.availableSizes.indexOf(event.target.value) >= 0
          )
      })}
      else {
        this.setState({size: event.target.value, 
          products: library.products
          .slice()
          .sort((a,b) =>
            this.state.sort === "lowest"
              ? a.price > b.price 
                ? 1
                : -1
              : this.state.sort === "highest"
              ? a.price < b.price
                ? 1
                : -1
              : a._id > b._id
                ? 1
                : -1
          )
          .filter(
            (product) => product.category === this.state.category
          )
          .filter(
            (product) => product.availableSizes.indexOf(event.target.value) >= 0
          )
        })
      } 
  }}

  filterCategory = event => {
    console.log(event.target.value);
    if (event.target.value === "") {
      if (this.state.size === "") {
        this.setState({category: event.target.value, 
          products: library.products
          .slice()
          .sort((a,b) =>
            this.state.sort === "lowest"
              ? a.price > b.price 
                ? 1
                : -1
              : this.state.sort === "highest"
              ? a.price < b.price
                ? 1
                : -1
              : a._id > b._id
                ? 1
                : -1
          )
      })}
      else {
        this.setState({category: event.target.value, 
          products: library.products
          .slice()
          .sort((a,b) =>
            this.state.sort === "lowest"
              ? a.price > b.price 
                ? 1
                : -1
              : this.state.sort === "highest"
              ? a.price < b.price
                ? 1
                : -1
              : a._id > b._id
                ? 1
                : -1
          )
          .filter(
            (product) => product.availableSizes.indexOf(this.state.size) >= 0
          )
        })
      } 
    }
    else {
      if (this.state.size === "") {
        this.setState({category: event.target.value, 
          products: library.products
          .slice()
          .sort((a,b) =>
            this.state.sort === "lowest"
              ? a.price > b.price 
                ? 1
                : -1
              : this.state.sort === "highest"
              ? a.price < b.price
                ? 1
                : -1
              : a._id > b._id
                ? 1
                : -1
          )
          .filter(
            (product) => product.category === event.target.value
          )
      })}
      else {
        this.setState({category: event.target.value, 
          products: library.products
          .slice()
          .sort((a,b) =>
            this.state.sort === "lowest"
              ? a.price > b.price 
                ? 1
                : -1
              : this.state.sort === "highest"
              ? a.price < b.price
                ? 1
                : -1
              : a._id > b._id
                ? 1
                : -1
          )
          .filter(
            (product) => product.availableSizes.indexOf(this.state.size) >= 0
          )
          .filter(
            (product) => product.category === event.target.value
          )
        })
      } }
  }


  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach(item =>{
      if (item._id === product._id){
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({...product, count: 1});
    }
    this.setState({cartItems})
  };


  decrement =(product) => {
    const cartItems = this.state.cartItems.slice();
      cartItems.forEach(item =>{
        if ((item._id === product._id) && item.count > 1){
          item.count--;
        }
      });
      this.setState({cartItems})
      };

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter((x) => x._id !== product._id),
    });
  };

  originalPage = (e) => {
      this.setState({
          products: library.products,
          sort: "",
          size: "",
          category: "",
      })
  }

  render() {
    return (
      <div className="navbar">
        <header>
          <a href="/">Christmas Shopping cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter count={this.state.products.length}
              size={this.state.size}
              sort={this.state.sort}
              category={this.state.category}
              originalPage={this.originalPage}
              filterProducts={this.filterProducts}
              sortProducts={this.sortProducts}
              filterCategory={this.filterCategory}
              ></Filter>
              <Products products={this.state.products} 
              addToCart={this.addToCart}></Products>
            </div>
            <div className="sidebar">
              <Cart cartItems={this.state.cartItems} 
              removeFromCart={this.removeFromCart}
              decrement={this.decrement}
              addToCart={this.addToCart}/>
            </div>
          </div>
        </main>
        <footer>@2020Xmas</footer>
      </div>
    );
  }
}

export default Functions;
