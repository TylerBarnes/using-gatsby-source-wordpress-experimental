import React from "react"
import { graphql, Link, navigate } from "gatsby"
import Img from "gatsby-image"
import ReactPaginate from "react-paginate"

import { Stack, Box, Heading, Text, Grid, Button } from "@chakra-ui/core"

import Layout from "../../components/layout"

export default (props) => {
  const { data, errors, pageContext, location } = props

  if (errors) {
    return (
      <>
        <Heading>
          Page query for route "{location.pathname}" returned errors
        </Heading>
        <Text>The template for this page is at "{__filename}"</Text>
        <pre>{JSON.stringify(errors, null, 2)}</pre>
      </>
    )
  }

  return (
    <Layout>
      {data?.wpContentNode?.title && (
        <Heading>{data.wpContentNode.title}</Heading>
      )}

      <Stack spacing={5}>
        {data?.allWpContentNode?.nodes?.map((page) => (
          <Box key={page.id}>
            <Link to={page.uri}>
              <Box p={5} shadow="md" borderWidth="1px">
                <Grid templateColumns="1fr 2fr" gap={6}>
                  <Box>
                    {!!page?.featuredImage?.node?.remoteFile
                      ?.childImageSharp && (
                      <Img
                        fluid={
                          page.featuredImage.node.remoteFile.childImageSharp
                            .fluid
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
                      <Text
                        dangerouslySetInnerHTML={{ __html: page.excerpt }}
                      />
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
}

export const query = graphql`
  fragment Thumbnail on File {
    childImageSharp {
      fluid(maxWidth: 500) {
        ...GatsbyImageSharpFluid_tracedSVG
      }
    }
  }

  query DefaultArchive(
    $archiveNodeIds: [String]!
    $sortOrder: [SortOrderEnum]!
    $sortFields: [WpContentNodeFieldsEnum]!
    $id: String
  ) {
    wpContentNode(id: { eq: $id }) {
      ... on WpNodeWithTitle {
        title
      }
    }
    allWpContentNode(
      filter: { id: { in: $archiveNodeIds } }
      sort: { order: $sortOrder, fields: $sortFields }
    ) {
      nodes {
        id
        uri
        ... on WpNodeWithTitle {
          title
        }
        ... on WpNodeWithFeaturedImage {
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
  }
`
