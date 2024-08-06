export type DashCamContentData = Pick<DashCamDetail, 'id' | 'member' | 'title' | 'createdAt' | 'videoUrl' | 'content' | 'mentionedLeagues'>;

export interface SimpleMember {
  id: string;
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

export interface DashCams {
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
   board: DashCamDetail | PromiseLike<DashCamDetail>;
   id: string;
   member: SimpleMember;
   title: string;
   viewCount: number;
   commentCount: number;
   likeCount: number;
   createdAt: string; // ISO 날짜 문자열을 가리킴
   videoUrl: string[];
   content: string;
   options: Option;
   mentionedLeagues: Mentioned[];
 }

 export interface Option {
  num: number;
  content: string;
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