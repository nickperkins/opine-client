import React, { useState, useEffect, useContext } from "react";
import { AppConfigContext } from "../../config";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { getComments } from "../../services/commentsAPI";
import { IComment } from "../../types/IComment";

function Comments() {
  const [comments, setComments] = useState<IComment[]>([]);

  // load comments from the API
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getComments("test-slug"); //TODO: getSlug(window.location.pathname)
        setComments(response);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    };
    fetchComments();
  }, []);

  const addComment = (newComment: IComment) => {
    setComments([...comments, newComment]);
  };

  return (
    <>
      <AppConfigContext.Provider
        value={{ apiUrl: "http://localhost:3001", featureFlag: true }}
      >
        <CommentForm containerId="comment-form" onCommentSubmit={addComment} />
        <CommentList containerId="comments" pageSize={5} comments={comments} />
      </AppConfigContext.Provider>
    </>
  );
}

export default Comments;
