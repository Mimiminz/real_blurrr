import { NumberLengthEquals2 } from 'aws-sdk/clients/paymentcryptographydata';
import { likeState } from './boardType';
export type DashCamContentData = Pick<DashCamDetail, 'id' | 'member' | 'title' | 'createdAt' | 'videoUrl' | 'content' | 'mentionedLeagues'>;

export interface SimpleMember {
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

export interface ChannelInfo {
  content: Channels[];
  currentPage: number;
  first: boolean;
  hasNext: boolean;
}

export interface Channels {
   id: string;
   name: string;
   imgUrl: string;
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
  member: SimpleMember;
  title: string;
  viewCount: number;
  commentCount: number;
  likeCount: number;
  createdAt: string; 
  simpleContent: string;
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
  member: SimpleMember;
  title: string;
  content: string;
  viewCount: number;
  commentCount: number;
  likeCount: number;
  createdAt: string;
  comments: Comment[];
  mentionedLeagues: Mentioned[];
  liked: boolean;
  thumbNail?: string;
}

export interface PostDataInfo {
  totalPages: number;
  totalElements: number;
  pageNumber: number;
  pageSize: number;
  content: PostData[];
}

export interface BoastInfo {
  totalPages: number;
  totalElements: number;
  pageNumber: number;
  pageSize: number;
  content: Boasts[];
}

export interface Boasts {
  id: string;
  thumbNail: string;
  likeCnt: number;
  commentCnt: number;
  viewCnt: number;
  simpleMemberDto: SimpleMember;
}

export interface BoastDetail {
  id: string;
  member: SimpleMember;
  title: string;
  viewCount: number;
  commentCount: number;
  likeCount: number;
  createdAt: string;
  content: string;
  mentionedLeagues: Mentioned[];
  thumbNail: string;
  liked: boolean;
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
  thumbNail: string;
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
   createdAt: string;
   videos: Video[];
   content: string;
   mentionedLeagues: Mentioned[];
   liked: boolean;
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

export interface CreateOption{
  optionOrder: number;
  content: string;
}

export interface Video{
  videoOrder: number;
  videoUrl: string;
}