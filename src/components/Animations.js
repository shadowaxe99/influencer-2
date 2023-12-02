import React from 'react';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

// Define keyframes for animations
const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const slideIn = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(0); }
`;

// Styled components with animations
const FadeInDiv = styled.div`
  animation: ${fadeIn} 2s ease-in-out;
`;

const SlideInDiv = styled.div`
  animation: ${slideIn} 2s ease-in-out;
`;

// Export animations as React components
export const FadeInAnimation = ({ children }) => {
  return <FadeInDiv>{children}</FadeInDiv>;
};

export const SlideInAnimation = ({ children }) => {
  return <SlideInDiv>{children}</SlideInDiv>;
};