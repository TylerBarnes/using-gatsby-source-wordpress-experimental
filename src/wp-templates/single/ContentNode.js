import React from "react"
import { graphql } from "gatsby"

export default ({ data }) => {
  return <h1>Single ContentNode {data.wpContentNode.uri}</h1>
}

export const query = graphql`
  query ContentNode($id: String!) {
    wpContentNode(id: { eq: $id }) {
      uri
    }
  }
`
