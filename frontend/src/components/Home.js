import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Rating from './Rating';
import { Pagination } from 'react-bootstrap';



function Home(props) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [category, setCategory] = useState('');
  const [active, setActive] = useState(1);
  const productList = useSelector((state) => state.productList);
  const { products: productsOriginal, loading, error } = productList;
  let products = productsOriginal;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts(category, searchKeyword, sortOrder, active));

    return () => {
      //
    };
  }, [category, sortOrder, active]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
  };
  const categoryHandler = (e) => {
    setCategory(e.target.value);
    // dispatch(listProducts(category, searchKeyword, sortOrder));
  }

  const setActiveHandler = (page) => {
    console.log(page);
    setActive(page);
  }

 

  const PaginationBasic = (activePage) => {
    console.log('rendering')
    let items = [];
    for (let number = 1; number <= 3; number++) {
      items.push(
        <Pagination.Item key={number} active={number === activePage} onClick={() => setActiveHandler(number)}>
          {number}
        </Pagination.Item>,
      );
    }
    return (
    <div>
      <Pagination size="lg">{items}</Pagination>
    </div>
  )};

  return (
    <>
      {category && <h2>{category}</h2>}
      <div className="filter">
        <div>
          <form onSubmit={submitHandler}>
            <input
              name="searchKeyword"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>
        <div>
          Sort By{' '}
          <select name="sortOrder" onChange={sortHandler}>
            <option value="">Newest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </div>
        <div>
          Category{' '}
          <select name="category" onChange={categoryHandler}>
            <option value="">All</option>
            <option value="Wine">Wine</option>
            <option value="Red Wine">Red Wine</option>
            <option value="White Wine">White Wine</option>
            <option value="Chardonnay">Chardonnay</option>
            <option value="Sparkling Wine">Sparkling wine</option>
          </select>
        </div>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
            <ul className="products">
              {products.map((product) => (
                <li key={product._id}>
                  <div className="product">
                    <Link to={'/product/' + product._id}>
                      <img
                        className="product-image"
                        src={product.image}
                        alt="product"
                      />
                    </Link>
                    <div className="product-name">
                      <Link to={'/product/' + product._id}>{product.name}</Link>
                    </div>
                    <div className="product-brand">{product.brand}</div>
                    <div className="product-price">${product.price}</div>
                    <div className="product-rating">
                      <Rating
                        value={product.rating}
                        text={product.numReviews + ' reviews'}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
      {PaginationBasic(active)}
    </>
  );
}
export default Home;
