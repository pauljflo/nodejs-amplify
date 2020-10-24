/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getQuote = /* GraphQL */ `
  query GetQuote($id: ID!) {
    getQuote(id: $id) {
      id
      quote
      createdAt
      updatedAt
    }
  }
`;
export const listQuotes = /* GraphQL */ `
  query ListQuotes(
    $filter: ModelQuoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        quote
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
