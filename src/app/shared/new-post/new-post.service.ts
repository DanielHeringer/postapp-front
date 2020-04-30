import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class NewPostService {

  constructor(private apollo: Apollo) {}

  createPost(text: string) {
    return this.apollo
                .mutate({
                    mutation: gql`
                    mutation {
                      createPost(text:"""${text}""") {	
                        _id
                        text
                        created
                        creator{
                          _id
                          username
                        }
                        upvotes{
                          _id
                          username
                        }
                        comments{
                          _id
                          text
                          created
                          creator{
                            _id
                            username
                          }
                          upvotes{
                            _id
                            username
                          }
                        }
                      }
                    }
                    `,
                    errorPolicy: 'all'
                })
  }
}
