import React, { useState } from "react";
import styled from "styled-components";

interface CommentFormProps {
  containerId: string;
  newCommentHandler: (comment: {
    author: string;
    body: string;
  }) => Promise<void>;
}

const Container = styled.div`
  padding: 20px;
  margin-top: 20px;
  border: 1px solid #ccc;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
`;

const CommentForm: React.FC<CommentFormProps> = ({
  containerId,
  newCommentHandler,
}) => {
  // State to store form data
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await newCommentHandler({
      author: formData.author,
      body: formData.body,
    });
    setFormData({});
  };

  return (
    <Container id={containerId}>
      <Form id="opine-form" onSubmit={handleSubmit}>
        <Input
          name="author"
          type="text"
          placeholder="Author"
          value={formData.author || ""}
          onChange={handleChange}
          required
        />
        <Textarea
          name="body"
          placeholder="Comment"
          value={formData.body || ""}
          onChange={handleChange}
          required
        ></Textarea>
        <Button type="submit">Submit Comment</Button>
      </Form>
    </Container>
  );
};

export default CommentForm;
