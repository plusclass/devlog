import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import styled from "styled-components";

const Wrapper = styled.div`
  .category-text {
    padding: 0.3em 1em;
    display: inline-block;
    display: inline;
    padding: 3px 10px;
    line-height: 1.2;
    font-size: 12px;
    border-radius: 20px;
    border: 1px solid ${props => props.theme.colors.grey};
    color: ${props => props.theme.colors.base};
    background: transparent;
    @media screen and (max-width: ${props => props.theme.responsive.large}) {
      font-size: 11px;
      padding: 2.5px 6px;
    }
  }
`;

const categoryLabel = ({ slug, isLink }) => {
  if (!slug) return null;
  return (
    <StaticQuery
      query={categoryQuery}
      render={data => {
        const { categories } = data.site.siteMetadata;
        const categoryObject = categories.find(cat => {
          return cat.slug === slug;
        });
        const categoryName = categoryObject ? categoryObject.name : slug;
        const categoryColor = categoryObject.color;
        const content = isLink ? (
          <Link
            to={`/category/${slug}`}
            className="category-text"
            style={{color: categoryColor }}
          >
            {categoryName}
          </Link>
        ) : (
          <span
            className="category-text"
            style={{color: categoryColor }}
          >
            {categoryName}
          </span>
        );
        return <Wrapper>{content}</Wrapper>;
      }}
    />
  );
};

const categoryQuery = graphql`
  query categoryQuery {
    site {
      siteMetadata {
        categories {
          name
          slug
          color
        }
      }
    }
  }
`;

export default categoryLabel;
