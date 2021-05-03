import React,{ useState } from "react";
import laptop from "../../images/laptop.jpg";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";




const ProductCard = ({ product }) => {
  const [tooltip, setTooltip] = useState("Click to add");

  // redux
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  // destructure
  const { images, title, description, slug,price } = product;
  const handleAddToCart = (e) => {
    e.preventDefault();
    // create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local storage
      // console.log('unique', unique)
      localStorage.setItem("cart", JSON.stringify(unique));
      setTooltip("Added");

      
      // add to reeux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
    }
  };
  
  return (
   
    <div class="card" style={{width: "18rem"}}>
      <img class="card-img-top" src={images && images.length ? images[0].url : laptop} alt="Card image cap" style={{ height: "150px", objectFit: "cover" }} />
      <div class="card-body">
        <h4 class="card-title">{`${title} - Rs. ${price}`}</h4>
        <p class="card-text">{`${description && description.substring(0, 30)}...`}</p>
        {/* <a href="#" class="btn view-btn" ></a> */}
        <Link to={`/product/${slug}`} target="_blank" className="btn view-btn ml-3 mb-2">
        <i class="fa fa-eye mr-2" aria-hidden="true"></i><small>View Product</small>
        </Link>
       
            <a href="#" class="btn add-btn ml-3 " onClick={handleAddToCart} title={tooltip}>
              <i class="fa fa-shopping-cart mr-2" aria-hidden="true"></i><small>Add to Cart</small>
            </a>
       
       
      </div>
      <div className="card-footer">
      {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center pt-1 pb-3">No rating yet</div>
        )}
      </div>
    </div>
  
  );
};

export default ProductCard;
