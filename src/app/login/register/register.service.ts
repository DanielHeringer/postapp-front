import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private apollo: Apollo) { }

  newUser(username: string, password: string) {
    return this.apollo
                .mutate({
                    mutation: gql`
                    mutation {
                      createUser(username:"${username}", password:"${password}") {
                        _id
                        username
                        token
                      }
                    }
                    `,
                    errorPolicy: 'all'
                })
    
  }
}
