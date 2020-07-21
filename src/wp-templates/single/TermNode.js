import React from "react"
import { graphql } from "gatsby"

export default ({ data }) => {
  return <h1>{data.wpTermNode.uri}</h1>
}

export const query = graphql`
  query TermNode($id: String!) {
    wpTermNode(id: { eq: $id }) {
      uri
    }
  }
`
