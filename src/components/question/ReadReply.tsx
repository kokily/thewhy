import localFont from 'next/font/local';
import styled from 'styled-components';

const yoon330 = localFont({
  src: '../../../public/fonts/YDIYGO330.woff2',
  display: 'swap',
});

interface Props {
  body: string;
}

export function ReadReply({ body }: Props) {
  return (
    <ReadReplyContainer>
      <h4 className={yoon330.className}>답 글</h4>
      <Pre className={yoon330.className}>{body}</Pre>
    </ReadReplyContainer>
  );
}

// Styles
const ReadReplyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  background: #f7f7f7;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 1rem;
`;

const Pre = styled.pre`
  font-size: 0.9rem;
  line-height: 1.6;
  white-space: pre-line;
  margin-top: 0;
  margin-bottom: 1rem;
  overflow: auto;
`;
