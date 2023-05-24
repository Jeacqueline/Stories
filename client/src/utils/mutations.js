import {gql} from '@apollo/client';

export const LOGIN_USER = gql`
mutation Mutation($email: String!, $password: String!){
    login(email:$email,password:$password){
        token
        user{
            email
            username
        }
    }
}`;

export const ADD_USER = gql`
mutation Mutation($username:String!, $email:String!,$password:String!){
    addUser(username: $username, email:$email, password:$password){
        token
        user{
            email
            username
        }
    }
}`;

export const SAVE_BOOK = gql`
mutation SaveBook($bookData: BookInput!){
    saveBook(bookData:$bookData){
        username
        email
        savedBooks{
            bookId
            authors
            title
            description
            image
            link
        }
    }
}`;



export const REMOVE_BOOK =gql`
mutation RemoveBook($bookId:String) {
    removeBook(bookId:$bookId){
        username
        email
        savedBooks{
            bookId
            authors
            title
            description
            image
            link
        }
    }
}`;
