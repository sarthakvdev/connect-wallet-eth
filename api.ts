import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const API_URL = "https://api.lens.dev";

// API client
export const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
});

// define a graphql query
export const exploreProfiles = gql`
  query ExploreProfile {
    exploreProfiles(request: { sortCriteria: MOST_FOLLOWERS }) {
      items {
        id
        name
        bio
        handle
        picture {
          ... on MediaSet {
            original {
              url
            }
          }
        }
        stats {
          totalFollowers
        }
      }
    }
  }
`;
