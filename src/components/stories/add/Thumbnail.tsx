import styled from 'styled-components';

interface Props {
  thumbnail: string;
  onUploadThumbnail: () => void;
}

export function Thumbnail({ thumbnail, onUploadThumbnail }: Props) {
  return thumbnail === '' ? (
    <ThumbnailButton onClick={onUploadThumbnail}>썸네일 업로드</ThumbnailButton>
  ) : (
    <ThumbnailImage src={thumbnail} alt="썸네일" />
  );
}

// Styles
const ThumbnailImage = styled.img`
  width: 100%;
  max-width: 650px;
  height: auto;
  filter: sepia(40%);
  border: 1px solid white;
  border-radius: 4px;
  padding: 5px;
`;

const ThumbnailButton = styled.button`
  color: #1fade6;
  border: 1px solid #1fade6;
  border-radius: 8px;
  background: none;
  padding: 0.3rem 0.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s all;

  &:hover {
    background: #1fade6;
    color: white;
    border: 1px solid #10a9e6;
  }

  &:active {
    transform: translateY(2px);
  }
`;
