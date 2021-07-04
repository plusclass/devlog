import React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";

import Layout from "../components/Layout";
import SEO from "../components/SEO";
import PostCard from "../components/PostCard";
import HomeJsonLd from "../components/json/HomeJsonLd";

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const posts = data.allMarkdownRemark.edges;
    const { location } = this.props;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="" />
        <Helmet>
          <link rel="canonical" href="https://dev.plus-class.jp/" />
          <meta property="og:image" content={`https://dev.plus-class.jp/images/ogp.png`} />
        </Helmet>
        <HomeJsonLd />
        {posts.map(({ node }) => {
          return <PostCard key={node.fields.slug} node={node} />;
        })}
      </Layout>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY/MM/DD")
            title
            author
            description
            category
            category2
            category3
            ogp {
              childImageSharp {
                fluid(maxWidth: 1280) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
