require("dotenv").config({
  path: `.env.GATSBY_CONCURRENT_DOWNLOAD`,
})

// require .env.development or .env.production
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  pathPrefix: process.env.PATH_PREFIX,
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: require.resolve(`../gatsby-plugin-wordpress/package.json`),
      options: {
        url:
          process.env.WPGRAPHQL_URL ||
          `https://dev-gatsby-source-wordpress-v4.pantheonsite.io/graphql`,
        verbose: true,
        develop: {
          // this will hard cache images outside of Gatsbys cache in development
          // that means you wont have to ever download images twice if the
          // cache is cleared
          hardCacheMediaFiles: true,
        },
        debug: {
          graphql: {
            // writes internal data sourcing gql queries to
            // ./WordPress/GraphQL (helpful for debugging)
            writeQueriesToDisk: true,
          },
        },
        type: {
          __all: {
            limit: 10,
          },
          Post: {
            routes: {
              archivePathBase: `blog`,
              perPage: 2,
              archive: true,
            },
            limit: process.env.NODE_ENV === `development` ? 50 : 5000,
          },
          User: {
            routes: {
              single: true,
              archive: true,
            },
          },
          MediaItem: {
            routes: {
              archive: true,
            },
          },
        },
      },
    },
    `gatsby-plugin-chakra-ui`,
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.inline\.svg$/, // See below to configure properly
        },
      },
    },
  ],
}
