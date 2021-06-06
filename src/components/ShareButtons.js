import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 0 0 2.5em;
  padding: 0 ${(props) => props.theme.sideSpace.contentLarge};
  text-align: center;
  color: ${(props) => props.theme.colors.base};
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
  background: ${(props) => props.theme.colors.bgLight};
  font-weight: 600;
  vertical-align: middle;
  &:hover {
    transform: translateY(-2px);
  }
`;

const ShareButtons = ({ slug, title }) => {
  const encodedTitle = encodeURIComponent(
    `${title} | Devlog`
  );
  const pageUrl = `https://dev.plus-class.jp/${slug}`;
  return (
    <Wrapper>
      <ShareTitle>SHARE</ShareTitle>
      <ShareLinks>
        <ShareLink
          href={`https://twitter.com/share?url=${pageUrl}&text=${encodedTitle}`}
          rel="nofollow"
        >
          <img
            src="/images/twitter.svg"
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
