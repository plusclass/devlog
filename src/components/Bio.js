import React from "react";
import { StaticQuery, graphql } from "gatsby";
import styled from "styled-components";

const BioWrapper = styled.div`
  position: sticky;
  top: 2em;
  width: ${props => props.theme.sizes.bioWidth};
  padding: 1.5em;
  font-size: 15.5px;
  background: ${props => props.theme.colors.bgLight};
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  @media screen and (max-width: ${props => props.theme.responsive.large}) {
    position: relative;
    margin: 2em 0;
    width: 100%;
  }
  @media screen and (max-width: ${props => props.theme.responsive.small}) {
    padding: 1.3em 1em;
  }
`;

const AvatarImage = styled.img`
  display: block;
  width: 70px;
  height: 70px;
  border-radius: 50%;
`;

const BioHeader = styled.div`
  display: flex;
  align-items: center;
`;
const BioName = styled.div`
  margin-left: 10px;
  a {
    letter-spacing: 1px;
    font-size: 1em;
    font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
    color: ${props => props.theme.colors.grey};
    background: ${props => props.theme.colors.bgLight};
    padding: 4px;
    border-radius: 4px;
    border: 1px solid #dadce0;
  }
`;
const BioMain = styled.div`
  margin-top: 1em;
`;
const BioText = styled.p`
  font-size: 0.92em;
`;
const BioLinks = styled.div`
  margin-top: 1.5em;
  display: flex;
  text-align: center;
  max-width: 244px;
  img {
    display: block;
    margin: 0 auto;
    width: 40px;
    height: 33px;
  }
`;

const BioLink = styled.a`
  width: 50%;
  display: block;
  font-size: 0.9em;
  line-height: 30px;
  color: ${props => props.theme.colors.gray};
  letter-spacing: 0.5px;
  font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
  &:hover {
    color: ${props => props.theme.colors.link};
  }
`;

const Bio = ({ author }) => {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        return (
          <BioWrapper>
            <BioHeader>
              <AvatarImage src="/images/goran.jpg" alt={author} />
              <BioName>
                <a href={`https://twitter.com/${author}`}>@{author}</a>
              </BioName>
            </BioHeader>
            <BioMain>
              <BioText>
                GORAN_NASAIというハンドルネームで、フロントエンドエンジニアやってます。
              </BioText>
              <BioLinks>
                <BioLink href="https://goran-nasai.com">
                  <div>Site</div>
                </BioLink>
                <BioLink href="https://twitter.com/goran_nasai">
                  <div>Twitter</div>
                </BioLink>
              </BioLinks>
            </BioMain>
          </BioWrapper>
        );
      }}
    />
  );
};

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/avatar.png/" }) {
      childImageSharp {
        fixed(width: 70, height: 70) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }
  }
`;

export default Bio;
