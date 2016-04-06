import csjs from 'csjs-inject'
import colors from 'styles/colors'

export default csjs`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    line-height: 1.5;
    color: ${colors.text};
    background-color: ${colors.background};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html, body, #root {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
  }
`
