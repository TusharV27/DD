import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import { apiUrl } from "../../Env/EnvExport";

const StarRating = ({ rating, onRatingChange }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const filled = i < rating;
      stars.push(
        <span
          key={i}
          onClick={() => onRatingChange(i + 1)}
          style={{ cursor: "pointer", color: "#FFD700", fontSize: "30px" }}
        >
          {filled ? "★" : "☆"}
        </span>
      );
    }
    return stars;
  };

  return <div>{renderStars()}</div>;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");

  async function getReviews() {
    try {
      const restaurantId = JSON.parse(sessionStorage.getItem("restAdmin"))._id;
      const res = await axios.get(`${apiUrl}/outlets/reviews/${restaurantId}`);
      const data = await res.data;
      setReviews(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getReviews();
  }, []);

  const handleFilter = (e) => {
    const value = parseInt(e.target.value);
    setSelectedRating(value === -1 ? null : value);
  };

  const handleSort = () => {
    const sortedReviews = [...reviews].sort((a, b) => {
      return sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating;
    });

    setReviews(sortedReviews);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDownloadAllReviews = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(reviews);
    XLSX.utils.book_append_sheet(workbook, worksheet, "All Reviews");

    // Generate the binary string representation of the workbook
    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "binary" });

    // Convert the binary string to an array buffer
    const buf = new ArrayBuffer(wbout.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < wbout.length; i++) {
      view[i] = wbout.charCodeAt(i) & 0xff;
    }

    // Create a Blob from the array buffer
    const excelBlob = new Blob([buf], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Create a download link
    const url = window.URL.createObjectURL(excelBlob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "all_reviews.xlsx");

    // Simulate click event to trigger download
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleRatingChange = (id, newRating) => {
    // Implement rating change logic here
    console.log(`Rating changed for review ${id} to ${newRating}`);
  };

  const filteredReviews = reviews.filter((review) => {
    const ratingMatch = selectedRating
      ? review.rating === selectedRating
      : true;
    const nameMatch = review.username
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return ratingMatch && nameMatch;
  });

  return (
    <>
      <div
        className="p-5"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <h1 className="text-[30px] font-semibold">Customer Reviews</h1>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            <input
              type="text"
              placeholder="Search..."
              onChange={handleSearchInputChange}
              style={{
                padding: "5px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                flex: "1 1 auto",
                minWidth: "200px",
              }}
            />
            <select
              onChange={handleFilter}
              style={{
                padding: "5px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            >
              <option value={-1}>Filter</option>
              {[...Array(5)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {"★".repeat(index + 1)}
                </option>
              ))}
            </select>
            <button
              onClick={handleSort}
              style={{
                padding: "5px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                cursor: "pointer",
                backgroundColor: "#e0e0e0",
              }}
            >
              Sort by Rating {sortOrder === "asc" ? "▼" : "▲"}
            </button>
          </div>
        </div>
        <div>
          <div
            style={{
              background: "#f0f0f0",
              padding: "10px",
              borderRadius: "10px",
              marginBottom: "10px",
            }}
          >
            <span>Total Reviews: {reviews.length}</span>
          </div>
          <button
            onClick={handleDownloadAllReviews}
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Download All Reviews
          </button>
        </div>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table className="w-full" style={{ borderCollapse: "collapse" }}>
          <thead className="bg-[#DEE4F1]">
            <tr>
              <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                Sr. No
              </th>
              <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                Username
              </th>
              <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                Created At
              </th>
              <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                Rating
              </th>
              <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                Feedback
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {filteredReviews.map((review, index) => (
              <tr key={index}>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  {index + 1}
                </td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  {review.username}
                </td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  {formatDate(review.createdAt)}
                </td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  <StarRating
                    rating={review.rating}
                    onRatingChange={(newRating) =>
                      handleRatingChange(review.id, newRating)
                    }
                  />
                </td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  {review.feedback}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminReviews;
