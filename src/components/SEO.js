import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { StaticQuery, graphql } from "gatsby";

const SEO = ({ description, lang, meta, title }) => {
  return (
    <StaticQuery
      query={detailsQuery}
      render={(data) => {
        const metaDescription =
          description || data.site.siteMetadata.description;
        const defaultTitle = "devlog";
        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            defaultTitle={defaultTitle}
            title={title}
            titleTemplate={`%s | ${data.site.siteMetadata.title}`}
            meta={[
              {
                name: `description`,
                content: metaDescription,
              },
              {
                property: `og:title`,
                content: title || defaultTitle,
              },
              {
                property: `og:description`,
                content: metaDescription,
              },
              {
                property: `og:type`,
                content: `article`,
              },
              {
                name: `twitter:card`,
                content: `summary`,
              },
              {
                name: `twitter:creator`,
                content: data.site.siteMetadata.author,
              },
              {
                name: `twitter:title`,
                content: title || defaultTitle,
              },
              {
                name: `twitter:description`,
                content: metaDescription,
              },
              {
                name: `google-site-verification`,
                content: `_-TIzwWpYqJ70xn_fhc_PDBn8pRSUgHJmvcby5PP7R8`,
              },
            ].concat(meta)}
          />
        );
      }}
    />
  );
};

SEO.defaultProps = {
  lang: `ja`,
  meta: [],
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  title: PropTypes.string.isRequired,
};

export default SEO;

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        siteUrl
        description
        author
      }
    }
  }
`;
