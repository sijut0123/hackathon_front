import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface PostsIndexData {
    id: number;
    title: string;
};

function PostIndex() {
  const [posts, setPosts] = useState< PostsIndexData[] | null >([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  if (!posts) {
    return <div>Loading...</div>
  }

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link to={`${post.id}`}>
            {post.id}:{post.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default PostIndex;