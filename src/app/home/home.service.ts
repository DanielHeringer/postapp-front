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
}
