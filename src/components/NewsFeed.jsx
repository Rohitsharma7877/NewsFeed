import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pagination } from "@mui/material";
import { useLocation } from "react-router-dom";

const NewsFeed = () => {
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedNews, setSelectedNews] = useState(null);
  const itemsPerPage = 7;
  const location = useLocation();

  const defaultImage =
    "http://phandroid.com/wp-content/uploads/2019/09/apple_homepod_review_7_thumb800-Large.jpeg";

  // Extract category from the pathname
  const category = location.pathname.slice(1);

  const fetchSources = async () => {
    setLoading(true);
    setError(null);

    const params = {
      country: category === "India" ? "in" : "us",
      category: category !== "India" && category ? category : "",
      page: currentPage,
      itemsPerPage,
    };

    try {
      const response = await axios.get("https://newsbackend-ejzu.onrender.com/news", {
        params,
      });
      setSources(response.data.sources);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSources();
  }, [currentPage, category]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

      <div className="bg-red-500 text-white text-center p-2 mb-4 rounded-md">
        <h2 className="text-lg font-bold">
          For the best experience, use the inshorts app
        </h2>
        <div className="mt-2 flex justify-center">
          <a
            href="https://example.com/app-store"
            className="bg-gray-800 text-white px-4 py-2 rounded-md mr-2"
          >
            Download on the App Store
          </a>
          <a
            href="https://example.com/google-play"
            className="bg-gray-800 text-white px-4 py-2 rounded-md"
          >
            Get it on Google Play
          </a>
        </div>
      </div>

      {sources.map((source, index) => (
        <div
          key={index}
          onClick={() => setSelectedNews(source)}
          className="flex flex-col md:flex-row items-start md:items-center border rounded-lg shadow-md overflow-hidden mb-4 bg-white w-full md:w-[70%] md:ml-[15%] cursor-pointer"
        >
          <img
            src={defaultImage}
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

      <div className="flex justify-center mt-4">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
        />
      </div>
    </div>
  );
};

export default NewsFeed;
