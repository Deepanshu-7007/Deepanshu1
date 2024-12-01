import React from 'react';
import ProductList from '../components/ProductList';
import '../components/styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <header className="homepage-header">
        <h2 className="welcome-message">Welcome to Thunder</h2>
        <p className="subtitle">Your one-stop shop for the best products</p>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h1>Explore Our Latest Products</h1>
          <p>Browse through a wide range of products at great prices.</p>
        </div>
      </section>

      <ProductList />
    </div>
  );
};

export default HomePage;
