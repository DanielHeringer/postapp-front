import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable()
export class LoginService {

    constructor(private apollo: Apollo) {}

    res

    auth(username: string, password: string) {
        return this.apollo
                .mutate({
                    mutation: gql`
                    mutation {
                        login(username: "${username}", password: "${password}") {
                            _id
                            username
                            token
                        }
                    }
                    `
                })
    
         
    }
}