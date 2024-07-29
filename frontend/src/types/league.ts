// src/types/league.ts

export interface League {
  id: string;
  name: string;
  type: string;
  peopleCount: number;
}

export interface LeagueBoardItem {
  id: string;
  member: {
    id: string;
    nickname: string;
    carTitle: string;
  };
  title: string;
  createdAt: string;
  commentCount: number;
  likeCount: number;
}

export interface BoardListProps {
  leagueId: string;
  boardList: LeagueBoardItem[];
}

export interface LeagueBoardListItemProps {
  title: string;
  writer: string;
  writerCar: string;
  createdAt: string;
  likeCount: number;
  commentCount: number;
}
