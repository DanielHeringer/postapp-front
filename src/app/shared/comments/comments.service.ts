import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


@Injectable({
  providedIn: 'root'
})
export class CommentsService {


  constructor(private apollo: Apollo) { }

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

  updateComment(text: string, commentID: string) {
    return this.apollo
                .mutate({
                    mutation: gql`
                    mutation {
                      updateComment(text: """${text}""", comment:"${commentID}") {
                        _id
                      }
                    }
                    `,
                    errorPolicy: 'all'
                })
  }

  deleteComment(commentID: string) {
    return this.apollo
                .mutate({
                    mutation: gql`
                    mutation {
                      removeComment(id:"${commentID}")
                    }
                    `,
                    errorPolicy: 'all'
                })
  }
}
