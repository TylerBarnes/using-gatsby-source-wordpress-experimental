import React from "react"
import { graphql, Link, navigate } from "gatsby"
import Img from "gatsby-image"
import ReactPaginate from "react-paginate"

import { Stack, Box, Heading, Text, Grid, Button } from "@chakra-ui/core"

import Layout from "../components/layout"
import { normalizePath } from "../utils/get-url-path"

export default ({ data, pageContext }) => (
  <Layout>
    <Stack spacing={5}>
      {data.allWpPost.nodes.map((page) => (
        <Box key={page.link}>
          <Link to={normalizePath(page.uri)}>
            <Box p={5} shadow="md" borderWidth="1px">
              <Grid templateColumns="1fr 2fr" gap={6}>
                <Box>
                  {!!page?.featuredImage?.node?.remoteFile?.childImageSharp && (
                    <Img
                      fluid={
                        page.featuredImage.node.remoteFile.childImageSharp.fluid
                      }
                    />
                  )}
                </Box>
                <Box>
                  <Heading as="h2" size="md">
                    {page.title}
                  </Heading>
                  {!!page.author && !!page.author.name && (
                    <Heading as="h3" size="sm">
                      Author: {page.author.name}
                    </Heading>
                  )}

                  <Box>
                    <Text dangerouslySetInnerHTML={{ __html: page.excerpt }} />
                  </Box>
                </Box>
              </Grid>
            </Box>
          </Link>
        </Box>
      ))}
    </Stack>

    {pageContext && pageContext.totalPages > 1 && (
      <Box mt={10}>
        <ReactPaginate
          previousLabel={
            pageContext?.page !== 1 && <Button>Previous page</Button>
          }
          nextLabel={
            pageContext?.totalPages !== pageContext.page && (
              <Button>Next page</Button>
            )
          }
          onPageChange={({ selected }) => {
            const page = selected + 1
            const path = page === 1 ? `/blog/` : `/blog/${page}/`
            navigate(path)
          }}
          disableInitialCallback
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageContext.totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
          initialPage={pageContext.page - 1}
        />
      </Box>
    )}
  </Layout>
)

export const query = graphql`
  fragment Thumbnail on File {
    childImageSharp {
      fluid(maxWidth: 500) {
        ...GatsbyImageSharpFluid_tracedSVG
      }
    }
  }

  query HomePage($offset: Int!, $perPage: Int!) {
    allWpPost(
      limit: $perPage
      skip: $offset
      filter: { nodeType: { in: ["Post", "Page", "Alot"] } }
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        uri
        title
        featuredImage {
          node {
            remoteFile {
              ...Thumbnail
            }
          }
        }
      }
    }
  }
`
