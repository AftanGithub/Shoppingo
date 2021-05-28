import React,{useState} from "react";
import { Card, Tabs,Tooltip} from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import noImage from "../../images/no-image.png";
import '../../index.css';
import ProductListItems from './ProductListItems';
import StarRating from "react-star-ratings";
import RatingModal from '../modal/RatingModal';
import { showAverage } from "../../functions/rating";
import { addToWishlist } from "../../functions/user";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";




const { TabPane } = Tabs;

const SingleProduct = ({ product,onStarClick,star }) => {
  const { title, description, images,_id,quantity} = product;
  const [tooltip, setTooltip] = useState("Click to add");
  const [wishlistTooltip,setWishlistTooltip] = useState("Click to Add to wishlist");

  // redux
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

    // router
    let history = useHistory();

  
  const handleAddToCart = () => {
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
      // show tooltip
      setTooltip("Added");

      // add to redux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });

       // show cart items in side drawer
       dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };

  
  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product._id, user.token).then((res) => {
      console.log("ADDED TO WISHLIST", res.data);
      toast.success("Added to wishlist");
      history.push("/user/wishlist");
    });

    setWishlistTooltip("Added to Wishlist");
  };


  return (
    <>
      <div className="col-md-7">
      {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
          </Carousel>
        ) : (
          <Card cover={<img src={noImage} className="mb-3 card-image" />}></Card>
        )}

        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Mail <b className="text-info">aftanahmadskills@gmail.com</b> to know more about this product.
          </TabPane>
        </Tabs>



      </div>

      <div className="col-md-5">
        <h1 className="description-title p-3">{title}</h1>
        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center pt-1 pb-3">No rating yet</div>
        )}
        <Card
          actions={[
            <Tooltip title={tooltip}>
              <a onClick={handleAddToCart} disabled={quantity < 1}>
                <ShoppingCartOutlined className="text-danger" /> <br /> 
                {quantity < 1 ? 'Out of Stock':'Add to Cart'}
              </a>
            </Tooltip>,
            
            <Tooltip title={wishlistTooltip}>
              <a onClick={handleAddToWishlist}>
              <HeartOutlined className="text-info" /> <br /> Add to Wishlist
              </a>
            </Tooltip>
            ,
            <RatingModal>
               <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={ onStarClick}
                isSelectable={true}
                starRatedColor="red"
              />
            </RatingModal>
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
