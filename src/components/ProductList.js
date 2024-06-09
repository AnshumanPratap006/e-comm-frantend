import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        let result = await fetch('https://e-comm-backend-ampa.onrender.com/products',{
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setProducts(result)
    }
    const deleteProduct = async (id) => {
        let result = await fetch(`https://e-comm-backend-ampa.onrender.com/product/${id}`,{
            method:"Delete",
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result =await result.json();
        if(result){
            alert("record is deleted")
            getProducts();
        }

        console.warn(id);
       
    }
    const searchHandle =async (event)=>{
        let key =event.target.value
        if(key){
            let result = await fetch(`https://e-comm-backend-ampa.onrender.com/search/${key}`,{
                headers:{
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            result = await result.json();
            if(result){
                setProducts(result)
            }
        }else{
            getProducts();
        }
       
    }

    return (
        <div className="product-list">
            <h3>Product</h3>
            <input type="text" placeholder="Search Product" className="search-product-box" 
            onChange={searchHandle}/>
            <ul>
                <li>S. No.</li>
                <li>name</li>
                <li>category</li>
                <li>price</li>
                <li>company</li>
                <li>Opration</li>


            </ul>
            {
                products.length>0 ? products.map((item,index) =>
                    <ul key={item._id}>
                        <li>{index+1}</li>
                        <li>{item.name}</li>
                        <li>{item.category}</li>
                        <li>{item.price}</li>
                        <li>{item.company}</li>
                        <li><button onClick={()=>deleteProduct(item._id)}>Delete</button>
                        <Link to={"/update/"+item._id}>Update</Link>
                        </li>


                    </ul>
                )
                :<h1>No result found</h1>
            }
        </div>
    )
}

export default ProductList;