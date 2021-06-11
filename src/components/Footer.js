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
  font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
  a {
    color: ${props => props.theme.colors.grey};
    text-decoration: underline;
  }
  p {
    margin: 24px 0 12px;
  }
  .corp {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .pc {
      width: 30px;
      margin-right: 24px;
    }
    .psi {
      width: 60px;
    }
  }
`;

const Footer = () => {
  return (
    <FooterContent>
      <ContentWrapper>
        <FooterInner>
          <div>© {new Date().getFullYear()}, Plusclass Inc. All rights reserved.</div>
          <p>CorpLinks[] : </p>
          <div className="corp">
            <a href="https://plus-class.co.jp/">
              <img className="pc" src="/images/logo_pc.svg" alt="プラスクラスのロゴ" />
            </a>
            <a href="https://plusclass-sports-incubation.co.jp/">
            <img className="psi" src="/images/logo_psi.svg" alt="PSIのロゴ" />
            </a>
          </div>
        </FooterInner>
      </ContentWrapper>
    </FooterContent>
  );
};

export default Footer;
