import React from "react";
import { StaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import ShareButtons from "../components/ShareButtons";

const BioWrapper = styled.div`
  width: 100%;
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
    font-size: 13px;
    font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
    padding: 4px;
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
  letter-spacing: 0.5px;
  font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
`;

const Bio = ( postProp ) => {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { bio } = data.site.siteMetadata;
        const author = postProp.author;
        const slug = postProp.path;
        const title = postProp.title;
        return (
          <BioWrapper>
            <ShareButtons slug={slug} title={title} />
            <BioHeader>
              <AvatarImage src={`/images/${author}.jpg`} alt={bio[author].name} />
              <BioName>
                <a style={{color: bio[author].color }} href={`https://twitter.com/${bio[author].name}`}>@{bio[author].name}</a>
              </BioName>
            </BioHeader>
            <BioMain>
              <BioText>
                {bio[author].text}
              </BioText>
              <BioLinks>
                <BioLink href={bio[author].site}>
                  <div style={{color: bio[author].color }}>Site</div>
                </BioLink>
                <BioLink href={`https://twitter.com/${bio[author].name}`}>
                  <div style={{color: bio[author].color }}>Twitter</div>
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
query bioQuery {
  site {
    siteMetadata {
      bio {
        goran {
          name
          slug
          color
          text
          site
        }
        motoi {
          name
          slug
          color
          text
          site
        }
      }
    }
  }
}
`;

export default Bio;
