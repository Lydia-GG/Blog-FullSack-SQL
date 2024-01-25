import Edit from '../img/edit.png';
import Delete from '../img/delete.png';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Menu from '../components/Menu';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { AuthContext } from '../context/authContext';

const Single = () => {
  const [post, setPost] = useState({});
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const { id } = useParams();
  const postId = +id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/posts/${postId}`
        );
        console.log(res.data);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  console.log(post.username);
  console.log(currentUser);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/posts/${postId}`);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };
  // const handleUpdate = () => {
  //   try {
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div className="singlePage">
      <div className="content">
        <img src={post?.img} alt="" />
        <div className="user">
          {post.user_img && <img src={post.user_img} alt="" />}

          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser?.username === post.username && (
            <div className="edit">
              <Link className="link" to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="" />
              </Link>

              <img src={Delete} alt="" onClick={handleDelete} />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <p>{post.desc}</p>
      </div>
      <Menu cat={post.category} />
    </div>
  );
};

export default Single;
