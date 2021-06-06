import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import CategoryLabel from "../components/CategoryLabel";
import Image from "gatsby-image";

const PostCardWrapper = styled.div`
  .post-card-link {
    max-width: 720px;
    margin: 2.4em auto;
    display: flex;
    align-items: start;
    color: ${props => props.theme.colors.base};
    &:hover {
      background: ${props => props.theme.colors.bgLight};
    }
    @media screen and (max-width: ${props => props.theme.responsive.large}) {
      margin: 1em 0;
    }
  }
  .content {
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .post-image {
      width: 350px;
      box-shadow: none;
    }
  }
`;
const PostCardContent = styled.div`
.text {
  width: 324px;
  padding-top: 12px;
  padding-right: 24px;
}
  h3 {
    font-size: 1.5em;
    font-weight: 600;
    line-height: 1.4;
    margin-bottom: 24px;
  }
  time {
    display: block;
    margin-bottom: 0.2em;
    letter-spacing: 0.05em;
    font-size: 0.9em;
    color: ${props => props.theme.colors.grey};
    font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
  }
  .author{
    display: flex;
    align-items: center;
    font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
    img {
      width: 50px;
      border-radius: 50%;
      border: 1px solid ${props => props.theme.colors.grey};
      margin-right: 12px;
    }
  }
  .description {
    margin: 24px auto;
  }
  @media screen and (max-width: ${props => props.theme.responsive.large}) {
    width: calc(100% - 70px);
    padding-left: 15px;
    h3 {
      font-size: 16.5px;
    }
    time {
      font-size: 12px;
    }
  }
`;

const PostCard = ({ node }) => {
  const title = node.frontmatter.title || node.fields.slug;

  return (
    <PostCardWrapper>
      <Link to={node.fields.slug} className="post-card-link">
        <PostCardContent className="content">
          <Image
            className="post-image"
            fluid={node.frontmatter.hero.childImageSharp.fluid}
          />
        <div className="text">
          <h3>{title}</h3>
          <div className="author">
            <img src={`/images/${node.frontmatter.author}.jpg`} alt={node.frontmatter.author} />
            <div className="name-date">
              <p>@{node.frontmatter.author}</p>
              <time>{node.frontmatter.date}</time>
            </div>
          </div>
          <p className="description">{node.frontmatter.description}</p>
          <CategoryLabel slug={node.frontmatter.category} />
          </div>
        </PostCardContent>
      </Link>
    </PostCardWrapper>
  );
};

export default PostCard;
