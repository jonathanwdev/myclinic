import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Lexend+Exa&display=swap');

  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
    outline:0;
  }

  *:focus{
    outline:0;
  }

  html, body, .App  {
    height:100%;
  }



  #root{
    min-height:100vh;
    background: linear-gradient(
    170deg,
    rgba(35, 51, 197, 0.85),
    rgba(83, 160, 257, 0.8),
    rgba(50, 211, 202, 0.75)
  );
  }

  html{
    font-size: 62.5%;
  }


  body{
    -webkit-font-smoothing: antialiased;

  }

  body, input, button{
    font: 1.2rem 'Lexend Exa', sans-serif;
  }

  a{
    text-decoration: none;
  }

  ul{
    list-style: none;
  }

  button{
    cursor: pointer
  }

`;
