import { useState, useEffect, useCallback, useContext, useMemo } from "react";
import { Comment } from "../types/Comment";
import { CommentsAPI } from "../services/CommentsAPI";
import { AppConfigContext } from "../index";

const useComments = (slug: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const appConfig = useContext(AppConfigContext);

  const commentsAPI = useMemo(() => new CommentsAPI(appConfig), [appConfig]);

  // Fetch comments
  const loadComments = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedComments = await commentsAPI.getComments(slug);
      setComments(fetchedComments);
      setIsLoading(false);
    } catch (err) {
      setError("Failed to load comments");
      setIsLoading(false);
    }
  }, [slug, commentsAPI]);

  // Post a comment
  const addComment = async (newComment: Omit<Comment, "id" | "createdAt">) => {
    setIsLoading(true);
    try {
      const postedComment = await commentsAPI.postComment(slug, newComment);
      setComments((prevComments) =>
        postedComment ? [postedComment, ...prevComments] : prevComments
      );
      setIsLoading(false);
    } catch (err) {
      setError("Failed to post comment");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  return { comments, isLoading, error, addComment };
};

export default useComments;
