import React, { useEffect, useState } from 'react';
import './ProductFilter.css';
import { Link } from 'react-router-dom';

const categoryMap = {
  men: "men's clothing",
  women: "women's clothing",
  baby: null,
  kids: null,
};

const ProductFilter = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [showFilter, setShowFilter] = useState(true);
  const [showIdealFor, setShowIdealFor] = useState(false); // default collapsed
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isCustomizable, setIsCustomizable] = useState(false);
  const [sortOption, setSortOption] = useState('recommended');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }

    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFiltered(data);
      });
  }, []);

  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFiltered(products);
    } else {
      const categories = selectedCategories.map(sc => categoryMap[sc]).filter(Boolean);
      setFiltered(products.filter(p => categories.includes(p.category)));
    }
  }, [selectedCategories, products]);

  useEffect(() => {
    let sortedProducts = [...filtered];
    if (sortOption === 'priceHighToLow') {
      sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'priceLowToHigh') {
      sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'newestFirst') {
      sortedProducts = sortedProducts.sort((a, b) => new Date(b.date) - new Date(a.date)); // Assuming each product has a 'date' field
    } else if (sortOption === 'popular') {
      sortedProducts = sortedProducts.sort((a, b) => b.rating - a.rating); // Assuming products have a 'rating' field
    }

    setFiltered(sortedProducts);
  }, [sortOption]);

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setSelectedCategories(prev =>
      checked ? [...prev, value] : prev.filter(cat => cat !== value)
    );
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="main-container">
      <button className="toggle-btn" onClick={() => setShowFilter(!showFilter)}>
        ⬅ {showFilter ? 'Hide Filter' : 'Show Filter'}
      </button>

      <div className="layout">
        {showFilter && (
          <aside className="sidebar">
            <div className="filter-section">
              {/* CUSTOMIZABLE TOGGLE */}
              <div className="filter-sub" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                <input type="checkbox" checked={isCustomizable} onChange={() => setIsCustomizable(!isCustomizable)} />
                <span style={{ fontWeight: 'bold' }}>Customizable</span>
              </div>

              {/* IDEAL FOR */}
              <h4 onClick={() => setShowIdealFor(!showIdealFor)} className="filter-title">
                IDEAL FOR <span style={{ float: 'right' }}>⬇</span>
              </h4>
              <div className="filter-sub">All</div>
              {showIdealFor && (
                <div className="checkbox-group">
                  <label><input type="checkbox" value="men" onChange={handleCategoryChange} /> Men</label>
                  <label><input type="checkbox" value="women" onChange={handleCategoryChange} /> Women</label>
                  <label><input type="checkbox" value="baby" onChange={handleCategoryChange} /> Baby</label>
                  <label><input type="checkbox" value="kids" onChange={handleCategoryChange} /> Kids</label>
                </div>
              )}

              {/* STATIC FILTER HEADINGS WITH DOWN ARROW */}
              <div className="filter-title">OCCASION <span style={{ float: 'right' }}>⬇</span></div>
              <div className="filter-sub">All</div>

              <div className="filter-title">WORK <span style={{ float: 'right' }}>⬇</span></div>
              <div className="filter-sub">All</div>

              <div className="filter-title">FABRIC <span style={{ float: 'right' }}>⬇</span></div>
              <div className="filter-sub">All</div>

              <div className="filter-title">SEGMENT <span style={{ float: 'right' }}>⬇</span></div>
              <div className="filter-sub">All</div>

              <div className="filter-title">SUITABLE FOR <span style={{ float: 'right' }}>⬇</span></div>
              <div className="filter-sub">All</div>

              <div className="filter-title">RAW MATERIALS <span style={{ float: 'right' }}>⬇</span></div>
              <div className="filter-sub">All</div>

              <div className="filter-title">PATTERN <span style={{ float: 'right' }}>⬇</span></div>
              <div className="filter-sub">All</div>
            </div>
          </aside>
        )}

        <div className="product-grid">
          <div className="dropdown-container">
            <div className="recommended-dropdown">
              <select className="bordernone" onChange={handleSortChange} value={sortOption}>
                <option value="recommended">Recommended</option>
                <option value="newestFirst">Newest First</option>
                <option value="popular">Popular</option>
                <option value="priceHighToLow">Price: High to Low</option>
                <option value="priceLowToHigh">Price: Low to High</option>
              </select>
            </div>
          </div>

          {filtered.map(product => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.title} />
              <h4>{product.title.length > 25 ? product.title.slice(0, 25) + '...' : product.title}</h4>
              
              {/* Conditionally render login/register or product details */}
              {isLoggedIn ? (
                <div className="product-details">
                  <p className="product-price">${product.price}</p>
                  <p className="product-category">{product.category}</p>
                </div>
              ) : (
                <p style={{ color: 'gray', fontStyle: 'italic', marginTop: '8px', fontSize: '0.75rem' }}>
                  <Link to="/login"> Login </Link> or <Link to="/register"> Register </Link> to view details
                </p>
              )}

              {/* Heart icon */}
              <span className="heart-icon">♡</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
