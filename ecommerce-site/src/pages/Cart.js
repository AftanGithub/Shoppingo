import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import '../style/style.css';
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { userCart } from "../functions/user";

const Cart = ({history}) => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

  
  const showCartItems = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>

      {cart.map((p) => (
        <ProductCardInCheckout key={p._id} p={p} />
      ))}
    </table>
  );

  
  const saveCashOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    dispatch({
      type: "COD",
      payload: true,
    });
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <h4>Cart / {cart.length} Product</h4>

          {!cart.length ? (
            <p>
              No products in cart. <Link to="/shop">Continue Shopping.</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>
        <div className="col-md-4">
        <div class="card">
            <div class="card-header">
            <h4>Order Summary</h4>
            </div>
            <div class="card-body">
                <h5 class="card-title">Products</h5>
                <hr/>
                <p class="card-text">
                    {cart.map((c, i) => (
                        <div key={i}>
                        <p>
                            {c.title} x {c.count} = Rs. {c.price * c.count}
                        </p>
                        </div>
                    ))}
                    <hr />
                    Total: <b>Rs. {getTotal()}</b>
                </p>
                <hr />
                    {user ? (
                        <>
                          <button className="btn add-btn mt-2" onClick={saveOrderToDb} disabled={!cart.length}>
                          Proceed to Checkout
                          </button>
                          <button className="btn view-btn mt-2" onClick={saveCashOrderToDb} disabled={!cart.length}>
                            Pay Cash On Delivery
                          </button>
                        </>
                    ) : (
                        <button className="btn view-btn mt-2">
                            <Link
                                to={{
                                    pathname: "/login",
                                    state: { from: "cart" },
                                }}
                                className="orange"
                                >
                                Login to Checkout
                            </Link>
                        </button>
                    )} 
            </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
