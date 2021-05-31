import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import CategoryLabel from "../components/CategoryLabel";

const PostCardWrapper = styled.div`
  .post-card-link {
    display: flex;
    align-items: start;
    padding: 1.4em 0;
    color: #fff;
    border-top: solid 1px ${props => props.theme.colors.blackLight};
    &:hover {
      background: ${props => props.theme.colors.blackLight};
    }
    @media screen and (max-width: ${props => props.theme.responsive.large}) {
      padding: 1em 0;
    }
  }
`;
const PostCardContent = styled.div`
  width: 340px;
  h3 {
    font-size: 1.5em;
    font-weight: 600;
    line-height: 1.4;
  }
  time {
    display: block;
    margin-bottom: 0.2em;
    letter-spacing: 0.05em;
    font-size: 0.9em;
    color: ${props => props.theme.colors.gray};
  }
  .author{
    display: flex;
    align-items: center;
    img {
      width: 50px;
      border-radius: 50%;
      margin-right: 12px;
    }
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
        <PostCardContent>
        <img src={node.frontmatter.kv} />
          <h3>{title}</h3>
          <div className="author">
            <img src={`/images/${node.frontmatter.author}.jpg`} alt={node.frontmatter.author} />
            <div className="name-date">
              <p>{node.frontmatter.author}</p>
              <time>{node.frontmatter.date}</time>
            </div>
          </div>
          <p className="description">{node.frontmatter.description}</p>
          <CategoryLabel slug={node.frontmatter.category} />
        </PostCardContent>
      </Link>
    </PostCardWrapper>
  );
};

export default PostCard;
