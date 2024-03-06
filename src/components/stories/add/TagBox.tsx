import { memo, type ChangeEvent } from 'react';
import styled from 'styled-components';

// Tag
const Tag = memo(
  ({ tag, onRemove }: { tag: string; onRemove: (id: string) => void }) => (
    <TagContainer onClick={() => onRemove(tag)}>#{tag}</TagContainer>
  ),
);

Tag.displayName = 'Tag';

// Tags List
const TagsList = memo(
  ({ tags, onRemove }: { tags: Array<string>; onRemove: (id: string) => void }) => (
    <TagsListContainer>
      {tags.map((tag) => (
        <Tag key={tag} tag={tag} onRemove={onRemove} />
      ))}
    </TagsListContainer>
  ),
);

interface Props {
  input: string;
  localTags: Array<string>;
  onRemoveTag: (tag: string) => void;
  onChangeText: (e: ChangeEvent<HTMLInputElement>) => void;
  onSetTags: (e: ChangeEvent<HTMLFormElement>) => void;
}

export function TagBox(props: Props) {
  return (
    <BoxContainer>
      <p>태그 👉</p>

      <Form onSubmit={props.onSetTags}>
        <input
          placeholder="엔터로 입력"
          value={props.input}
          onChange={props.onChangeText}
        />
        <Button type="submit">추가</Button>
      </Form>

      <TagsList tags={props.localTags} onRemove={props.onRemoveTag} />
    </BoxContainer>
  );
}

// Styles
const BoxContainer = styled.div`
  height: 4rem;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 1.125rem;
  font-weight: bold;
  padding-left: 1rem;
  padding-right: 1rem;
  word-break: keep-all;
  p {
    margin-right: 1.3rem;
  }
`;

const Form = styled.form`
  background: none;
  input {
    flex: 1;
    border: none;
    outline: none;
    padding: 0.5rem;
    font-size: 1rem;
    background: none;
    &::placeholder {
      color: #777;
    }
  }
`;

const Button = styled.button`
  color: #3db7cc;
  border: 1px solid #3db7cc;
  border-radius: 8px;
  background: none;
  padding: 0.3rem 0.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s all;
  &:hover {
    background: #58aebd;
    color: white;
    border: 1px solid #88c0ca;
  }
  &:active {
    transform: translateY(2px);
  }
`;

// Tags List Style
const TagsListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 1.2rem;
`;

// Tag Style
const TagContainer = styled.div`
  cursor: pointer;
  color: #6799ff;
  transition: 0.2s all;

  &:hover {
    color: #f15f5f;
  }

  & + & {
    margin-left: 1.5rem;
  }
`;
