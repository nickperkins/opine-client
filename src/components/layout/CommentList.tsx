import React, { useState, useCallback } from "react";
import { Comment } from "../../types/Comment";
import Pagination from "./Pagination";

interface CommentListProps {
  containerId: string;
  pageSize: number;
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({
  containerId,
  pageSize,
  comments,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  // slice comments based on the current page
  const getPaginatedComments = useCallback(() => {
    return comments.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  }, [comments, currentPage, pageSize]);

  // handle page change
  const goToPage = async (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div id={containerId}>
      <div>
        {comments.length === 0 && <div>Be the first to comment.</div>}
        {getPaginatedComments().map((comment) => (
          <div id={"comment-" + comment.id} key={comment.id}>
            <strong>{comment.author}</strong> - {comment.body}
          </div>
        ))}
      </div>
      <Pagination
        totalPages={Math.ceil(comments.length / pageSize)}
        currentPage={currentPage}
        onPageChange={goToPage}
      />
    </div>
  );
};

export default CommentList;
