import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import CategoryLabel from "../components/CategoryLabel";
import Image from "gatsby-image";

const PostCardWrapper = styled.div`
  .post-card-link {
    max-width: 750px;
    margin: 1.2em auto;
    padding: 1.2em;
    display: flex;
    align-items: start;
    color: ${props => props.theme.colors.base};
    border-radius: 8px;
    border: 8px solid ${props => props.theme.colors.bgLight};
    .post-image {
      img {
        transition: ease .3s !important;
      }
    }
    &:hover {
      box-shadow: 0 0 4px rgba(0,0,0,.1);
      .post-image {
        img {
          transform: scale(1.05);
        }
      }
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
    gap: 2em;
    @media screen and (max-width: ${props => props.theme.responsive.small}) {
      flex-direction: column;
      padding: 0;
    }
    .post-image {
      width: 320px;
      box-shadow: none;
      position: relative;
      border-radius: 8px;
      flex-shrink: 0;
      &::before {
        content: "";
        width: 80px;
        height: 4px;
        background: ${props => props.theme.colors.bgLight};
        position: absolute;
        bottom: 8px;
        left: 8px;
        z-index: 2;
        border-radius: 4px;
      }
      @media screen and (max-width: ${props => props.theme.responsive.small}) {
        width: 100%;
      }
    }
  }
  &.latest {
    .post-card-link {
      color: ${props => props.theme.colors.bgLight};
      border: 8px solid #000;
      background: ${props => props.theme.colors.base};
    }
    .post-image {
      &::before {
        background: #000;
      }
    }
  }
  &.new:first-child {
    width: 100%;
    margin: 0;
    .post-card-link {
      width: 100%;
      margin: 1.2em auto 0.5em;
    }
  }
  &.new:not(:first-child) {
    width: 370px;
    .post-card-link {
        margin: 0.5em 0;
        .content {
          flex-direction: column;
          padding: 0;
      }
      .text {
        width: 100%;
      }
      h3 {
        font-size: 1.2em;
        height: 2em;
      }
      .description {
        height: 4em;
      }
    }
  }
  &.more {
    &:last-child {
      margin-bottom: 2em;
    }
    .post-card-link {
      border: 8px solid #000;
      background: transparent;
      border: 0;
      border-bottom: 2px solid ${props => props.theme.colors.bgLight};
      border-radius: 0;
      padding: 1em;
      margin: 0;
      @media screen and (max-width: ${props => props.theme.responsive.small}) {
        padding: 1em 0;
      }
      &:hover {
        box-shadow: none;
      }
      .content {
        align-items: center;
        @media screen and (max-width: ${props => props.theme.responsive.small}) {
          flex-direction: row;
        }
      }
      .post-image {
        width: 120px;
        &::before {
          background: none;
        }
      }
      .text{
        width: calc(100% - 32px);
        display: flex;
        justify-content: space-between;
        padding: 0;
        margin: 0;
        @media screen and (max-width: ${props => props.theme.responsive.small}) {
          flex-direction: column;
        }
      }
        h3 {
    font-size: 1.1em;
    line-height: 1.4;
    margin-bottom: 0;
    @media screen and (max-width: ${props => props.theme.responsive.small}) {
      font-size: 0.9em;
      margin-bottom: 10px;
    }
  }
  .author {
    font-size: 0.8em;
    @media screen and (max-width: ${props => props.theme.responsive.small}) {
      font-size: 0.5em;
    }
    img {
      width: 30px;
      @media screen and (max-width: ${props => props.theme.responsive.small}) {
        width: 20px;
      }
    }
  }
  .description,
  .category {
    display: none;
  }
    }
  }
`;
const PostCardContent = styled.div`
.text {
  width: 350px;
  padding-top: 12px;
  @media screen and (max-width: ${props => props.theme.responsive.small}) {
    width: 100%;
  }
}
  h3 {
    font-size: 2em;
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
      font-size: 20px;
      margin-bottom: 12px;
    }
    time {
      font-size: 12px;
    }
    .description {
      margin: 12px auto;
    }
  }
`;

const PostCard = ({ node, classProp }) => {
  const title = node.frontmatter.title || node.fields.slug;

  return (
    <PostCardWrapper className={classProp}>
      <Link to={node.fields.slug} className="post-card-link" onTouchStart="">
        <PostCardContent className="content">
          <Image
            className="post-image"
            fluid={node.frontmatter.ogp.childImageSharp.fluid}
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
            <div className="category">
              {node.frontmatter.category.map((category) => {
                return (
                  <CategoryLabel slug={category} />
                )
              })}
            </div>
          </div>
        </PostCardContent>
      </Link>
    </PostCardWrapper>
  );
};

export default PostCard;
