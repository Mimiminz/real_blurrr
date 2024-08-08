package com.luckvicky.blur.global.util;

import static com.luckvicky.blur.domain.channelboard.model.entity.QMyCarBoard.myCarBoard;

import com.luckvicky.blur.global.enums.filter.SortingCriteria;
import com.querydsl.core.types.OrderSpecifier;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Order;

public class DslUtil {

    public static OrderSpecifier<?> getSearchOrderSpec(Pageable pageable) {
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
