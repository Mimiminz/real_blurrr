package com.luckvicky.blur.infra.redisson;

import org.springframework.expression.spel.standard.SpelExpressionParser;
import org.springframework.expression.spel.support.StandardEvaluationContext;

public class CustomSpringELParser {

    public static Object getDynamicValue(String[] parameterNames, Object[] args, String key) {
        SpelExpressionParser parser = new SpelExpressionParser();
        StandardEvaluationContext context = new StandardEvaluationContext();

        for (int parameterNameIndex = 0; parameterNameIndex < parameterNames.length; parameterNameIndex++) {
            context.setVariable(parameterNames[parameterNameIndex], args[parameterNameIndex]);
        }

        return parser.parseExpression(key).getValue(context, Object.class);
    }

}
