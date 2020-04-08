import { styled, css } from 'packages/ui-styles/src/main'

export const Root = styled('i', { loading: Boolean }, (props) => css`
  display: inline-block;
  font-size: inherit;
  // line-height: inherit;
  line-height: 1.2;
  color: inherit;

  ${props.loading && `
    animation: loading 2.3s linear infinite;
  `}

  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(1turn);
    }
  }
`)
