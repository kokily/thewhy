import type { Story } from '@prisma/client';
import localFont from 'next/font/local';
import styled from 'styled-components';

const yoon340 = localFont({
  src: '../../../../public/fonts/YDIYGO340.woff2',
  display: 'swap',
});

interface Props {
  story: Story;
  onReadStory: (id: string) => void;
}

export function CardHeader({ story, onReadStory }: Props) {
  return (
    <Title className={yoon340.className} onClick={() => onReadStory(story.id)}>
      {story.title}
    </Title>
  );
}

// Styles
const Title = styled.h4`
  font-size: 23px;
  color: #463884;
  text-align: center;
  padding-top: 0.25rem;
  margin: 0;
  letter-spacing: -0.05rem;
  font-weight: 600;
  line-height: 27px;
  margin: 0 0 14px 0;
  cursor: pointer;

  &:before {
    content: '';
    display: block;
    border-top: 3px solid rgb(34, 139, 230);
    width: 100px;
    margin: -20px auto 5px;
  }

  &:hover {
    color: #9930b9;
  }
`;
