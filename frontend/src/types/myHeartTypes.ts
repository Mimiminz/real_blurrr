export interface Member {
    profileUrl: string;
    nickname: string;
    carTitle: string;
  }
  
  export interface MyHeartItem {
    id: string;
    member: Member;
    title: string;
    createdAt: string;
    commentCount: number;
    likeCount: number;
  }
  
  export interface MyHeartListResponse {
    boards: MyHeartItem[];
  }