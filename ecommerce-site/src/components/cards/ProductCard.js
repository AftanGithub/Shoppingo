import React from "react";
import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "../../images/laptop.jpg";
import { Link } from "react-router-dom";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  // destructure
  const { images, title, description, slug } = product;
  return (
    // <Card
    //   cover={
    //     <img
    //       src={images && images.length ? images[0].url : laptop}
    //       style={{ height: "150px", objectFit: "cover" }}
    //       className="p-1"
    //     />
    //   }
    //   actions={[
    //     <Link to={`/product/${slug}`}>
    //       <EyeOutlined className="text-info" /> <br /> View Product
    //     </Link>,
    //     <>
    //       <ShoppingCartOutlined className="text-danger" /> <br /> Add to Cart
    //     </>,
    //   ]}
    // >
    //   <Meta
    //     title={title}
    //     description={`${description && description.substring(0, 40)}...`}
    //   />
    // </Card>
    
    <div class="card" style={{width: "18rem"}}>
      <img class="card-img-top" src={images && images.length ? images[0].url : laptop} alt="Card image cap" style={{ height: "150px", objectFit: "cover" }} />
      <div class="card-body">
        <h5 class="card-title">{title}</h5>
        <p class="card-text">{`${description && description.substring(0, 30)}...`}</p>
        {/* <a href="#" class="btn view-btn" ></a> */}
        <Link to={`/product/${slug}`} target="_blank" className="btn view-btn ml-3 mb-2">
        <i class="fa fa-eye mr-2" aria-hidden="true"></i><small>View Product</small>
        </Link>
        <a href="#" class="btn add-btn ml-3 "><i class="fa fa-shopping-cart mr-2" aria-hidden="true"></i><small>Add to Cart</small>
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
