import { useEffect, useState } from 'react';
import { marked } from 'marked';
import Prism from 'prismjs';
import styled from 'styled-components';

import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/components/prism-bash.min.js';
import 'prismjs/components/prism-javascript.min.js';
import 'prismjs/components/prism-jsx.min.js';
import 'prismjs/components/prism-css.min.js';
import 'prismjs/components/prism-tsx.min.js';

import { media } from '@/helper/client/styles';

interface Props {
  markdown: string;
}

export function Markdown({ markdown }: Props) {
  const [html, setHtml] = useState('');

  const renderer = new marked.Renderer();

  function renderMarkdown() {
    if (!markdown) {
      setHtml('');
      return;
    }

    renderer.image = function (href) {
      return `<img loading="lazy" src=${href} alt="Story Image" />`;
    };

    renderer.table = function (header, body) {
      return `<div style="overflow: auto;"><table>${header}${body}</table></div>`;
    };

    marked.setOptions({
      breaks: true,
      renderer,
    });

    setHtml(marked.parse(markdown) as string);
  }

  useEffect(() => {
    renderMarkdown();
  });

  useEffect(() => {
    return () => {
      Prism.highlightAll();
    };
  }, [html]);

  return <MarkdownContainer dangerouslySetInnerHTML={{ __html: html }} />;
}

// Styles
const MarkdownContainer = styled.div`
  line-height: 1.6;
  padding-left: 0.5rem;
  margin-bottom: 14rem;

  blockquote {
    border-left: 4px solid #1b3bf5;
    padding: 0.6rem 0 0.6rem 1.3rem;
    color: black;
    margin-left: 0;
    margin-right: 0;
    background-color: #edf2ff;

    p {
      color: #495057;
      margin: 0;
    }
  }

  h1 {
    font-size: 2rem;
    border-bottom: 1px solid #edf2ff;
    color: #3b5bdb;
  }

  h2 {
    font-size: 1.715rem;
    border-bottom: 1px solid #e7f5ff;
    color: #4dabf7;
  }

  h3 {
    font-size: 1.6rem;
    border-bottom: 1px solid #e3fafc;
    color: #0c8599;
  }

  h4 {
    font-size: 1.415rem;
  }

  h1,
  h2,
  h3,
  h4 {
    font-weight: bold;
    margin-top: 2.4rem;
    margin-bottom: 0px;
    padding-bottom: 0px;
  }

  code:not([class^='language-']) {
    padding: 0.1rem;
    background: #ffe3e3;
    color: #eb5757;
    border-radius: 4px;
  }

  pre {
    padding: 0.5rem;
    color: #ffffff;
    background: #4a4a4a;
    border-radius: 4px;
    overflow-x: auto;

    code {
      white-space: pre;
      word-spacing: normal;
      word-break: normal;
      overflow-wrap: normal;
      padding: 0.25rem;
      font-size: 1rem;
    }

    p {
      font-size: 1rem;
      margin: 0;
    }
  }

  a {
    color: #1b3bf5;

    &:hover {
      color: #2f4df8;
      text-decoration: underline;
    }
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  table,
  th,
  td {
    border: 1px solid #888888;
  }

  th,
  td {
    font-size: 0.9rem;
    padding: 0.25rem;
    text-align: left;
  }

  img {
    max-width: 100%;
    margin: 0 auto;
    display: block;
    margin-bottom: 2.3rem;
  }

  img {
    border-radius: 4px;
  }

  p {
    font-size: 1rem;

    em {
      color: #099268;
      background: #c3fae8;
      padding: 0.1rem 0.2rem 0rem 0.2rem;
      font-style: normal;
      border-radius: 4px;
    }

    strong {
      color: #1e63c4;
      border-radius: 6px;
      padding-left: 0.1rem;
      padding-right: 0.1rem;
      margin-left: 0.1rem;
      margin-right: 0.1rem;
    }
  }

  ul,
  ol {
    font-size: 1rem;
    padding-left: 1.2rem;
    padding-bottom: 1rem;

    li {
      margin-bottom: 0.3rem;
      line-height: 1.6;
      color: #212529;

      ul li {
        font-size: 0.925rem;
        margin-bottom: 0rem;
        color: #495057;
      }
    }
  }

  .ql-video {
    width: 100%;
    height: 15.3125vw;
    margin: 0 auto;
    display: block;

    ${media.large} {
      height: 40vw;
    }

    ${media.small} {
      height: 50.5vw;
    }
  }
`;
