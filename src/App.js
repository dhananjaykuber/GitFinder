import React, { useState } from 'react';
import {
  FaSearch,
  FaGithub,
  FaMapMarkerAlt,
  FaBriefcase,
  FaEnvelope,
  FaLink,
  FaTwitter,
} from 'react-icons/fa';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);

  const handleClick = async () => {
    setShow(false);
    if (name.length > 0) {
      try {
        const { data } = await axios.get(
          `https://api.github.com/users/${name}`
        );
        setData(data);
        setShow(true);
      } catch (error) {
        alert('Invalid username');
      }
    } else {
      alert('Provide Github username');
    }
  };

  return (
    <div className="container">
      <div className="heading">
        <FaGithub size={50} />
        <div className="headline">
          <h1>Git</h1>
          <h2>Finder</h2>
        </div>
      </div>
      <div className="input-field">
        <input
          type="text"
          placeholder="Enter Github Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="button" onClick={handleClick}>
          <FaSearch size={18} color="#fdfdfd" />
        </button>
      </div>

      {show && (
        <div className="user-container">
          <div className="user-left">
            <img src={data.avatar_url} alt={`${data.name} avatar`} />
            <div className="user-information">
              <div className="user-field">
                <FaMapMarkerAlt />
                <span>{data.location || 'Unavailable'}</span>
              </div>
              <div className="user-field">
                <FaTwitter />
                <span>
                  {data.twitter_username ? (
                    <a href={`https://twitter.com/${data.twitter_username}`}>
                      {data.twitter_username}
                    </a>
                  ) : (
                    'Unavailable'
                  )}
                </span>
              </div>
              <div className="user-field">
                <FaBriefcase />
                <span>{data.company || 'Unavailable'}</span>
              </div>
              <div className="user-field">
                <FaEnvelope />
                <span>
                  {data.email ? (
                    <a href={`mailto:${data.email}`}>{data.email}</a>
                  ) : (
                    'Unavailable'
                  )}
                </span>
              </div>
              <div className="user-field">
                <FaLink />
                <span>
                  {data.blog ? (
                    <a href={`https://www.${data.blog}`}>{data.blog}</a>
                  ) : (
                    'Unavailable'
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="user-right">
            <h1>
              <a href={data.html_url}>{data.name}</a>
            </h1>
            <p>Joined on {data.created_at.split('T')[0]}</p>
            <h3>{data.bio}</h3>
            <div className="user-stats">
              <div className="stat">
                <h4>Followers</h4> <h5>{data.followers}</h5>{' '}
              </div>
              <div className="stat">
                <h4>Following</h4> <h5>{data.following}</h5>{' '}
              </div>
              <div className="stat">
                <h4>Repos</h4> <h5>{data.public_repos}</h5>{' '}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
