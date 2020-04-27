import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


@Injectable({
  providedIn: 'root'
})
export class HomeService {


  constructor(private apollo: Apollo) { }

  getAllPosts(page) {
    return this.apollo
                .query({
                    fetchPolicy: "network-only",
                    query: gql`
                    {
                      posts{ 
                        _id
                        text
                        created
                        upvotes {
                          _id
                          username
                        }
                        creator{
                          _id
                          username
                        }
                        comments{
                          _id
                          text
                          created
                          upvotes{
                            _id
                            username
                          }
                          creator{
                            _id
                            username
                          }
                        }
                      }
                    }
                    `
                })
    
  }
  
  upvotePost(postID: string) {
    return this.apollo
                .mutate({
                    mutation: gql`
                    mutation {
                      upvotePost(id: "${postID}") { 
                          upvotes {
                            _id
                            username
                          }
                      }
                    }
                    `,
                    errorPolicy: 'all'
                })
  }

  upvoteComment(commentID: string) {
    return this.apollo
                .mutate({
                    mutation: gql`
                    mutation {
                      upvoteComment(id: "${commentID}") { 
                          upvotes {
                            _id
                            username
                          }
                      }
                    }
                    `,
                    errorPolicy: 'all'
                })
    
    
  }

  createComment(postID: string, comment: string) {
    return this.apollo
                .mutate({
                    mutation: gql`
                    mutation{
                      createComment(text: "${comment}", post:"${postID}"){
                        _id
                        text
                        created
                      }
                    }
                    `,
                    errorPolicy: 'all'
                })
  }
}
