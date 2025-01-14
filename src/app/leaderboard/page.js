"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css"; // Include the updated styles for leaderboard

const Progress = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    // Get current user from localStorage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setCurrentUser(storedUsername);
    }

    // Fetch leaderboard data from the backend
    const fetchLeaderboardData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/leaderboard"); // Update the URL to match your API
        setLeaderboardData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch leaderboard data.");
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  const fetchUserDetails = async (username) => {
    try {
      const response = await axios.get(`http://localhost:5000/user-details/${username}`); // Update with your API endpoint
      setUserDetails(response.data);
    } catch (err) {
      console.error("Failed to fetch user details.", err);
    }
  };

  const handleUserClick = (username) => {
    setSelectedUser(username);
    fetchUserDetails(username);
  };

  const filteredData = leaderboardData.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / usersPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <div>Loading leaderboard...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="leaderboard-container">
      {selectedUser && userDetails ? (
        <div className="user-details">
          <h2>{selectedUser}'s Stats</h2>
          <table className="user-details-table">
            <thead>
              <tr>
              <th>🆔 Question ID</th>
        <th>📜 Title</th>
        <th>🎯 Difficulty</th>
        <th>🌟 Best Score</th>
        <th>🔁 Attempts</th>
              </tr>
            </thead>
            <tbody>
              {userDetails.questions.map((question) => (
                <tr key={question.id}>
                  <td>{question.id}</td>
                  <td>{question.title}</td>
                  <td>{question.difficulty}</td>
                  <td>{question.bestScore}</td>
                  <td>{question.attempts}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => setSelectedUser(null)}>Back to Leaderboard</button>
        </div>
      ) : (
        <>
        <div className="super">
          <h1>Leaderboard</h1>
  <input
    type="text"
    placeholder="Search by username"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="search-input"
  />
  <div className="table-container">
    <table className="leaderboard-table">
      <thead>
        <tr>
          <th>
            🏆 Rank
          </th>
          <th>
            🧑‍💻 Username
          </th>
          <th>
            🌟 Total Score
          </th>
          <th>
            ✅ Questions Solved
          </th>
        </tr>
      </thead>
      <tbody>
        {paginatedData.map((user, index) => (
          <tr
            key={user._id}
            style={
              user.username === currentUser
                ? { backgroundColor: "#ffeb3b" } // Highlight current user
                : {}
            }
          >
            <td>
              {index + 1 + (currentPage - 1) * usersPerPage === 1
                ? "🥇"
                : index + 1 + (currentPage - 1) * usersPerPage === 2
                ? "🥈"
                : index + 1 + (currentPage - 1) * usersPerPage === 3
                ? "🥉"
                : index + 1 + (currentPage - 1) * usersPerPage}
            </td>
            <td>
              <button
                className="username-button"
                onClick={() => handleUserClick(user.username)}
              >
                {user.username}
              </button>
            </td>
            <td>{user.totalScore}</td>
            <td>
            {Object.keys(user.questionsSolved).length}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  <div className="pagination">
    {currentPage > 1 && (
      <button
        className="pagination-button"
        onClick={() => handlePageChange(currentPage - 1)}
      >
        ◀️ Prev
      </button>
    )}
    {Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index + 1}
        className={`pagination-button ${
          currentPage === index + 1 ? "active" : ""
        }`}
        onClick={() => handlePageChange(index + 1)}
      >
        {index + 1}
      </button>
    ))}
    {currentPage < totalPages && (
      <button
        className="pagination-button"
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next ▶️
      </button>
    )}
  </div>
  </div>
</>
      )}
    </div>
  );
};

export default Progress;
