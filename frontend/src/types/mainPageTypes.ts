export interface ChennelInfo {
  id: string;
  name: string;
  imgUrl: string;
}

export interface HotBoardItem {
  id: string;
  channel: ChennelInfo;
  title: string;
  likeCount: number;
  commentCount: number;
}

export interface TodayCarItem {
  id: string;
  title: string;
  voteCount: number;
}
