import React, { useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { CreateOption } from '@/types/channelType';
import { FiMinusSquare } from "react-icons/fi";

interface DraggableVotePopupProps {
   title: string;
   content: React.ReactNode;
   onClose: () => void;
   onOptionsChange: (options: CreateOption[]) => void;
   onVoteTitleChange: (title: string) => void;
   initialOptions: CreateOption[];
   initialVoteTitle: string;
}

const DraggableVotePopup: React.FC<DraggableVotePopupProps> = ({ title, content, onClose, onOptionsChange, onVoteTitleChange, initialOptions, initialVoteTitle }) => {

   return (
      <Overlay>
         <Popup>
            <Header>
               <Title>{title}</Title>
               <CloseButton onClick={onClose}>x</CloseButton>
            </Header>
            <Content>{content}</Content>
            <VoteForm
               onOptionsChange={onOptionsChange}
               onClose={onClose}
               onVoteTitleChange={onVoteTitleChange}
               initialOptions={initialOptions}
               initialVoteTitle={initialVoteTitle} />
         </Popup>
      </Overlay>
   );
};

interface VoteFormProps {
   onOptionsChange: (options: CreateOption[]) => void;
   onVoteTitleChange: (title: string) => void;
   onClose: () => void;
   initialOptions: CreateOption[]; // Add initialOptions prop
   initialVoteTitle: string;
}

const VoteForm: React.FC<VoteFormProps> = ({ onOptionsChange, onVoteTitleChange, onClose, initialOptions, initialVoteTitle }) => {
   const [voteTitle, setVoteTitle] = useState(initialVoteTitle);
   const [options, setOptions] = useState<CreateOption[]>(initialOptions.length > 0 ? initialOptions : [{ optionOrder: 1, content: '' }, { optionOrder: 2, content: '' }]);

   const handleVoteTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newTitle = e.target.value;
      setVoteTitle(newTitle);
      onVoteTitleChange(newTitle);
   };

   const handleOptionChange = (index: number, value: string) => {
      const newOptions = [...options];
      newOptions[index].content = value;
      setOptions(newOptions);
      onOptionsChange(newOptions);
   };

   const addOption = () => {
      if (options.length < 3) {
         setOptions([...options, { optionOrder: options.length + 1, content: '' }]);
      }
   };

   const removeOption = (index: number) => {
      if (options.length > 2) {
         const newOptions = options.filter((_, i) => i !== index).map((option, idx) => ({ ...option, optionOrder: idx + 1 }));
         setOptions(newOptions);
         onOptionsChange(newOptions);
      }
   };

   const handleCreateVote = () => {
      if (voteTitle.trim() && options.every(option => option.content.trim())) {
         onClose();
      } else {
         alert('투표 제목과 모든 옵션을 입력해주세요.');
      }
   };

   return (
      <VoteContainer>
         <OptionContainer>
            <VoteTitleInput
               placeholder="투표 제목을 입력하세요."
               value={voteTitle}
               onChange={handleVoteTitleChange}
            />
         </OptionContainer>
         {options.map((option, index) => (
            <OptionContainer key={index}>
               <OptionInput
                  placeholder={`옵션 ${option.optionOrder}`}
                  value={option.content}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
               />
               {options.length > 2 && (
                  <RemoveOptionButton onClick={() => removeOption(index)}><FiMinusSquare /></RemoveOptionButton>
               )}
            </OptionContainer>
         ))}
         {options.length < 3 && (
            <AddOptionButton onClick={addOption}>옵션 추가</AddOptionButton>
         )}
         <CreateVoteButton type="button" onClick={handleCreateVote}>투표 생성</CreateVoteButton>
      </VoteContainer>
   );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Popup = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: grab;
  max-width: 500px; /* 팝업의 최대 너비 설정 */
  width: 100%;
  box-sizing: border-box; /* 추가된 부분 */
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-right: 20px; /* 추가된 부분 */
`;

const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  padding-right: 20px; /* 추가된 부분 */
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

const Content = styled.div`
  font-size: 16px;
`;

const VoteContainer = styled.div`
  margin-top: 20px;
`;

const VoteTitleInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 2px solid #bbb;
  border-radius: 5px;
`;

const OptionContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const OptionInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const RemoveOptionButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  margin-left: 10px;
  color: #868686;
`;

const AddOptionButton = styled.button`
  width: 100%;
  padding: 10px;
  border: 1px dashed #ddd;
  border-radius: 5px;
  background: none;
  cursor: pointer;
`;

const CreateVoteButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #ffa600;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;

  &:hover {
    background-color: #FF900D;
  }
`;

export default React.memo(DraggableVotePopup);
