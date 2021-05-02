import React from 'react';
import Main from '../components/front/Main';
import LatestProducts from '../components/home/LatestProducts'
import BestSellers from '../components/home/BestSellers'
function Home()
{
    
    return(
        <div>
            <Main/>
            <div className="container-fluid " id="products">
                <div className=" section-header">
                         <h2>Latest Products</h2>
                </div>

                <div className="container">
                        <LatestProducts />
                </div>
                
            </div>
            <div className="container-fluid " id="products">
                <div className=" section-header">
                         <h2>Best Selllers</h2>
                </div>

                <div className="container">
                        <BestSellers />
                </div>
                
            </div>
        </div>
    )
}

export default Home;