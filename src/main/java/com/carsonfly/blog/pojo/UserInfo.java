package com.carsonfly.blog.pojo;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * Created by carson on 2016/5/27.
 */
@Entity
public class UserInfo {
    private int id;
    private String userName;
    private String userPassword;

    @GenericGenerator(name = "UserIdGenerator", strategy = "increment")
    @Id
    @GeneratedValue(generator = "UserIdGenerator")
    @Column(name = "id", unique = true, nullable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Column(length = 100)
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    @Column(length = 100)
    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }


}
