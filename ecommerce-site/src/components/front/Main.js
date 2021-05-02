import React from 'react';
import girl from '../../images/front.jpg';
// import '../../App.css';

const Main = ()=>{
    return(
        <div className="container-fluid" height={100}>
            <div className="row">
                <div className="col-4">
                    <h1 className="front-heading">Get it On<br/> <span>SHOPPINGO!</span></h1>
                    
                        <p className="sub-heading">
                            You Can Explore All the Exciting Products
                            with a Huge discount this year!
                        </p>

                        <a href="#products" className="btn explore-btn"> <i class="fa fa-shopping-cart" aria-hidden="true"></i>
 Explore</a>
                
                </div>
                <div className="col-8">
                    <img src={girl} height={600} width={900} className="mb-2"></img>
                </div>
            </div>
            
        </div>
    )
}


export default Main;