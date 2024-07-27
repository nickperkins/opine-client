import useComments from "../../hooks/useComments";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

function Comments() {
  const { comments, isLoading, error, addComment } = useComments("test-slug");
  if (isLoading) return <div>Loading comments...</div>;
  if (error) return <div>Error loading comments: {error}</div>;

  return (
    <>
      <CommentForm containerId="comment-form" newCommentHandler={addComment} />
      <CommentList containerId="comments" pageSize={5} comments={comments} />
    </>
  );
}

export default Comments;
