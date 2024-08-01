import { Member } from "./leagueTypes";

export interface Comment {
  id: string;
  member: Member;
  content: string;
  createdAt: string;
  status: string;
  replies: Comment[];
}

export interface CommentListProps {
  comments: Comment[];
  boardId: string;
  onCommentAdded: () => void;
}

export interface CreateCommentProps {
  boardId: string;
  isReply: boolean;
  commentId: string;
  onCommentAdded: () => void;
}

export interface CommentListItemProps {
  id: string;
  boardId: string;
  avatarUrl: string;
  userName: string;
  userDetail: string | null;
  text: string;
  time: string;
  onCommentAdded: () => void;
}

export interface NoCommentProps {
  isReply: boolean;
}
