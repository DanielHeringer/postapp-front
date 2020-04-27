import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';


const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('jwt');
  const header =  {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : "",
    }
  }
  return header
});

const uri = 'http://localhost:3000/graphql'
export function createApollo(httpLink: HttpLink) {
  return {
    link: authLink.concat(httpLink.create({uri})),
    cache: new InMemoryCache(),
  };
}


@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
