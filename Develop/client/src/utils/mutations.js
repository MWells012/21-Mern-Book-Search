// copied over from inclass assgnmnt 24

import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook ($bookData: BookInput!) {
    saveBook (bookdata: $bookData) { 
        _id
        username
        email
        savedBooks {
            bookID
            authors
            image
            description
            title
            link
        }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookID: ID!) {
    removeBook(bookID: $bookID) {
        _id
        username
        email
        savedBooks {
            bookID
            authors
            image
            description
            title
            link
        }
    }
  }
`;
