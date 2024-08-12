package com.luckvicky.blur.domain.channelboard.repository;

import static com.luckvicky.blur.domain.channelboard.model.entity.QChannelBoard.channelBoard;
import static com.luckvicky.blur.domain.member.model.entity.QMember.member;

import com.luckvicky.blur.domain.channel.model.entity.Channel;
import com.luckvicky.blur.domain.channelboard.model.entity.ChannelBoard;
import com.luckvicky.blur.global.enums.filter.SortingCriteria;
import com.luckvicky.blur.global.enums.status.ActivateStatus;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Order;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

@Repository
public class ChannelBoardSearchRepositoryImpl implements ChannelBoardSearchRepository{

    public final JPAQueryFactory queryFactory;

    public ChannelBoardSearchRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    @Override
    public Page<ChannelBoard> findAllByKeywordAndChannel(Pageable pageable, ActivateStatus status, String keyword,
                                                         Channel channel) {

        List<ChannelBoard> channelBoardList = queryFactory.selectFrom(channelBoard)
                .leftJoin(channelBoard.member, member)
                .where(
                        createKeywordCondition(keyword),
                        channelBoard.channel.eq(channel),
                        channelBoard.status.eq(status)
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(getOrderSpec(pageable))
                .fetch();

        JPAQuery<Long> countQuery = queryFactory.select(channelBoard.count())
                .from(channelBoard)
                .where(
                        createKeywordCondition(keyword),
                        channelBoard.channel.eq(channel),
                        channelBoard.status.eq(status)
                );

        return PageableExecutionUtils.getPage(channelBoardList, pageable, countQuery::fetchOne);
    }

    private BooleanExpression createKeywordCondition(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return null;
        }
        String likeKeyword = "%" + keyword.trim() + "%";
        return channelBoard.title.like(likeKeyword)
                .or(channelBoard.content.like(likeKeyword));
    }


    private OrderSpecifier<?> getOrderSpec(Pageable pageable) {
        for (Order order : pageable.getSort()) {
            com.querydsl.core.types.Order dir =
                    order.isAscending() ? com.querydsl.core.types.Order.ASC : com.querydsl.core.types.Order.DESC;
            if (order.getProperty().equals(SortingCriteria.COMMENT.getCriteria())) {
                return new OrderSpecifier<>(dir, channelBoard.commentCount);
            } else if (order.getProperty().equals(SortingCriteria.TIME.getCriteria())) {
                return new OrderSpecifier<>(dir, channelBoard.createdAt);
            } else if (order.getProperty().equals(SortingCriteria.LIKE.getCriteria())) {
                return new OrderSpecifier<>(dir, channelBoard.likeCount);
            } else if (order.getProperty().equals(SortingCriteria.VIEW.getCriteria())) {
                return new OrderSpecifier<>(dir, channelBoard.viewCount);
            }
        }
        return null;
    }
}
