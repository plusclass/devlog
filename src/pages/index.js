import React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import PostCard from "../components/PostCard";
import HomeJsonLd from "../components/json/HomeJsonLd";


const IndexWrap = styled.div`
h2 {
  font-size: 20px;
  font-weight: bold;
  margin-top: 24px;
}
`;

const NewFlex = styled.div`
max-width: 750px;
margin: 0 auto;
display: flex;
flex-wrap: wrap;
justify-content: space-between;
`;
class BlogIndex extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const postLatest = data.allMarkdownRemark.edges[0];
    const postsNew = data.allMarkdownRemark.edges.slice(1,6);
    const postsMore = data.allMarkdownRemark.edges.slice(6);
    const { location } = this.props;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="" />
        <Helmet>
          <link rel="canonical" href="https://dev.plus-class.jp/" />
          <meta property="og:image" content={`https://dev.plus-class.jp/images/ogp.png`} />
        </Helmet>
        <HomeJsonLd />
        <IndexWrap>
        <h2>最新</h2>
        <PostCard key={postLatest.node.fields.slug} node={postLatest.node} classProp={`latest`} />
        <h2>新着</h2>
        <NewFlex>
        {postsNew.map(({ node }) => {
          return <PostCard key={node.fields.slug} node={node} classProp={`new`} />;
        })}
        </NewFlex>
        <h2>その他</h2>
        {postsMore.map(({ node }) => {
          return <PostCard key={node.fields.slug} node={node} classProp={`more`} />;
        })}
        </IndexWrap>
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
