import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface PostData {
    id: number; // プロパティの型を正確に指定する
    title: string;
    body: string;
  }

function Post() {
  const { postId } = useParams();
  const [post, setPost] = useState< PostData | null >(null);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      const data = await res.json();
      setPost(data);
    };
    fetchPost();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }


  return (
    <>
      <h2>Single Post</h2>
      <div>
        <p>ID:{post.id}</p>
        <p>タイトル:{post.title}</p>
        <p>内容:{post.body}</p>
      </div>
    </>
  );
}

export default Post;