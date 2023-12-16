"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

function CreatePrompt() {
  const [subbmiting, setSubbmiting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const createPrompt = async (e) => {};

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
