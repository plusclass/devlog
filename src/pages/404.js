import React from "react";
import { graphql, Link } from "gatsby";
import styled from "styled-components";

import Layout from "../components/Layout";
import SEO from "../components/SEO";

const Wrapper = styled.div`
  color: #fff;
  text-align: center;
  @media screen and (max-width: ${props => props.theme.responsive.small}) {
    margin-top: 2em;
  }
`;

const Title = styled.div`
  font-size: 55px;
  font-weight: 600;
  color: #fff;
`;

const StyledLink = styled(Link)`
  margin-top: 0.7em;
  display: inline-block;
  padding: 0.3em 1em;
  background: #fff;
  font-size: 20px;
  font-weight: 600;
  border-radius: 4px;
`;

class NotFoundPage extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Wrapper>
          <SEO title="ページが見つかりません" />
          <Title>Not Found</Title>
          <StyledLink to={`/`} className="cat-item__link">
            404
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
