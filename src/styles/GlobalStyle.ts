// src/styles/GlobalStyle.ts
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --primary: #6C5CE7;
    --secondary: #00CEFF;
    --dark: #2D3436;
    --light: #F5F6FA;
    --success: #00B894;
    --danger: #D63031;
    --warning: #FDCB6E;
    --gradient: linear-gradient(135deg, var(--primary), var(--secondary));
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
  }

  body {
    background-color: var(--light);
    color: var(--dark);
    overflow-x: hidden;
  }

  ::selection {
    background: var(--primary);
    color: white;
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--light);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--primary);
    border-radius: 10px;
  }

  /* Animation Classes */
  .fade-in {
    opacity: 0;
    animation: fadeIn 0.5s ease-in forwards;
  }

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }

  .slide-up {
    opacity: 0;
    transform: translateY(20px);
    animation: slideUp 0.5s ease-out forwards;
  }

  @keyframes slideUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;