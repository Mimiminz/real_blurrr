import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 8px;
  background-color: #fff;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #c4c4c4;
  margin-right: 8px;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  color: #666;
`;

const Button = styled.button`
  background-color: #fbc02d;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
`;

const CreateComment: React.FC = () => {
   const [comment, setComment] = useState('');

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setComment(e.target.value);
   };

   const handleSubmit = () => {
      // 댓글 작성 로직을 추가하세요.
      console.log('Comment submitted:', comment);
      setComment('');
   };

   return (
      <Container>
         <Avatar />
         <Input
            type="text"
            placeholder="댓글 달기..."
            value={comment}
            onChange={handleChange}
         />
         <Button onClick={handleSubmit}>작성</Button>
      </Container>
   );
};

export default CreateComment;
