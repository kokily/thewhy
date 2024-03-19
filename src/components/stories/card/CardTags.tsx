import styled from 'styled-components';

interface Props {
  tags: Array<string>;
}

export function CardTags({ tags }: Props) {
  return (
    <TagsContainer>
      {tags.map((tag) => (
        <Tag key={tag}>#{tag}</Tag>
      ))}
    </TagsContainer>
  );
}

// Styles
const TagsContainer = styled.div`
  margin: 0 0 20px;
  text-align: center;
  max-width: 100%;
  height: 52px;
  word-break: keep-all;
  font-size: 19px;
  color: #616161;
  line-height: 1.3;
  margin-bottom: 0;
  font-size: 0.9rem;
  font-weight: bold;
  overflow: hidden;
  margin-bottom: 0;
  padding-bottom: 0;
`;

const Tag = styled.span`
  margin-right: 0.5rem;
  color: #1251fb;
  opacity: 0.6;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;
