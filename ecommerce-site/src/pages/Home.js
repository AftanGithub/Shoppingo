import React from 'react';
import Main from '../components/front/Main';
import LatestProducts from '../components/home/LatestProducts'
import BestSellers from '../components/home/BestSellers'
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/sub/SubList";
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

                <div className="container ">
                        <BestSellers />
                </div>
                
            </div>
            <div className="container-fluid " id="products">
                <div className=" section-header">
                         <h2>Categories</h2>
                </div>

                <div className="container p-5">
                        <CategoryList />
                </div>
                
            </div>
            <div className="container-fluid " id="products">
                <div className=" section-header">
                         <h2>SubCategories</h2>
                </div>

                <div className="container p-5">
                        <SubList />
                </div>
                
            </div>

            
        </div>
    )
}

export default Home;