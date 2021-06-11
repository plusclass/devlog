import { css } from "styled-components";

const postCustomBlockStyle = css`
  .custom-block {
    margin: 1em 0;
  }
  .custom-block-heading {
    font-weight: 600;
  }
  .custom-block-body {
    font-size: 0.92em;
    & > *:first-child {
      margin-top: 0;
    }
    & > *:last-child {
      margin-bottom: 0;
    }
    h5 {
      font-size: 1.05em;
      margin: 20px 0 5px;
    }
  }
  & > *:first-child {
    margin-top: 0;
  }
  .custom-block.simple {
    padding: 1em 1.2em;
    .custom-block-heading {
      font-size: 1.1em;
    }
  }
  .custom-block.info,
  .custom-block.alert,
  .custom-block.notice {
    padding: 0.7em 1em;
    border-top: solid 2px ${props => props.theme.colors.base};
  }
  .custom-block.alert {
    border-color: ${props => props.theme.colors.alert};
    color: ${props => props.theme.colors.alert};
    .custom-block-heading {
      position: relative;
      &::before {
        position: absolute;
        left: -12px;
        top: 0;
        content: '!';
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
  .custom-block.notice {
    border-color: ${props => props.theme.colors.notice};
    color: ${props => props.theme.colors.notice};
    .custom-block-heading {
      position: relative;
      &::before {
        position: absolute;
        left: -16px;
        top: 3px;
        content: '★';
        font-size: 12px;
      }
    }
  }
  .custom-block.image-small,
  .custom-block.image-medium {
    background: ${props => props.theme.colors.bgLight};
    padding: 1.5em;
    text-align: center;
    .gatsby-resp-image-wrapper {
      margin: 0;
      border: none;
      box-shadow: 0 5px 15px -5px rgba(40, 50, 70, 0.15);
    }
  }
  .custom-block.image-small .gatsby-resp-image-wrapper {
    max-width: 350px !important;
    border: none;
  }
  .custom-block.image-medium .gatsby-resp-image-wrapper {
    max-width: 450px !important;
    border: none;
  }
`;

export default postCustomBlockStyle;
