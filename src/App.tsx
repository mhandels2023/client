import { useState, useEffect } from "react";
import { createPost, getPosts, updatePost, deletePost } from "./services/api";

type Post = {
  id: string;
  title: string;
  body?: string; // Assuming each post might have a body.
};

function App() {
  const [posts, setPosts] = useState<Post[]>([]);

  // Fetch posts on component mount
  useEffect(() => {
    handleRead();
  }, []);

  const handleCreate = async () => {
    const postData = { title: "New Post", body: "This is the post content." };
    try {
      const newPost = await createPost(postData);
      setPosts([...posts, newPost]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRead = async () => {
    try {
      const postsData = await getPosts();
      setPosts(postsData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (id: string) => {
    const updatedData = { title: "Updated Post", body: "Updated content." };
    try {
      await updatePost(id, updatedData);
      await handleRead(); // Refresh the posts
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-500 text-white text-3xl p-6 text-center">
        Interview!
      </header>
      <main className="p-4">
        <div className="space-y-4">
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          >
            CREATE
          </button>
          <button
            onClick={handleRead}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
          >
            READ
          </button>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded shadow p-4">
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="text-gray-700">{post.body}</p>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => handleUpdate(post.id)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
