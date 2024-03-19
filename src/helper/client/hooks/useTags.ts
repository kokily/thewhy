import type { ChangeEvent } from 'react';
import { useCallback, useState, useEffect } from 'react';

interface Props {
  tags: Array<string>;
  onChangeTags: (nextTags: Array<string>) => void;
}

export function useTags({ tags, onChangeTags }: Props) {
  const [input, setInput] = useState('');
  const [localTags, setLocalTags] = useState<Array<string>>([]);

  const onAddTag = useCallback(
    (tag: string) => {
      // 중복 저장된 태그 검사
      if (!tag) return;
      if (localTags.includes(tag)) return;

      const nextTags = [...localTags, tag];

      setLocalTags(nextTags);
      onChangeTags(nextTags);
    },
    [localTags, onChangeTags],
  );

  const onChangeText = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  const onRemoveTag = useCallback(
    (tag: string) => {
      const nextTags = localTags.filter((text) => text !== tag);

      setLocalTags(nextTags);
      onChangeTags(nextTags);
    },
    [localTags, onChangeTags],
  );

  const onSetTags = useCallback(
    (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      onAddTag(input.trim());
      1;
      setInput('');
    },
    [input, onAddTag],
  );

  useEffect(() => {
    setLocalTags(tags);
  }, [tags]);

  return {
    input,
    localTags,
    onChangeText,
    onRemoveTag,
    onSetTags,
  };
}
