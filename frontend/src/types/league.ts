// src/types/league.ts

export interface LeagueList {
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

export interface boardListProp {
  leagueId: string;
  criteria: string;
}

export interface Tab {
  id: string;
  name: string;
  type: string;
}

export interface moreTabProps {
  activeTabId: string;
  moreTabs: Tab[];
  activeTabName?: string;
}

export interface TabButtonProps {
  $isActive: boolean;
}

export interface UserTabProps {
  activeTabId: string;
  tabs: Tab[];
  mentionTabs: Tab[];
}

export interface Comment {
  id: string;
  member: {
    id: string;
    profileUrl: string;
    nickname: string;
    carTitle: string;
  };
  content: string;
  createdAt: string;
  status: string;
  replies: Comment[];
}

export interface BoardDetail {
  title: string;
  content: string;
  createdAt: string;
  viewCount: number;
  likeCount: number;
  member: {
    id: string;
    profileUrl: string;
    nickname: string;
    carTitle: string;
  };
  comments: Comment[];
}

export interface BoardDetailProps {
  title: string;
  createdAt: string;
  viewCount: number;
  likeCount: number;
  username: string;
  authorprofileUrl: string;
  authorCarTitle: string;
}
