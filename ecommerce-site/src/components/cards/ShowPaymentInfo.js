import React from "react";

const ShowPaymentInfo = ({ order , showStatus = true}) => (
  <div>
    <table className="table table-bordered">
        <thead  className="thead-light">
            <tr>
                <th>
                Order Id
                </th>
                <th>
                Amount
                </th>
                <th>
                Currency
                </th>
                <th>
                Method
                </th>
                <th>
                Payment
                </th>
                <th>
                Ordered on
                </th>
                <th>
                STATUS
                </th>
            </tr>
        </thead>

     <tbody>
     <tr>
      <td>
            <span> {order.paymentIntent.id}</span>
            
        </td>
        <td>
            <span>
           
            {(order.paymentIntent.amount /= 100).toLocaleString("en-US", {
            style: "currency",
            currency: "inr",
            })}
        </span>
        </td>

        <td>
        <span>{order.paymentIntent.currency.toUpperCase()}</span>
        </td>
        <td>
        <span> {order.paymentIntent.payment_method_types[0]}</span>
        </td>
        <td>
        <span> {order.paymentIntent.status.toUpperCase()}</span>
        </td>
        <td>
        <span>
           
            {new Date(order.paymentIntent.created * 1000).toLocaleString()}
        </span>
        </td>
        <td>
        {showStatus && (
        <span className="badge bg-primary text-white">
          STATUS: {order.orderStatus}
        </span>
        )}
        </td>
      </tr>
     </tbody>
    </table>
      
      
     
     
      
      
     
   
  </div>
);

export default ShowPaymentInfo;
