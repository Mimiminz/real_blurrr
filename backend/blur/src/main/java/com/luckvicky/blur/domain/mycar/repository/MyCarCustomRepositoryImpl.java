package com.luckvicky.blur.domain.mycar.repository;

import com.luckvicky.blur.domain.channel.model.entity.Channel;
import com.luckvicky.blur.domain.channel.model.entity.QChannel;
import com.luckvicky.blur.domain.channelboard.model.entity.MyCarBoard;

import com.luckvicky.blur.global.enums.filter.SortingCriteria;
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

import static com.luckvicky.blur.domain.channelboard.model.entity.QMyCarBoard.myCarBoard;
import static com.luckvicky.blur.domain.member.model.entity.QMember.member;

@Repository
public class MyCarCustomRepositoryImpl implements MyCarCustomRepository {

    private final JPAQueryFactory queryFactory;

    public MyCarCustomRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    @Override
    public Page<MyCarBoard> findAllByKeywordAndChannel(Pageable pageable, String keyword, Channel channel) {
        List<MyCarBoard> myCarBoardList = queryFactory.selectFrom(myCarBoard)
                .leftJoin(myCarBoard.member, member)
                .where(
                        createKeywordCondition(keyword),
                        myCarBoard.channel.eq(channel)
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(getOrderSpec(pageable))
                .fetch();

        JPAQuery<Long> count = queryFactory.select(myCarBoard.count())
                .from(myCarBoard)
                .where(createKeywordCondition(keyword));
        return PageableExecutionUtils.getPage(myCarBoardList, pageable, count::fetchOne);
    }

    private BooleanExpression createKeywordCondition(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return null;
        }
        String likeKeyword = "%" + keyword.trim() + "%";
        return myCarBoard.title.like(likeKeyword)
                .or(myCarBoard.content.like(likeKeyword));
    }

    private OrderSpecifier<?> getOrderSpec(Pageable pageable) {
        for (Order order : pageable.getSort()) {
            com.querydsl.core.types.Order dir =
                    order.isAscending() ? com.querydsl.core.types.Order.ASC : com.querydsl.core.types.Order.DESC;
            if (order.getProperty().equals(SortingCriteria.COMMENT.getCriteria())) {
                return new OrderSpecifier<>(dir, myCarBoard.commentCount);
            } else if (order.getProperty().equals(SortingCriteria.TIME.getCriteria())) {
                return new OrderSpecifier<>(dir, myCarBoard.createdAt);
            } else if (order.getProperty().equals(SortingCriteria.LIKE.getCriteria())) {
                return new OrderSpecifier<>(dir, myCarBoard.likeCount);
            } else if (order.getProperty().equals(SortingCriteria.VIEW.getCriteria())) {
                return new OrderSpecifier<>(dir, myCarBoard.viewCount);
            }
        }
        return null;
    }
}
