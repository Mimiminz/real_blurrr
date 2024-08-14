import styled from 'styled-components';

export const Container = styled.div`
  padding-top: 20px;
  width: 100%;
`;

export const ContentContainer = styled.div`
  flex-direction: column;
  margin-bottom: 16px;
`;

export const InnerContentContainer = styled.div`
  display: flex;
`;

export const LeftColumn = styled.div`
  flex: 1.3;
  display: flex;
  margin-right: 20px;
  flex-direction: column;
  height: 100%;
  max-height: 700px;
`;

export const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  max-height: 700px;
`;

export const CommentSection = styled.div<{ $hasOptions: boolean }>`
  background-color: #f8f8f8;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 0px 20px 20px;
  height: ${({ $hasOptions }) => ($hasOptions ? '500px' : '700px')};
  overflow-y: auto; /* 내용이 많을 때 스크롤 가능 */
`;

export const VoteSection = styled.div`
  background-color: #f8f8f8;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
`;
