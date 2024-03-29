import type { ChangeEvent, SyntheticEvent } from 'react';
import NextAuth from 'next-auth/next';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      token: string;
    };
  }
}

declare global {
  interface SignOptions {
    expiresIn?: string | number;
  }

  interface AuthPayload {
    password: string;
  }

  // Menu Types
  interface ItemType {
    id: number;
    subTitle: string;
    subUrl: string;
  }

  interface MenuType {
    id: number;
    title: string;
    url: string;
    items?: ItemType[];
  }

  // Intersection Observer Interface
  interface ObserverProps {
    onIntersect: IntersectionObserverCallback;
    root?: null;
    rootMargin?: string;
    threshold?: number;
  }

  // Notices Interface
  interface ListNoticesQueries {
    title?: string;
    cursor?: string;
  }

  interface AddNoticePayload {
    title: string;
    body: string;
  }

  interface NoticeType {
    title: string;
    body: string;
    onBack: () => void;
    onChangeTitle: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    onChangeBody: (text: string) => void;
    onSubmitNotice: (e) => void;
  }

  // Questions Interface
  interface ListQuestionsQueries {
    title?: string;
    username?: string;
    phone?: string;
    email?: string;
    cursor?: string;
  }

  interface AddQuestionPayload {
    username: string;
    password: string;
    title: string;
    body: string;
    email?: string;
    phone?: string;
  }

  interface ModifyQuestionPayload {
    password?: string;
  }

  interface QuestionType {
    username: string;
    password: string;
    title: string;
    body: string;
    email: string;
    phone: string;
    agree: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onToggleAgree: () => void;
    onSubmitQuestion: (e: SyntheticEvent) => void;
  }

  interface AddReplyPayload {
    reply: string;
  }

  // Stories Interface
  interface ListStoriesQuery {
    title?: string;
    cursor?: string;
  }

  interface AddStoryPayload {
    title: string;
    body: string;
    thumbnail: string;
    tags: Array<string>;
  }

  interface StoryType {
    title: string;
    body: string;
    thumbnail: string;
    tags: string[];
    onBack: () => void;
    onChangeTitle: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    onChangeBody: (text: string) => void;
    onChangeTags: (nextTags: string[]) => void;
    onUploadThumbnail: () => void;
    onSubmitStory: (e: SyntheticEvent) => void;
  }

  // Home Interface
  interface HomeLinks {
    id: number;
    url: string;
    img: string;
    title: string;
    sub: string;
  }

  // Location Interface
  interface Window {
    kakao: any;
  }

  // Contact Interface
  interface SendMailPayload {
    name: string;
    email: string;
    subject: string;
    body: string;
  }

  // Education Interface
  interface ListType {
    img: string;
    list: Array<string>;
    end?: boolean;
  }

  interface EducationType {
    img: string;
    title: string;
    body: string;
    list: Array<ListType>;
  }

  // ETC Interface
  interface CustomDocumentType {
    title: string;
    first: {
      id: number;
      firstTitle: string;
      firstChild?: {
        secondTitle: string;
        secondChild?: string[];
      }[];
    }[];
  }
}
