// import React, { useState } from "react"; // Import useState hook
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import FilterProduct from "../components/FilterProduct";
// import CardFeature from "../components/CardFeature";
// import Footer from "../components/Footer";

// const Menu = () => {
//   // Assuming product data is stored in Redux state
//   const productData = useSelector((state) => state.product.productList);
//   const categoryList = [...new Set(productData.map((el) => el.category))];

//   // Initialize filtered product data state using useState hook
//   const [filteredData, setFilteredData] = useState(productData);

//   // Function to handle filtering products based on category
//   const handleFilterProduct = (category) => {
//     if (category === "All") {
//       setFilteredData(productData);
//     } else {
//       const filteredProducts = productData.filter(
//         (product) => product.category === category
//       );
//       setFilteredData(filteredProducts);
//     }
//   };

//   return (
//     <div className="p-2 md:p-4">
//       <h2 className="text-lg md:text-2xl font-bold text-slate-600 mb-4">
//         Menu
//       </h2>

//       {/* Filter options */}
//       <div className="flex gap-4 justify-center overflow-scroll scrollbar-none">
//         <FilterProduct
//           category="All"
//           isActive={true} // Assuming 'All' is active by default
//           onClick={() => handleFilterProduct("All")}
//         />
//         {categoryList.map((category) => (
//           <FilterProduct
//             key={category}
//             category={category}
//             isActive={false}
//             onClick={() => handleFilterProduct(category)}
//           />
//         ))}
//       </div>

//       {/* Display products */}
//       <div className="flex flex-wrap justify-center gap-4 my-4">
//         {filteredData.map((product) => (
//           <CardFeature
//             key={product._id}
//             id={product._id}
//             name={product.name}
//             category={product.category}
//             price={product.price}
//             image={product.image}
//           />
//         ))}
//       </div>
//       <Footer/>
//     </div>
//   );
// };

// export default Menu;




import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AllProduct from "../components/AllProduct";
import { addCartItem } from "../redux/productSlide";

const Menu = () => {
  const { filterby } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const productData = useSelector((state) => state.product.productList);

  const productDisplay = productData.filter((el) => el._id === filterby)[0];

  const handleAddCartProduct = (e) => {
    dispatch(addCartItem(productDisplay))
  };

  const handleBuy = ()=>{
    dispatch(addCartItem(productDisplay))
      navigate("/cart")
  }
  return (
    <div className="p-2 md:p-4">
      <div className="w-full max-w-4xl m-auto md:flex bg-white">
        <div className="max-w-sm  overflow-hidden w-full p-5">
          <img
            src={productDisplay.image}
            className="hover:scale-105 transition-all h-full"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-slate-600  capitalize text-2xl md:text-4xl">
            {productDisplay.name}
          </h3>
          <p className=" text-slate-500  font-medium text-2xl">{productDisplay.category}</p>
          <p className=" font-bold md:text-2xl">
            <span className="text-red-500 ">₹</span>
            <span>{productDisplay.price}</span>
          </p>
          <div className="flex gap-3">
          <button onClick={handleBuy} className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px]">Buy</button>
          <button onClick={handleAddCartProduct} className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px]">Add Cart</button>
          </div>
          <div>
            <p className="text-slate-600 font-medium">Description : </p>
            <p>{productDisplay.description}</p>
          </div>
        </div>
      </div>

      <AllProduct heading={"Related Product"}/>
    </div>
  );
};

export default Menu;