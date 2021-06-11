import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 0 auto 24px;
  max-width: 200px;
`;

const ShareLinks = styled.div`
`;

const ShareLink = styled.a`
  display: flex;
  justify-content: center;
  line-height: 40px;
  border-radius: 4px;
  color: ${(props) => props.theme.colors.base};
  border-bottom: 4px solid white;
  font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
  text-align: center;
  img {
    transition: ease .3s;
  }
  &:hover {
    img {
      transform: translateY(-4px) scale(1.2);
    }
  }
`;

const ShareButtons = ({ title, slug }) => {
  console.log(slug);
  const encodedTitle = encodeURIComponent(
    `${title}`
  );
  const pageUrl = `https://dev.plus-class.jp${slug}`;
  return (
    <Wrapper>
      <ShareLinks>
        <ShareLink
          href={`https://twitter.com/share?url=${pageUrl}&text=${encodedTitle}`}
          rel="nofollow"
        >
          <span>ShareArticle(</span>
          <img
            src="/images/twitter.svg"
            alt="Twitter"
            style={{
              width: "24px",
              height: "19px",
              marginTop: "11px",
            }}
          />
          <span>);</span>
        </ShareLink>
      </ShareLinks>
    </Wrapper>
  );
};

export default ShareButtons;
