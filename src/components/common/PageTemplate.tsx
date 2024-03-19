'use client';

import type { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { Footer } from './footer/Footer';
import { Header } from './header/Header';

export function PageTemplate({ children }: PropsWithChildren) {
  return (
    <PageContainer>
      <PageLayout>
        <Header />

        <PageChildBox>{children}</PageChildBox>
      </PageLayout>

      <Footer />
    </PageContainer>
  );
}

// Styles
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1110px;
`;

const PageChildBox = styled.main`
  display: block;
  width: 100%;
  margin-top: 208px;
  margin-bottom: 5rem;
  max-width: 1110px;
`;
