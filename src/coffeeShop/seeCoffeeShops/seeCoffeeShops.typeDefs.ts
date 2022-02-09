import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeCoffeeShops(lastId: Int): [CoffeeShop]
  }
`;
