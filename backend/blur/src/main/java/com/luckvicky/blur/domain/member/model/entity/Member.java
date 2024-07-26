package com.luckvicky.blur.domain.member.model.entity;

import com.luckvicky.blur.global.model.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.annotations.DynamicUpdate;

@DynamicUpdate
@AllArgsConstructor
@Builder
@Getter
@Table(name = "members", uniqueConstraints = {
        @UniqueConstraint(name = "uniqueNickname", columnNames = {"nickname"}),
        @UniqueConstraint(name = "uniqueEmail", columnNames = {"email"})
})
@Entity
public class Member extends BaseEntity {

    @Column(nullable = false)
    private String profileUrl;

    @Column(nullable = false, length = 20, unique = true)
    private String nickname;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "is_auth")
    private boolean isAuth;

    @Column(name = "car_mode")
    private String carModel;

    @Column(name = "car_manufacture")
    private String carManufacture;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private Role role;

    private boolean carShow;

    private String carTitle;

    public Member() {
    }

    public void updatePassword(String password) {
        this.password = password;
    }

    public void updateImg(String imgurl) {
        this.profileUrl = imgurl;
    }

    public void updateNickname(String nickname) {
        this.nickname = nickname;
    }
}
