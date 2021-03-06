import { css } from "styled-components";

const postContentStyle = css`
  margin: 1.5em 0 1em;
  line-height: 1.8;
  a {
    text-decoration: underline;
  }
  p {
    margin-bottom: 1em;
  }
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 40px 0 10px;
    font-weight: normal;
    line-height: 1.5;
  }
  h2 {
    position: relative;
    margin: 48px 0 12px;
    padding: 5px 0 5px;
    font-size: 1.6em;
    &:before {
      position: absolute;
      top: 0;
      left: 0;
      content: "";
      display: inline-block;
      width: 5px;
      height: 100%;
    }
  }
  h3 {
    margin: 24px 0 12px;
    font-size: 1.3em;
    font-weight: bold;
  }
  h4 {
    position: relative;
    font-size: 1.1em;
    &:before {
      position: absolute;
      top: .2em;
      left: 0;
      content: "";
      display: inline-block;
      width: 14px;
      height: 19px;
    }
  }
  ul, ol {
    margin: 1em 0;
    p {
      margin: 0;
    }
  }
  ul {
    padding-left: 1.2em;
  }
  ul li {
    margin: .4em 0;
    list-style: disc;
  }
  ul ul {
    margin: 0;
  }
  ol {
    counter-reset: number;
    & > li {
      list-style: none;
      list-style-position: inside;
      position: relative;
      line-height: 25px;
      padding-left: 34px;
      margin: 1em 0;
      &:before {
        display: inline-block;
        position: absolute;
        left: 0;
        top: 0;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        color: #fff;
        font-size: 12px;
        text-align: center;
        line-height: 26px;
        font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
        content: counter(number);
        counter-increment: number;
        background: ${props => props.theme.colors.base};
      }
    }
  }
  strong {
    font-weight: 600;
  }
  em {
    font-style: italic;
  }
  del {
    text-decoration: line-through;
  }
  hr {
    display: block;
    margin: 2em 0;
    border: none;
    border-top: solid 4px ${props => props.theme.colors.bgLight};
  }
  table {
    display: block;
    border-spacing: 2px;
    border-collapse: separate;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    width: auto;
    font-size: .9em;
    line-height: 1.4;
    th {
      background-color: ${props => props.theme.colors.base};
      color: #FFF;
      padding: 10px 12px;
      text-align: center;
      &[align="center"] {
        text-align: center;
      }
      &[align="right"] {
        text-align: right;
      }
    }
    td {
      background-color:  ${props => props.theme.colors.bgLight};
      color: ${props => props.theme.colors.grey};
      padding: 10px 12px;
    }
  }
  blockquote {
    margin: 2.3em 0;
    font-style: italic;
    background: ${props => props.theme.colors.whitesmoke};
    padding: 1em;
    p {
      margin: .3em 0;
    }
  }
  .gatsby-resp-image-wrapper {
    margin: 1em 0;
    border: none;
    overflow: hidden;
  }
`;

export default postContentStyle;
