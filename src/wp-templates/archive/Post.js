import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"

export default ({ pageContext, data }) => (
  <>
    {data.allWpPost.nodes.map((node) => (
      <div key={`${node.uri}+${node.title}`}>
        <Link to={node.uri}>{node.title}</Link>
      </div>
    ))}
    {!pageContext.isFirst && pageContext.previousPagePath ? (
      <Link to={pageContext.previousPagePath}>previous</Link>
    ) : null}
    {!pageContext.isLast && pageContext.nextPagePath ? (
      <Link to={pageContext.nextPagePath}>next</Link>
    ) : null}
  </>
)

export const query = graphql`
  query PostArchive($archiveOffset: Int!, $perPage: Int!) {
    allWpPost(skip: $archiveOffset, limit: $perPage) {
      nodes {
        title
        uri
      }
    }
  }
`
