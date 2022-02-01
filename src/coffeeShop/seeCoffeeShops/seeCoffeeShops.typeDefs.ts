import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeCoffeeShops(keyword: String!, lastId: Int): [CoffeeShop]
  }
`;
