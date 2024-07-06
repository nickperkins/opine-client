// src/api/commentsAPI.ts
import { IComment } from "../types/IComment";

import axios from "axios";

export async function getComments(slug: string): Promise<IComment[]> {
  try {
    const apiURL = process.env.REACT_APP_API_URL || '';
    const response = await axios.get(`${apiURL}/comments/${slug}`);


    return response.data.map((comment: any) => ({
      id: comment.id,
      author: comment.author,
      body: comment.body,
      createdAt: new Date(comment.createdAt),
    }));
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
}
export async function postComment(slug: string, comment: IComment): Promise<IComment | void>  {
  const apiURL = process.env.REACT_APP_API_URL || '';
  const commentData = JSON.stringify(comment);
  try {
    const response = await axios.post(`${apiURL}/comments/${slug}`, commentData);
    return {
      id: response.data.id,
      author: response.data.author,
      body: response.data.body,
      createdAt: new Date(response.data.createdAt),
    };
  } catch (error) {
    console.error("Error posting comment:", error);
  }
}
