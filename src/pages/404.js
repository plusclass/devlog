import React from "react";
import { graphql, Link } from "gatsby";
import styled from "styled-components";

import Layout from "../components/Layout";
import SEO from "../components/SEO";

const Wrapper = styled.div`
  color: #fff;
  text-align: center;
  font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
  @media screen and (max-width: ${props => props.theme.responsive.small}) {
    margin-top: 2em;
  }
`;

const Title = styled.div`
  font-size: 40px;
  color: black;
  margin-top: 1.4em;
`;

const StyledLink = styled(Link)`
  margin-top: 0.7em;
  display: inline-block;
  padding: 0.3em 1em;
  background: #fff;
  font-size: 20px;
  border-radius: 4px;
  text-decoration: underline;
`;

class NotFoundPage extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Wrapper>
          <SEO title="ページが見つかりません" />
          <Title>404 Not Found</Title>
          <StyledLink to={`/`} className="cat-item__link">
            BackToTop();
          </StyledLink>
        </Wrapper>
      </Layout>
    );
  }
}

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
