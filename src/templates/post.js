import React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Image from "gatsby-image";

import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Bio from "../components/Bio";
import CategoryLabel from "../components/CategoryLabel";
import PostJsonLd from "../components/json/PostJsonLd";
import ShareButtons from "../components/ShareButtons";

import postSyntaxHighlightStyle from "../styles/postSyntaxHighlight";
import postContentStyle from "../styles/postContent";
import postCustomBlockStyle from "../styles/postCustomBlock";

const Content = styled.section`
  position: relative;
  background: #fff;
  overflow: hidden;
  font-size: 16px;
  @media screen and (max-width: ${(props) => props.theme.responsive.small}) {
    margin: 0 -${(props) => props.theme.sideSpace.small};
  }
`;

const ContentMain = styled.div`
  padding: 1.8em ${(props) => props.theme.sideSpace.contentLarge};
  @media screen and (max-width: ${(props) => props.theme.responsive.small}) {
    padding: 30px ${(props) => props.theme.sideSpace.contentSmall};
  }
  .author {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 8px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    p {
      font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
      margin-left: 12px;
      color: ${(props) => props.theme.colors.grey};
    }
  }
  .hero {
    margin-bottom: 1.8em;
  }
`;

const PostTitle = styled.h1`
  margin: 0.1em 0 0.3em;
  font-size: 1.8em;
  @media screen and (max-width: ${(props) => props.theme.responsive.small}) {
    font-size: 25px;
  }
  font-weight: 600;
  line-height: 1.5;
`;

const PostDate = styled.time`
  display: block;
  color: ${(props) => props.theme.colors.grey};
  font-size: 0.9em;
  letter-spacing: 0.05em;
  font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
  margin-top: 12px;
`;

const PostContent = styled.div`
  ${postSyntaxHighlightStyle}
  ${postContentStyle}
  ${postCustomBlockStyle}
`;

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = this.props.data.site.siteMetadata.title;
    const { title, description, date, category, author, hero } = post.frontmatter;
    const { slug } = this.props.pageContext;
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={title} description={description || post.excerpt} />
        <Helmet>
          <link
            rel="canonical"
            href={`https://dev.plus-class${this.props.location.pathname}`}
          />
        </Helmet>
        <PostJsonLd
          title={title}
          description={description || post.excerpt}
          date={date}
          url={this.props.location.href}
          categorySlug={category}
        />
        <Content>
          <ContentMain>
            <div className="hero"><Image
              className="hero-image"
              fluid={hero.childImageSharp.fluid}
            /></div>
            <PostTitle>{title}</PostTitle>
            <CategoryLabel slug={category} isLink="true" />
            <PostDate>{date}</PostDate>
            <div className="author">
              <img src={`/images/${author}.jpg`} alt={author} />
              <p>@{author}</p>
            </div>
            <PostContent dangerouslySetInnerHTML={{ __html: post.html }} />
            <aside>
            <ShareButtons slug={slug} title={title} />
            <Bio author={author} />
          </aside>
          </ContentMain>
        </Content>
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        description
        date(formatString: "YYYY.MM.DD")
        author
        category
        hero {
          childImageSharp {
            fluid(maxWidth: 1280) {
              ...GatsbyImageSharpFluid
            }
          }
        }
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
`;
