package com.luckvicky.blur.global.enums.filter;

import static com.luckvicky.blur.global.constant.StringFormat.CONDITION_CONTENT;
import static com.luckvicky.blur.global.constant.StringFormat.CONDITION_NICKNAME;
import static com.luckvicky.blur.global.constant.StringFormat.CONDITION_TITLE;

import com.luckvicky.blur.domain.board.exception.InValidSearchConditionException;
import javax.naming.directory.InvalidSearchControlsException;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum SearchCondition {

    TITLE(CONDITION_TITLE), CONTENT(CONDITION_CONTENT), NICKNAME(CONDITION_NICKNAME);

    private final String condition;

    public static SearchCondition convertToEnum(String condition) {

        SearchCondition searchCondition;

        try {
            searchCondition = SearchCondition.valueOf(condition);
        } catch (IllegalArgumentException e) {
            throw new InValidSearchConditionException();
        }

        return searchCondition;

    }

}
