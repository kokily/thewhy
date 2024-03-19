import type { Notice } from '@prisma/client';
import styled from 'styled-components';

interface Props {
  notices: Array<Notice>;
  onReadNotice: (id: string) => void;
}

export function NoticeContents({ notices, onReadNotice }: Props) {
  const SeoulTime = (time: Date) => {
    return new Date(
      new Date(time).getTime() + 9 * 60 * 60 * 1000,
    ).toLocaleDateString();
  };

  return (
    <NoticesContainer>
      <thead>
        <tr>
          <th>No.</th>
          <th>제 목</th>
          <th>작성일</th>
        </tr>
      </thead>

      <tbody>
        {notices.length === 0 ? (
          <tr>
            <td style={{ textAlign: 'center' }} colSpan={3}>
              작성된 공지사항이 없습니다.
            </td>
          </tr>
        ) : (
          notices.map((notice) => (
            <tr key={notice.id} onClick={() => onReadNotice(notice.id)}>
              <td style={{ textAlign: 'center' }}>{notice.num}</td>
              <td>{notice.title}</td>
              <td style={{ textAlign: 'center' }}>{SeoulTime(notice.createdAt)}</td>
            </tr>
          ))
        )}
      </tbody>
    </NoticesContainer>
  );
}

// Styles
const NoticesContainer = styled.table`
  width: 100%;
  margin-bottom: 1rem;
  border-collapse: collapse;
  border-spacing: 2px;

  th,
  td {
    vertical-align: bottom;
    padding: 0.75rem;
    border-top: 1px solid #dee2e6;
    border-color: rgba(0, 0, 0, 0.06);
  }

  tbody tr {
    transition: 0.12s;
    cursor: pointer;

    &:hover {
      background: #c8ebe3;
    }
  }
`;
