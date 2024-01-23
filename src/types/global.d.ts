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

  // Questions Interface
  interface AddQuestionPayload {
    username: string;
    password: string;
    title: string;
    body: string;
    email?: string;
    phone?: string;
  }

  interface RemoveQuestionPayload {
    password?: string;
  }

  interface AddReplyPayload {
    reply: string;
  }

  // Stories Interface
  interface AddStoryPayload {
    title: string;
    body: string;
    thumbnail: string;
    tags: Array<string>;
  }
}