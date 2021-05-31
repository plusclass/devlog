import React from "react";
import styled from "styled-components";
import svgTwitterWhite from "../svg/socials/twitter-white.svg";

const Wrapper = styled.div`
  margin: 0 0 2.5em;
  padding: 0 ${(props) => props.theme.sideSpace.contentLarge};
  text-align: center;
  color: ${(props) => props.theme.colors.blackLight};
  @media screen and (max-width: ${(props) => props.theme.responsive.small}) {
    padding: 0 ${(props) => props.theme.sideSpace.contentSmall};
  }
`;

const ShareTitle = styled.div`
  font-weight: 600;
  font-size: 1.2em;
  letter-spacing: 0.05em;
`;

const ShareLinks = styled.div`
  margin-top: 0.5em;
`;

const ShareLink = styled.a`
  display: inline-block;
  margin: 0 6px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 50%;
  color: #fff;
  background: ${(props) => props.theme.colors.blackLight};
  font-weight: 600;
  vertical-align: middle;
  &:hover {
    transform: translateY(-2px);
  }
`;
const GitHubLink = styled.a`
  display: inline-block;
  margin-top: 1em;
  font-size: 0.85em;
  color: ${(props) => props.theme.colors.silver};
`;

const ShareButtons = ({ slug, title }) => {
  const encodedTitle = encodeURIComponent(
    `${title} | Devlog`
  );
  const pageUrl = `https://dev.plusclass${slug}`;
  return (
    <Wrapper>
      <ShareTitle>SHARE</ShareTitle>
      <ShareLinks>
        <ShareLink
          href={`https://twitter.com/share?url=${pageUrl}&text=${encodedTitle}`}
          rel="nofollow"
        >
          <img
            src={svgTwitterWhite}
            alt="Twitter"
            style={{
              width: "24px",
              height: "19px",
              marginTop: "11px",
            }}
          />
        </ShareLink>
      </ShareLinks>
    </Wrapper>
  );
};

export default ShareButtons;
