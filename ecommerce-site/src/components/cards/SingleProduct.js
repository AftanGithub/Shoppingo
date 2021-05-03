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
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";




const { TabPane } = Tabs;

const SingleProduct = ({ product,onStarClick,star }) => {
  const { title, description, images,_id} = product;
  const [tooltip, setTooltip] = useState("Click to add");

  // redux
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();


  
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

      // add to reeux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
    }
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
              <a onClick={handleAddToCart}>
                <ShoppingCartOutlined className="text-danger" /> <br /> Add to
                Cart
              </a>
            </Tooltip>,
            <Link to="/">
              <HeartOutlined className="text-info" /> <br /> Add to Wishlist
            </Link>,
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
