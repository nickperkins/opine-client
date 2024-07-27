// src/api/commentsAPI.ts
import { AppConfig } from "../config";
import { Comment } from "../types/Comment";
import axios from "axios";

export class CommentsAPI {
  private appConfig: AppConfig;

  constructor(appConfig: AppConfig) {
    this.appConfig = appConfig;
  }

  public async getComments(slug: string): Promise<Comment[]> {
    try {
      const apiURL = this.appConfig.apiUrl;
      const response = await axios.get(`${apiURL}/comments/${slug}`);

      return response.data.map((comment: Comment) => ({
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

  public async postComment(
    slug: string,
    comment: Omit<Comment, "id" | "createdAt">
  ): Promise<Comment | void> {
    const apiURL = this.appConfig.apiUrl;
    const commentData = JSON.stringify(comment);
    try {
      const response = await axios.post(
        `${apiURL}/comments/${slug}`,
        commentData
      );
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
}
