import React, { useState, useEffect } from "react";
import { BsBrightnessHighFill, BsBrightnessHigh } from "react-icons/bs";
import "./GithubProfile.css";
import { ImLocation2 } from "react-icons/im";
import { RiLinksLine } from "react-icons/ri";

const GithubProfile = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [theme] = useState("light");

  useEffect(() => {
    const body = document.querySelector("body");
    if (theme === "dark") {
      body.classList.add("dark");
    } else {
      body.classList.remove("dark");
    }
  }, [theme]);

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();
      // console.log(data);

      if (response.ok) {
        setUserData(data);
        setError(null);
      } else {
        setUserData(null);
        setError(`No user found`);
        // : ${data.message}
      }
    } catch (error) {
      setUserData(null);
      setError(`No user found`);
      // : ${error.message}
    }
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  let gitApiDate = userData?.created_at;
  // let timeStamp = new Date(gitApiDate).getTime();
  let Day = new Date(gitApiDate).getDate();
  let Month = new Date(gitApiDate).toLocaleString(`default`, {
    month: "short",
  });
  let Year = new Date(gitApiDate).getFullYear();
  let OurNewDateFormat = `${Day} ${Month} ${Year}`;
  // let Month = new Date(gitApiDate).getMonth() + 1;
  // console.log(OurNewDateFormat);

  return (
    <div className={`custom-theme ${isDarkMode ? "dark" : ""}`}>
      <div className={`container dark ${userData && "loaded"}`}>
        <div class="container">
          <header class="header">
            <h1 class="title">GitInsight</h1>
            <div id="btn-mode" onClick={handleToggle}>
              <p id="mode-text">{isDarkMode ? "Light" : "Dark"}</p>
              <div class="icon-container">
                {isDarkMode ? <BsBrightnessHigh /> : <BsBrightnessHighFill />}
              </div>
            </div>
          </header>
          <main>
            <div id="app">
              <div class="searchbar-container active">
                <input
                  value={username}
                  onChange={handleInputChange}
                  type="search"
                  placeholder="Enter a GitHub username"
                  id="input"
                  required
                />
                <div class="error">
                  <p id="no-results">{error && <div>{error}</div>}</p>
                </div>
                <button class="btn-search" id="submit" onClick={handleSearch}>
                  Search
                </button>
              </div>
              {userData && (
                <div class="profile-container">
                  <div class="profile-content">
                    <div class="profile-header">
                      <img
                        id="avatar"
                        src={userData.avatar_url}
                        alt={userData.name}
                      />
                      <div class="profile-info-wrapper">
                        <div class="profile-name">
                          <h2 id="name">{userData.name}</h2>
                          <a
                            href={userData.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            id="user">
                            @{userData.login}
                          </a>
                        </div>
                        <p id="date">Joined {OurNewDateFormat}</p>
                      </div>
                    </div>
                    <p id="bio">
                      {!userData.bio ? "This profile has no bio" : userData.bio}
                    </p>
                    <div class="profile-stats-wrapper">
                      <div class="profile-stat">
                        <p class="stat-title">Repo</p>
                        <p id="repos" class="stat-value">
                          {userData.public_repos}
                        </p>
                      </div>
                      <div class="profile-stat">
                        <p class="stat-title">Followers</p>
                        <p id="followers" class="stat-value">
                          {userData.followers}
                        </p>
                      </div>
                      <div class="profile-stat">
                        <p class="stat-title">Following</p>
                        <p id="following" class="stat-value">
                          {userData.following}
                        </p>
                      </div>
                    </div>
                    <div class="profile-bottom-wrapper">
                      <div class="profile-info">
                        <div class="bottom-icons">
                          <ImLocation2 />
                        </div>
                        <p id="location">
                          {!userData.location
                            ? "Not available"
                            : userData.location}
                        </p>
                      </div>
                      <div class="profile-info">
                        <div class="bottom-icons">
                          <RiLinksLine />
                        </div>
                        <a
                          href={!userData.blog ? "" : userData.blog}
                          id="page"
                          target="_blanck">
                          {!userData.blog ? "Not available" : userData.blog}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
export default GithubProfile;
