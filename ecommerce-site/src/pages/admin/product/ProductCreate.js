import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector} from "react-redux";
import { createProduct } from "../../../functions/product";
import ProductCreateForm from '../../../components/forms/ProductCreateForm';
import { getCategories,getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import {Spin} from 'antd';
const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue","Other"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo","sony", "ASUS","Dell","HP","Adidas","Gucci","Puma","Sparx","Relaxo","CK","other","GShock","Oppo","Realme","Mi","sonata","vivo"],
  color: "",
  brand: "",
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [subOptions,setSubOptions] = useState([]);
  const [showSub,setShowSub] = useState(false);
  const [loading,setLoading] = useState(false);

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setValues({...values,categories:c.data}));

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        toast.success(`"${res.data.title}" Added Successfully!`);
        setTimeout(()=>{
          window.location.reload();
        },3000);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, " ----- ", e.target.value);
  };

 
  const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log("CLICKED CATEGORY", e.target.value);
    setValues({ ...values,subs:[], category: e.target.value });
    getCategorySubs(e.target.value).then((res) => {
      console.log("SUB OPTIONS ON CATGORY CLICK", res);
      setSubOptions(res.data);
    });

    setShowSub(true);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
                {loading? 
                        <center className="mt-3">
                        <Spin tip="Loading...">
                         
                        </Spin>
                        </center> 
                        :
                        <h4>Product Create</h4>
                    }
          <hr />

          <div>
            <FileUpload values={values} setValues={setValues} setLoading={setLoading}/>
          </div>
          <br/>
          <ProductCreateForm handleChange={handleChange} handleSubmit={handleSubmit} values={values} 
            handleCategoryChange={handleCategoryChange} showSub = {showSub} subOptions = {subOptions} setValues={setValues}
          />

          
          
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
