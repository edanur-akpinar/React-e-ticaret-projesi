import { Component } from "react";
import Navi from "./Navi.js";
import { Container, Row, Col } from "reactstrap";
import Category from "./Category.js";
import Product from "./Product.js";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Checkout from './Checkout'; // Checkout bileşenini import edin
import Slide from "./Slide.js";

export default class App extends Component {
  state = {
    category: [],
    products: [],
    filteredProducts: [], // Arama işlemi için filtrelenmiş ürünler
    currentCategory: "",
    cart: [],
  }

  getCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    this.componentDidMount(category.id);
  }

  componentDidMount(categoryId) {
    fetch("http://localhost:3000/categories")
      .then(response => response.json())
      .then(data => this.setState({ category: data }));

    let url = "http://localhost:3000/products";

    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ products: data, filteredProducts: data }));
  }

  getClickButton = (product) => {
    let sepet = [...this.state.cart];
    let addItem = sepet.find(c => c.product.id === product.id);

    if (addItem) {
      addItem.quantity += 1;
    } else {
      sepet.push({ product: product, quantity: 1 });
    }
    this.setState({ cart: sepet });
  }

  getOnRemoveButton = (product) => {
    let removeItem = this.state.cart.filter(c => c.product.id !== product.id);
    this.setState({ cart: removeItem });
  }

  handleSearch = (searchTerm) => {  //arama işlemi
    const filteredProducts = this.state.products.filter(product =>
      product.productName.toLowerCase().includes(searchTerm)
    );
    this.setState({ filteredProducts });
  }

  handleSort = (sortOrder) => {  //fitreleme işlemi
    let sortedProducts = [...this.state.filteredProducts];
    if (sortOrder === 'asc') {
      sortedProducts.sort((a, b) => a.unitPrice - b.unitPrice);
    } else {
      sortedProducts.sort((a, b) => b.unitPrice - a.unitPrice);
    }
    this.setState({ filteredProducts: sortedProducts });
  }
  increaseQuantity = (productId) => {  //sepette ürün artırma
    let updatedCart = this.state.cart.map(item => {
        if (item.product.id === productId) {
            return { ...item, quantity: item.quantity + 1 };
        }
        return item;
    });
    this.setState({ cart: updatedCart });
}

decreaseQuantity = (productId) => {  //sepette ürün azaltma
    let updatedCart = this.state.cart.map(item => {
        if (item.product.id === productId && item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
        }
        return item;
    });
    this.setState({ cart: updatedCart });
}



  // Sepeti temizlemek için bir fonksiyon ekleyin
  clearCart = () => {
    this.setState({ cart: [] });
  }

  // Toplam tutarı hesaplamak için bir fonksiyon ekleyin
  getTotal = () => {
    return this.state.cart.reduce((acc, crt) => {
      return acc + crt.quantity * crt.product.unitPrice;
    }, 0);
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Container>
            <Row>
              <Col>
                <Navi
                  currentCategory={this.state.currentCategory}
                  getOnRemoveButton={this.getOnRemoveButton}
                  cart={this.state.cart}
                  onSearch={this.handleSearch}  // Arama işlemini handle edecek fonksiyonu ekliyoruz
                  onSort={this.handleSort}  // Fiyat sıralama işlemini handle edecek fonksiyonu ekliyoruz
                  increaseQuantity={this.increaseQuantity}  // Yeni eklenen prop
                  decreaseQuantity={this.decreaseQuantity}  // Yeni eklenen prop
              />
              </Col>
            </Row>
            <Row>
              <Col style={{ display: "flex", justifyContent: "center" }}>
                <Slide style={{ marginBottom: "30px" }} />
              </Col>
            </Row>


            <Routes>
              <Route
                path="/"
                element={
                  <div>
                    <Row className="d-flex justify-content-center">
                      <Col><Category getCategory={this.getCategory} category={this.state.category} /></Col>
                      <Col style={{ display: "flex", justifyContent: "center" }}>
                        <Product
                          getClickButton={this.getClickButton}
                          products={this.state.filteredProducts}  // Filtrelenmiş ürünleri gösteriyoruz
                        />
                      </Col>
                    </Row>
                  </div>
                }
              />
              <Route
                path="/checkout"
                element={
                  <Checkout
                    total={this.getTotal()}
                    clearCart={this.clearCart}
                  />
                }
              />
            </Routes>
          </Container>
        </div>
      </Router>
    );
  }
}
