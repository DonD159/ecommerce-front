
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImageShop from './ShowImageShop';
import moment from 'moment';
import { addItem, updateItem, removeItem } from './CardHelpers';

 
const Card = ({
  c,
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = f => f,
  run = undefined
  // changeCartSize
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);
  
  const showViewButton = showViewProductButton => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-outline-primary mt-2 mb-2 card-btn-1">View Product</button>
        </Link>
      )
    );
  };
  
const addToCart = () => {
    // console.log('added');
    addItem(product, setRedirect(true));
  };
 
  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };
 
  const showAddToCartBtn = showAddToCartButton => {
    return (
      showAddToCartButton && (
        <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2 card-btn-1  ">
          Add to cart
        </button>
      )
    );
  };
 
  const showStock = quantity => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock {quantity} </span>
    ) : (
      <span className="badge badge-danger badge-pill">Out of Stock </span>
    );
  };
 
  const handleChange = productId => event => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };
 
  const showCartUpdateOptions = cartUpdate => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3 ">
            <div className="input-group-prepend ">
              <span className="input-group-text QuantityLinetwo">Quantity</span>
            </div>
            <input type="number" className="QuantityLine" value={count} onChange={handleChange(product._id)} />
          </div>
        </div>
      )
    );
  };
  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className="btn btn-outline-danger mt-2 mb-2"
        >
          Remove Product
        </button>
      )
    );
  };
  return (
    <div className="ms-1 cardShop">
      <div className="card-body cardbody mb-5">
      <div className="" style={{textAlign: 'center',fontWeight:'bold'}}>{product.name}</div>
        {shouldRedirect(redirect)}
        <ShowImageShop item={product} url="product" />
        <p className="mt-2">{product.description.substring(0, 100)}... </p>
        <p className="" style={{color: 'rgb(255, 102, 0)',fontWeight: 'bold'}}>US $ {product.price}</p>
        <p className="">Category: {product.category && product.category.name}</p>
        <p className="">Added on {moment(product.createdAt).fromNow()}</p>
        {showStock(product.quantity)}
        <br /><br />
        {showCartUpdateOptions(cartUpdate)}
     
        {showViewButton(showViewProductButton)}
 
        {showAddToCartBtn(showAddToCartButton)}
 
        {showRemoveButton(showRemoveProductButton)}
 
      </div>
      <hr />
    </div>
  );
};
 
export default Card;