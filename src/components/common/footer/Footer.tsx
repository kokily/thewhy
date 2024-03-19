'use client';

import styled from 'styled-components';
import { FooterContents } from './contents/FooterContents';
import { FooterCopyright } from './copyright/FooterCopyright';

export function Footer() {
  return (
    <FooterContainer>
      <FooterContents />
      <FooterCopyright />
    </FooterContainer>
  );
}

// Styles
const FooterContainer = styled.footer`
  display: block;
  background: #212529;
  width: 100%;
  border-top: 4px solid #212529;
  font-size: 0.9rem;
  padding: 0;
  clear: both;
  position: relative;
`;
