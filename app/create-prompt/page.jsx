"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

function CreatePrompt() {
  const router = useRouter();
  const { data: session } = useSession();

  const [subbmiting, setSubbmiting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubbmiting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubbmiting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      subbmiting={subbmiting}
      handleSubbmit={createPrompt}
    ></Form>
  );
}

export default CreatePrompt;
