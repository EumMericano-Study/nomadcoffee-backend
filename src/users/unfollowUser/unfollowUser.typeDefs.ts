import { gql } from "apollo-server-express";

export default gql`
  type UnfollowUserResult {
    ok: Boolean!
    erorr: String
  }
  type Mutation {
    unfollowUser(username: String): UnfollowUserResult!
  }
`;
