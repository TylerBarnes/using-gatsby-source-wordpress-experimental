import React from "react"
import { graphql } from "gatsby"
import BlogPost from "../../components/template-parts/blog-post"

export default ({ data }) => <BlogPost data={data} />

export const query = graphql`
  query page(
    $id: String!
    $nextSinglePageId: String
    $previousSinglePageId: String
  ) {
    page: wpPage(id: { eq: $id }) {
      title
      content
      featuredImage {
        node {
          remoteFile {
            ...HeroImage
          }
        }
      }
    }

    nextPage: wpPage(id: { eq: $nextSinglePageId }) {
      title
      uri
    }

    previousPage: wpPage(id: { eq: $previousSinglePageId }) {
      title
      uri
    }
  }
`
