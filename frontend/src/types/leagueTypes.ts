export interface Member {
  id: string;
  profileUrl: string;
  nickname: string;
  carTitle: string;
}

export interface LeagueList {
  id: string;
  name: string;
  type: string;
  peopleCount: number;
}

export interface LeagueBoardItem {
  id: string;
  member: Member;
  title: string;
  createdAt: string;
  commentCount: number;
  likeCount: number;
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
  boardList: LeagueBoardItem[];
}

export interface moreTabProps {
  activeTabId: string;
  moreTabs: LeagueList[];
  activeTabName?: string;
}

export interface TabButtonProps {
  $isActive: boolean;
}

export interface UserTabProps {
  activeTabId: string;
  tabs: LeagueList[];
  mentionTabs: LeagueList[];
}

export interface BoardDetail {
  title: string;
  content: string;
  createdAt: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  member: Member;
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

export interface UserLeague {
  league: LeagueList;
}
