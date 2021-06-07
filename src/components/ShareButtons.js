import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 0 0 2.5em;
  padding: 0 ${(props) => props.theme.sideSpace.contentLarge};
  color: ${(props) => props.theme.colors.base};
  @media screen and (max-width: ${(props) => props.theme.responsive.small}) {
    padding: 0 ${(props) => props.theme.sideSpace.contentSmall};
  }
`;

const ShareLinks = styled.div`
`;

const ShareLink = styled.a`
  display: inline-block;
  margin: 0 6px;
  line-height: 40px;
  border-radius: 50%;
  font-weight: 600;
  vertical-align: middle;
  font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
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
      <ShareLinks>
        <ShareLink
          href={`https://twitter.com/share?url=${pageUrl}&text=${encodedTitle}`}
          rel="nofollow"
        >
          <span>Share</span>
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
