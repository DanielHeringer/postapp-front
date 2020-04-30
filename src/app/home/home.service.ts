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
                      posts(page: ${page}){
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

  getPostByID(id) {
    return this.apollo
                .query({
                    fetchPolicy: "network-only",
                    query: gql`
                    {
                      postByID(id: "${id}"){
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

  getPostsByUsername(username:string, page: number) {
    return this.apollo
                .query({
                    fetchPolicy: "network-only",
                    query: gql`
                    {
                      postsByUser(username: "${username}", page: ${page}){
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
                        creator {
                          _id
                          username
                        }
                        upvotes{
                          _id
                          username
                        }
                      }
                    }
                    `,
                    errorPolicy: 'all'
                })
  }

  updatePost(text: string, postID: string) {
    return this.apollo
                .mutate({
                    mutation: gql`
                    mutation {
                      updatePost(text: """${text}""", id:"${postID}") {
                        _id
                        text
                        creator{
                          _id
                          username
                        }
                      }
                    }
                    `,
                    errorPolicy: 'all'
                })
  }
  deletePost(postID: string) {
    return this.apollo
                .mutate({
                    mutation: gql`
                    mutation {
                      removePost(id:"${postID}")
                    }
                    `,
                    errorPolicy: 'all'
                })
  }

}
