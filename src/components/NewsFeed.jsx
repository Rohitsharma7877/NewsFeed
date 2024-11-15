import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pagination } from "@mui/material";
import { useLocation } from "react-router-dom";

const NewsFeed = () => {
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNews, setSelectedNews] = useState(null);
  const itemsPerPage = 7;
  const location = useLocation();

  // Environment variables are recommended for sensitive data like API keys
  const API_KEY = "c003f70919aa4fc4bb23071b5c77755e";
  const defaultImage =
    "https://phandroid.com/wp-content/uploads/2019/09/apple_homepod_review_7_thumb800-Large.jpeg";

  // Extract category from the pathname, removing the leading "/"
  const category = location.pathname.slice(1);

  // Construct API URL based on category
  let API_URL = `https://newsapi.org/v2/top-headlines/sources?country=us&apiKey=${API_KEY}`;
  if (category === "India") {
    API_URL = `https://newsapi.org/v2/top-headlines/sources?country=in&apiKey=${API_KEY}`;
  } else if (category) {
    API_URL = `https://newsapi.org/v2/top-headlines/sources?category=${category}&apiKey=${API_KEY}`;
  }

  useEffect(() => {
    const fetchSources = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(API_URL);
        setSources(response.data.sources);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSources();
  }, [API_URL]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const indexOfLastSource = currentPage * itemsPerPage;
  const indexOfFirstSource = indexOfLastSource - itemsPerPage;
  const currentSources = sources.slice(indexOfFirstSource, indexOfLastSource);

  if (loading)
    return <p className="text-center text-lg font-bold">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-lg font-bold text-red-500">
        Error: {error}
      </p>
    );

  return (
    <div className="container mx-auto p-4 pt-20">
      {/* Background Overlay */}
      {selectedNews && (
        <div className="fixed inset-0 bg-gray-400 bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-3xl p-6 rounded-lg relative">
            <h2 className="text-2xl font-bold mb-2">{selectedNews.name}</h2>
            <p className="text-sm text-gray-600 mb-1">
              Category: {selectedNews.category}
            </p>
            <p className="text-gray-700 mb-4">{selectedNews.description}</p>
            <a
              href={selectedNews.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Visit {selectedNews.name}
            </a>
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-2 right-2 text-gray-700 font-bold text-xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* News List */}
      <div className="bg-red-500 text-white text-center p-2 mb-4 rounded-md">
        <h2 className="text-lg font-bold">
          For the best experience, use the inshorts app
        </h2>
        <div className="mt-2 flex justify-center">
          <a
            href="https://example.com/app-store" // Replace with the actual URL
            className="bg-gray-800 text-white px-4 py-2 rounded-md mr-2"
          >
            Download on the App Store
          </a>
          <a
            href="https://example.com/google-play" // Replace with the actual URL
            className="bg-gray-800 text-white px-4 py-2 rounded-md"
          >
            Get it on Google Play
          </a>
        </div>
      </div>

      {currentSources.map((source, index) => (
        <div
          key={index}
          onClick={() => setSelectedNews(source)}
          className="flex flex-col md:flex-row items-start md:items-center border rounded-lg shadow-md overflow-hidden mb-4 bg-white w-full md:w-[70%] md:ml-[15%] cursor-pointer"
        >
          <img
            src={source.urlToImage || defaultImage} // Use default image if urlToImage is not available
            alt="News"
            className="w-full md:w-[40%] h-80 md:h-[335px] object-cover "
          />
          <div className="p-10 flex flex-col justify-between w-full md:w-[60%] md:h-[335px] md:pl-6 text-left">
            <h2 className="text-xl font-bold mb-2">{source.name}</h2>
            <p className="text-sm text-gray-600 mb-1">
              Category: {source.category}
            </p>
            <p className="text-gray-700 mb-4">{source.description}</p>
            <span className="text-blue-600 hover:underline">Read More</span>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <Pagination
          count={Math.ceil(sources.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
        />
      </div>
    </div>
  );
};

export default NewsFeed;
