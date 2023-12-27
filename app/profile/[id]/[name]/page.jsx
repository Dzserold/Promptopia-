"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Profile from "@components/Profile";
import { data } from "autoprefixer";

const MyProfile = (id) => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${id.params.id}/posts`);
      const data = await response.json();
      setPosts(data);
      console.log(data);
      setUsername(data[0].creator.username);
    };
    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  return (
    <Profile
      name={username}
      desc={`Wellcome to ${username}'s personalized profile page`}
      data={posts}
    />
  );
};

export default MyProfile;
