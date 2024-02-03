import { FcCheckmark } from 'react-icons/fc';
import styled from 'styled-components';

interface Props {
  body: OutlineType;
}

export function OutlineItem({ body }: Props) {
  return (
    <OutlineContainer>
      <OutlineTitle>{body.title}</OutlineTitle>

      {body.first &&
        body.first.length > 0 &&
        body.first.map((obj) => (
          <FirstPane key={obj.id}>
            <span>
              <FcCheckmark /> <span>{obj.firstTitle}</span>
            </span>

            {obj.firstChild &&
              obj.firstChild.length > 0 &&
              obj.firstChild.map((second) => (
                <SecondPane key={second.secondTitle}>
                  <p className="second_title">{second.secondTitle}</p>
                  {second.secondChild &&
                    second.secondChild.length > 0 &&
                    second.secondChild.map((child) => (
                      <pre key={child} className="second_child">
                        {child}
                      </pre>
                    ))}
                </SecondPane>
              ))}
          </FirstPane>
        ))}
    </OutlineContainer>
  );
}

// Styles
const OutlineContainer = styled.div`
  width: 100%;
  text-align: left;
  margin-top: 1.4rem;
  line-height: 12px;
  word-break: keep-all;
`;

const OutlineTitle = styled.h3`
  font-size: 17px;
  line-height: 24px;
  color: #212529;
  margin-bottom: 0.3rem;
`;

const FirstPane = styled.div`
  padding-left: 15px;
  font-size: 14px;
  color: #777;

  span {
    display: flex;
    margin-top: 4px;
    line-height: 20px;
    align-items: flex-start;
    font-size: 16px;

    svg {
      margin-top: 5px;
      margin-right: 5px;
      flex: 0 0 14px;
    }

    span {
      flex: 0 0 calc(100% - 14px);
    }
  }
`;

const SecondPane = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #777;

  .second_title {
    padding-left: 28px;
    line-height: 20px;
  }

  .second_child {
    font-size: 13px;
    font-weight: 300;
    color: #8d8d8d;
    margin-top: -8px;
    line-height: 24px;
    padding-left: 46px;
  }
`;
