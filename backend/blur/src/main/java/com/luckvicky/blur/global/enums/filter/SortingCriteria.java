package com.luckvicky.blur.global.enums.filter;

import static com.luckvicky.blur.global.constant.StringFormat.CRITERIA_COMMENT;
import static com.luckvicky.blur.global.constant.StringFormat.CRITERIA_LIKE;
import static com.luckvicky.blur.global.constant.StringFormat.CRITERIA_TIME;
import static com.luckvicky.blur.global.constant.StringFormat.CRITERIA_VIEW;

import com.luckvicky.blur.domain.board.exception.InvalidSortingCriteriaException;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum SortingCriteria {

    TIME(CRITERIA_TIME), LIKE(CRITERIA_LIKE), VIEW(CRITERIA_VIEW), COMMENT(CRITERIA_COMMENT);

    private final String criteria;

    public static SortingCriteria convertToEnum(String criteria) {

        SortingCriteria sortingCriteria;

        try {
            sortingCriteria = SortingCriteria.valueOf(criteria);
        } catch (IllegalArgumentException e) {
            throw new InvalidSortingCriteriaException();
        }

        return sortingCriteria;

    }


}
