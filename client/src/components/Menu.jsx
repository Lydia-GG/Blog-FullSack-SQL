import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Menu = ({ cat }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/posts/?cat=${cat}`
        );
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);
  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <img src={post.img} alt="" />
          <Link to="/post/:id">
            <h2>{post.title}</h2>
            <button>Read more...</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Menu;
