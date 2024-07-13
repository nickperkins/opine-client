import React, { useState } from "react";
import useComments from "../../hooks/useComments";

interface CommentFormProps {
  containerId: string;
}

const CommentForm: React.FC<CommentFormProps> = ({
  containerId
}) => {
  // State to store form data
  const { addComment } = useComments(containerId);
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
    await addComment({
      author: formData.author,
      body: formData.body,
    });
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
