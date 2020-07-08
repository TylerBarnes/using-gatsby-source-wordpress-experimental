import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"

export default ({ pageContext, data }) => (
  <>
    {data.allWpPost.nodes.map((node) => (
      <div>
        <Link to={node.uri}>{node.title}</Link>
      </div>
    ))}
    {!pageContext.isFirst ? (
      <Link to={pageContext.previousPagePath}>previous</Link>
    ) : null}
    {!pageContext.isLast ? (
      <Link to={pageContext.nextPagePath}>next</Link>
    ) : null}
  </>
)

export const query = graphql`
  query PostArchive($offset: Int!, $perPage: Int!) {
    allWpPost(skip: $offset, limit: $perPage) {
      nodes {
        title
        uri
      }
    }
  }
`
