import { onError } from 'apollo-link-error';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable()
export class LoginService {

    constructor(private apollo: Apollo) {}

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
                    `,
                    errorPolicy: 'all'
                })
    
         
    }
}