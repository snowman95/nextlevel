import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query getPosts {
    posts {
      userId
      id
      title
      body
    }
  }
`;
