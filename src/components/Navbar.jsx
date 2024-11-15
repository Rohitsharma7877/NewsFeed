import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5"; 
import NewsFeed from "./NewsFeed";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
 const navigate = useNavigate()
  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(()=>{
    <NewsFeed category={selectedCategory}/>
  },[selectedCategory])

    // Handle category selection
    const handleCategoryClick = (category) => {
      setSelectedCategory(category); // Set the selected category
      navigate(`/${category}`);
      toggleSidebar(); // Optional: Close the sidebar after selection
    };

    return (
      <header className="h-16 shadow-md bg-white fixed w-full z-4000">
        {/* Navbar */}
        <div className="container mx-auto flex items-center justify-between px-4 h-full">
          <div className="flex items-center gap-2">
            <button onClick={toggleSidebar}>
              <RxHamburgerMenu size={24} />
            </button>
            <h1 className="text-lg font-medium">MENU</h1>
          </div>
  
          <div className="flex-grow flex justify-center">
            <div className="text-lg font-bold text-gray-800">NewsFeed</div>
          </div>
        </div>
  
        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-50`}
        >
          <div className="flex justify-between items-center p-4">
            <h2 className="text-lg font-bold">Categories</h2>
            <button onClick={toggleSidebar}>
              <IoClose size={24} />
            </button>
          </div>
  
          {/* Sidebar Content */}
          <div className="p-4">
            <div className="flex justify-between mb-4">
              <button className="px-4 py-2 bg-gray-700 rounded text-sm">English</button>
              <button className="px-4 py-2 bg-gray-700 rounded text-sm">हिन्दी</button>
            </div>
  
            <ul className="space-y-2">
              {["India", "Business", "Technology", "Entertainment",  "Sports", "Politics", "Startups",  "Hatke", "International", "Automobile", "Science"].map((category) => (
                <li
                  key={category}
                  className="hover:bg-gray-700 p-2 rounded cursor-pointer"
                  onClick={() => handleCategoryClick(category)} // Set selected category on click
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
        </div>
  
        {/* Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={toggleSidebar}
          ></div>
        )}
  
        {/* Display Selected Category */}
        {selectedCategory && (
          <div className="fixed bottom-0 left-0 p-4 bg-gray-200 w-full text-center">
            <span>Selected Category: {selectedCategory}</span>
          </div>
        )}
      </header>
    );
};

export default Navbar;
