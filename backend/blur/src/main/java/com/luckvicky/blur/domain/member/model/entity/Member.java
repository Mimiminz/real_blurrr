package com.luckvicky.blur.domain.member.model.entity;

import com.luckvicky.blur.domain.channel.model.entity.Channel;
import com.luckvicky.blur.domain.member.model.dto.req.CarInfo;
import com.luckvicky.blur.global.model.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import java.util.HashSet;
import java.util.Set;
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

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "channel_member_follow",
            joinColumns = @JoinColumn(name = "member_id"),
            inverseJoinColumns = @JoinColumn(name = "channel_id"))
    private Set<Channel> followingChannels = new HashSet<>();

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

    public void updateRole(Role role) {
        this.role = role;
    }

    public void updateIsAuth(boolean isAuth) {
        this.isAuth = isAuth;
    }

    public void setCarInfo(CarInfo carInfo) {
        this.isAuth = true;
        this.role = Role.ROLE_AUTH_USER;
        this.carModel = carInfo.model();
        this.carManufacture = carInfo.brand();
        this.carTitle = carInfo.carTitle();
    }
}
