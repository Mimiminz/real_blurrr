package com.luckvicky.blur.domain.mycar.repository;

import static com.luckvicky.blur.domain.channelboard.model.entity.QMyCarBoard.myCarBoard;
import static com.luckvicky.blur.domain.member.model.entity.QMember.member;

import com.luckvicky.blur.domain.channel.model.entity.Channel;
import com.luckvicky.blur.domain.channelboard.model.entity.MyCarBoard;
import com.luckvicky.blur.global.enums.status.ActivateStatus;
import com.luckvicky.blur.global.util.DslUtil;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

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
                        myCarBoard.channel.eq(channel),
                        myCarBoard.status.eq(ActivateStatus.ACTIVE)
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(DslUtil.getSearchOrderSpec(pageable))
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

}
