export type DashCamContentData = Pick<DashCamDetail, 'id' | 'member' | 'title' | 'createdAt' | 'videoUrl' | 'content' | 'mentionedLeagues'>;

export interface SimpleMember {
  profileUrl: string;
  nickname: string;
  carTitle: string;
}

export interface PostMember {
  id: string;
  profileUrl: string;
  nickname: string;
  carTitle: string;
}

export interface Member {
  id: string;
  email: string;
  profileUrl: string;
  nickname: string;
  carModel: string;
  carTitle: string;
  carManufacture: string;
}

export interface Mentioned {
   name: string;
 }

export interface DashCamList {
  totalPages: number;
  totalElements: number;
  pageNumber: number;
  pageSize: number;
  content: DashCam[];
}

export interface DashCam {
  id: string;
  member: SimpleMember;
  title: string;
  viewCount: number;
  commentCount: number;
  likeCount: number;
  createdAt: string;
  videoUrl: string[];
  mentionedLeagues: Mentioned[];
}

export interface DashCamDetail {
   id: string;
   member: SimpleMember;
   title: string;
   viewCount: number;
   commentCount: number;
   likeCount: number;
   voteCount: number;
   createdAt: string; // ISO 날짜 문자열을 가리킴
   videoUrl: string[];
   content: string;
   mentionedLeagues: Mentioned[];
   liked: boolean;
 }

export interface Channels {
   id: string;
   name: string;
   img: string;
   info: string;
   owner: string;
   followCount: number;
   tags: Mentioned[];
 }

 export interface PostData {
  board: Posts;
  mentionedLeagues: Mentioned[];
}

 export interface Posts {
  id: string;
  member: PostMember;
  title: string;
  viewCount: number;
  commentCount: number;
  likeCount: number;
  createdAt: string; 
  content: string;
}

export interface PostInfo {
  id: string;
  name: string;
  imgUrl: string;
  info: string;
  owner: string;
  followCount: number;
  tags: Mentioned[];
  isFollowed: boolean;
}

export interface PostDetailData {
  board: PostDetail;
  mentionedLeagues: Mentioned[];
}

export interface PostDetail {
  id: string;
  member: PostMember;
  title: string;
  content: string;
  createdAt: string;
  viewCount: number;
  commentCount: number;
  likeCount: number;
  mentionedLeagues: Mentioned[];
  comments: Comment[];
  liked: boolean;
}

export interface PostDataInfo {
  totalPages: number;
  totalElements: number;
  pageNumber: number;
  pageSize: number;
  content: PostData[];
}

export interface Vote { 
  hasVoted: boolean;
  selectedOptionId: string;
  options: Option[];
}

export interface Option {
  id: string;
  optionOrder: number;
  content: string;
  voteCount: number;
 }
 