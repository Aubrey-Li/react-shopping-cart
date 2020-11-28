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
/* Above: constructor & state;
below: sortProducts function would could be triggered by onChange in Filter */
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

  /* filterProducts function would could be triggered by onChange in Filter when selecting sizes*/
  filterProducts = event => {
    console.log(event.target.value);
    if (event.target.value === "") { 
      if (this.state.category === "") { /* when user select "ALL" for both size and category*/
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
      else { /* when user select "ALL" for size, but category has exiting selection*/
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
      if (this.state.category === "") { /* when user select a size, category set to "All"*/
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
      else { /* when user select a size, and category has exiting selection*/
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
      if (this.state.size === "") { /* when size and category both "ALL" */
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
      else { /* when category is "ALL", size has preexisting selection */
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
      if (this.state.size === "") { /* when size is "All", user selects a category */
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
      else { /* when size has pre-existing value, user selects a category */
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


  addToCart = (product) => { /* add to cart when called in products and Cart */
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach(item =>{
      if (item._id === product._id){ /* increases number if already in cartItems*/
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) { /* push item into the list if not in cartItems*/
      cartItems.push({...product, count: 1});
    }
    this.setState({cartItems})
  };


  decrement =(product) => {
    const cartItems = this.state.cartItems.slice();
      cartItems.forEach(item =>{ /* decreases number if already in cartItems*/
        if ((item._id === product._id) && item.count > 1){
          item.count--;
        }
      });
      this.setState({cartItems})
      };

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({ /* remove from cartItems if called in Cart*/
      cartItems: cartItems.filter((x) => x._id !== product._id),
    });
  };

  originalPage = (e) => { /* return to default setting for items displayed*/
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
          <div className="content"> {/* main for the display items, sidebar for Cart*/}
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
