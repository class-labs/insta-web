import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      photo
      caption
      likeCount
      commentCount
      isLikedByViewer
      author {
        id
        name
        profilePhoto
      }
      createdAt
    }
  }
`;

export const GET_POST = gql`
  query GetPost($postId: String!) {
    post(id: $postId) {
      id
      photo
      caption
      isLikedByViewer
      likeCount
      author {
        id
        name
        profilePhoto
      }
      comments {
        id
        text
        author {
          id
          name
          profilePhoto
        }
        createdAt
      }
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($postId: String!, $text: String!) {
    createComment(input: { postId: $postId, text: $text }) {
      id
      text
      createdAt
    }
  }
`;

export const LIKE_POST = gql`
  mutation LikePost($postId: String!) {
    likePost(postId: $postId) {
      id
      likeCount
      isLikedByViewer
    }
  }
`;
