import React from "react";
import styled from "styled-components";
import ContentWrapper from "../components/ContentWrapper";

const FooterContent = styled.footer`
  width: 100vw;
  padding: 40px 0;
  background: ${props => props.theme.colors.bgLight};
`;

const FooterInner = styled.div`
  text-align: left;
  padding: 1.5em;
  color: ${props => props.theme.colors.grey};
  font-size: 14px;
  a {
    color: ${props => props.theme.colors.grey};
    text-decoration: underline;
  }
`;

const Footer = () => {
  return (
    <FooterContent>
      <ContentWrapper>
        <FooterInner>
          <div>© {new Date().getFullYear()}, Plusclass Inc. All rights reserved.</div>
        </FooterInner>
      </ContentWrapper>
    </FooterContent>
  );
};

export default Footer;
