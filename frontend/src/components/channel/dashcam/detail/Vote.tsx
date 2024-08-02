import React from 'react';
import { LeafPoll, Result } from 'react-leaf-polls';
import 'react-leaf-polls/dist/index.css';
import styled from 'styled-components';

// 투표 결과 데이터
const resData: Result[] = [
  { id: 0, text: `정승훈ㅁㄴㅇ아ㅡㅁㄴ이ㅏㅁㅇ`, votes: 3 },
  { id: 1, text: '박근석', votes: 6 },
  { id: 2, text: '최은혜', votes: 2 },
  { id: 3, text: '전상현', votes: 5 },
  { id: 4, text: '김주연', votes: 4 },
];

// 커스텀 테마
const customTheme = {
  textColor: 'black',
  mainColor: '#00B87B',
  backgroundColor: 'rgb(255,255,255)',
  alignment: 'center',
};

// 투표 핸들러 함수
function vote(item: Result, results: Result[]) {
  console.log('Voted item:', item);
  console.log('Updated results:', results);
}

// 스타일링
const Container = styled.div`
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 10px;
`;

const EllipsisStyle = styled.div`
  ._3x3X6, ._3gEzx {
    display: flex;
    flex-direction: row !important; /* 가로 정렬 강제 적용 */
    align-items: center;
  }

  ._is6ww, .poll-answer {
    white-space: nowrap !important; /* 한 줄로 설정 */
    text-overflow: ellipsis !important; /* 말줄임 표시 */
    display: flex;
    align-items: center;
    line-height: 0.7; /* 줄 높이 조정 */
    max-width: 300px;
  }

  ._is6ww p {
  margin: 0;
  padding: 1rem;
  font-weight: bold;
  text-align: left;
  word-wrap : break-word;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
`;

const PollComponent: React.FC = () => {
  return (
    <Container>
      <EllipsisStyle>
        <LeafPoll
          type='multiple'
          question='누가누가 잘못했을까요'
          results={resData}
          theme={customTheme}
          onVote={vote}
          isVoted={false}
        />
      </EllipsisStyle>
    </Container>
  );
};

export default PollComponent;
