import React from "react"
import { graphql } from "gatsby"

export default ({ data }) => {
  return <h1>{data.wpUser.name}</h1>
}

export const query = graphql`
  query USER_QUERY($id: String!) {
    wpUser(id: { eq: $id }) {
      name
    }
  }
`
