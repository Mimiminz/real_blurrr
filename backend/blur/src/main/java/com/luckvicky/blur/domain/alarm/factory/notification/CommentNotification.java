package com.luckvicky.blur.domain.alarm.factory.notification;

public class CommentNotification extends Notification {
    public CommentNotification(String boardTitle) {
        super(boardTitle + "에 댓글이 달렸습니다.",
                "새로운 댓글이 달렸습니다.",
                "");
    }
}
