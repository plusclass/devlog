import { css } from "styled-components";

const boxPaddingSide = "1.2em";

const SyntaxHighlightStyle = css`
  .gatsby-highlight {
    margin: 1.5em 0;
    border: 1px solid #dadce0;
    @media screen and (max-width: ${props => props.theme.responsive.small}) {
      margin: 1.5em -${props => props.theme.sideSpace.contentSmall};
    }
  }
  code[class*="language-"],
  pre[class*="language-"] {
    hyphens: none;
    white-space: pre;
    white-space: pre-wrap;
    word-wrap: normal;
    font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
    font-size: 14.5px;
    color: ${props => props.theme.colors.base};
    text-shadow: none;
  }
  pre[class*="language-"],
  :not(pre) > code[class*="language-"] {
    background: ${props => props.theme.colors.bgLight};
  }
  pre[class*="language-"] {
    padding: 26px ${boxPaddingSide};
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  pre[class*="language-"] {
    position: relative;
  }
  pre[class*="language-"] code {
    white-space: pre;
    display: block;
  }

  :not(pre) > code[class*="language-"] {
    padding: 0.15em 0.2em 0.05em;
    border: 0.13em solid #7a6652;
    box-shadow: 1px 1px 0.3em -0.1em #000 inset;
  }
  .token.namespace {
    opacity: 0.7;
  }
  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #696969;
  }
  .token.boolean,
  .token.number {
    color: #007aa2;
  }
  .token.attr-name,
  .token.string {
    color: ${props => props.theme.colors.codeGreen};
  }
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string {
    color: ${props => props.theme.colors.codeGreen};
  }
  .token.selector,
  .token.inserted {
    color: #9f1c59;
  }
  .token.property {
    color: #385d34;
  }
  .token.operator,
  .token.atrule,
  .token.attr-value,
  .token.keyword,
  .token.important,
  .token.deleted {
    color: ${props => props.theme.colors.codeRed};
  }
  .token.regex,
  .token.statement {
    color: #22aef1;
  }
  .token.placeholder,
  .token.variable {
    color: #fff;
  }
  .token.important,
  .token.statement,
  .token.bold {
    font-weight: 600;
  }
  .token.punctuation {
    color: ${props => props.theme.colors.codeBlue};
  }
  .token.entity {
    cursor: help;
  }
  .token.italic {
    font-style: italic;
  }

  code.language-markup {
    color: #f9f9f9;
  }
  code.language-markup .token.tag {
    color: ${props => props.theme.colors.codeRed};
  }
  code.language-markup .token.attr-name {
    color: #3eda86;
  }
  code.language-markup .token.attr-value {
    color: #ffab3c;
  }
  code.language-markup .token.style,
  code.language-markup .token.script {
    color: #22aef1;
  }
  code.language-markup .token.script .token.keyword {
    color: #22aef1;
  }

  /* Line highlight plugin */
  .gatsby-highlight-code-line {
    background-color: rgba(0, 0, 0, 0.05);
    display: table;
    min-width: calc(100% + ${boxPaddingSide} * 2);
    margin-right: -${boxPaddingSide};
    margin-left: -${boxPaddingSide};
    padding-left: 12px;
    border-left: 5px solid ${props => props.theme.colors.codeBlue};
  }

  /*gatsby-remark-code-titles*/
  .gatsby-code-title {
    position: relative;
    margin: 1.5em 0 -24px auto;
    background: #202124;
    color: #fff;
    font-size: 12px;
    height: 24px;
    padding: 0 8px;
    line-height: 24px;
    font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
    display: table;
    z-index: 2;
    @media screen and (max-width: ${props => props.theme.responsive.small}) {
      margin-right: -${props => props.theme.sideSpace.contentSmall};
    }
  }
  .gatsby-code-title + .gatsby-highlight {
    margin-top: 0;
  }
  /* Inline code */
  p > code,
  li > code {
    display: inline-block;
    background: #edf2f7;
    padding: 0.1em 0.3em;
    margin: 0 0.2em;
    line-height: 1.4;
    color: #454e63 !important;
  }
`;

export default SyntaxHighlightStyle;
