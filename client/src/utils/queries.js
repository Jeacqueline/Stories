import {gql} from'@apollo/client';

export const QUERY_ME=gql`
query Query {
    getSingleUser{
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
