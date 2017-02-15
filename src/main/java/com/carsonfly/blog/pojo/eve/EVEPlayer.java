package com.carsonfly.blog.pojo.eve;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * Created by carson on 2016/5/31.
 */
@Entity
public class EVEPlayer {
    @GenericGenerator(name = "EVEPlayerIdGenerator", strategy = "increment")
    @Id
    @GeneratedValue(generator = "EVEPlayerIdGenerator")
    @Column(name = "id", unique = true, nullable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


    @Override
    public String toString() {
        return "EVEPlayer{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", password='" + password + '\'' +
                ", player='" + player + '\'' +
                ", isk=" + isk +
                '}';
    }

    private int id;

    public EVEPlayer(String name, String password) {
        this.name = name;
        this.password = password;
        this.player = "";
        this.isk = 0.0;
    }

    public EVEPlayer() {

    }

    private String name;
    private String password;
    private String player;
    private Double isk;

    @Column(precision = 20, scale = 2)
    public Double getIsk() {
        return isk;
    }

    public void setIsk(Double isk) {
        this.isk = isk;
    }

    @Column(length = 25)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(length = 25)
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Column(length = 200)
    public String getPlayer() {
        return player;
    }

    public void setPlayer(String player) {
        this.player = player;
    }
}
