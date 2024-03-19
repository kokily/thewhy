import styled from 'styled-components';
import { media } from '@/helper/client/style';
import { LinkItem } from './LinkItem';

interface Props {
  links: Array<HomeLinks>;
}

export function LinksList({ links }: Props) {
  return (
    <LinksListContainer>
      {links.map((link) => (
        <LinkItem key={link.id} link={link} />
      ))}
    </LinksListContainer>
  );
}

// Styles
const LinksListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  ${media.large} {
    max-width: 760px;
  }

  ${media.medium} {
    max-width: 100%;
    justify-content: center;
  }
`;
