import styled from 'styled-components';

interface Props {
  date: string;
}

export function StoryDate({ date }: Props) {
  const target = new Date(new Date(date).getTime() + 9 * 60 * 60 * 1000);
  const month = new Date(target).getMonth() + 1;
  const day = new Date(target).getDate();
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = week[new Date(target).getDay()];

  return (
    <DateContainer>
      <DateDay>
        {month}/{day}
      </DateDay>

      <DateDay className="week">{dayOfWeek}</DateDay>
    </DateContainer>
  );
}

// Styles
const DateContainer = styled.div`
  flex: 0 0 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const DateDay = styled.span`
  background: #f7f7f7;
  border-radius: 2px 2px 0 0;
  color: #0088cc;
  display: block;
  font-size: 18px;
  font-weight: 900;
  padding: 10px;

  &.week {
    display: block;
    background: #0088cc;
    border-radius: 0 0 2px 2px;
    color: #fff;
    font-size: 0.8em;
    line-height: 1.8;
    padding: 1px 10px;
    text-transform: uppercase;
  }
`;
