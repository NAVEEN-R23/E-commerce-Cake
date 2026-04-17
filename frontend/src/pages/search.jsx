import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import Productcard from "../components/ProductCard"
import axiosInstance from "../utils/axiosInstance";


const Search = () => {
    const query = new URLSearchParams(useLocation().search).get("q");
    const [products, setProducts] = useState([]);
    useEffect(() => {
        if (query) {
            axiosInstance.get(`/products/search?q=${query}`)
                .then((res) => setProducts(res.data))
                .catch((err) => console.log(err))
        }
    }, [query]);
    return (
        <div className="p-5">
            <h2 className="text-xl font-bold mb-4">Search results for "{query}"</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.length > 0 ? (products.map((product) => (<Productcard key={product._id} product={product} />))) : (<p>No products found</p>)}
            </div>
        </div>
    )
}

export default Search;