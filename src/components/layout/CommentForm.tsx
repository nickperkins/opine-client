import React, { useState } from "react";
import { postComment } from "../../services/commentsAPI";
import { IComment } from "../../types/IComment";

interface CommentFormProps {
  onCommentSubmit: (newComment: IComment) => void;
  containerId: string;
}

const CommentForm: React.FC<CommentFormProps> = ({
  containerId,
  onCommentSubmit,
}) => {
  // State to store form data
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const comment: IComment = {
      id: 0, // The API will generate the ID
      author: formData.author,
      body: formData.body,
      createdAt: new Date(), // The API will generate the timestamp
    };
    try {
      const result = await postComment("test-slug", comment); //TODO: getSlug(window.location.pathname)
      if (!result) {
        console.error("Failed to submit comment");
        return;
      }
      onCommentSubmit(result);
      setFormData({});
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
    // Clear the form fields
    setFormData({});
  };

  return (
    <div id={containerId}>
      <form id="opine-form" onSubmit={handleSubmit}>
        <input
          name="author"
          type="text"
          placeholder="Author"
          value={formData.author || ""}
          onChange={handleChange}
          required
        />
        <textarea
          name="body"
          placeholder="Comment"
          value={formData.body || ""}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Submit Comment</button>
      </form>
    </div>
  );
};

export default CommentForm;
