package com.luckvicky.blur.global.enums.filter;

import static com.luckvicky.blur.global.constant.StringFormat.CRITERIA_COMMENT;
import static com.luckvicky.blur.global.constant.StringFormat.CRITERIA_LIKE;
import static com.luckvicky.blur.global.constant.StringFormat.CRITERIA_NAME;
import static com.luckvicky.blur.global.constant.StringFormat.CRITERIA_PEOPLE;
import static com.luckvicky.blur.global.constant.StringFormat.CRITERIA_TIME;
import static com.luckvicky.blur.global.constant.StringFormat.CRITERIA_VIEW;
import static com.luckvicky.blur.global.constant.StringFormat.CRITERIA_VOTE;

import com.luckvicky.blur.domain.board.exception.InvalidSortingCriteriaException;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum SortingCriteria {

    TIME(CRITERIA_TIME),
    LIKE(CRITERIA_LIKE),
    VIEW(CRITERIA_VIEW),
    COMMENT(CRITERIA_COMMENT),
    NAME(CRITERIA_NAME),
    PEOPLE(CRITERIA_PEOPLE),
    VOTE(CRITERIA_VOTE);

    private final String criteria;

    public static SortingCriteria convertToEnum(String criteria) {
        try {
            return SortingCriteria.valueOf(criteria);
        } catch (IllegalArgumentException e) {
            throw new InvalidSortingCriteriaException();
        }
    }

}
