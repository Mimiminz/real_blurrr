package com.luckvicky.blur.infra.redis.service;

public interface RedisAdapter {
    void saveOrUpdate(String key, String value);
    String getValue(String key);
    void delete(String key);
}
