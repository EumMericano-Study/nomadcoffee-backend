import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeCategories(keyword: String!, lastId: Int): [Category]
  }
`;
