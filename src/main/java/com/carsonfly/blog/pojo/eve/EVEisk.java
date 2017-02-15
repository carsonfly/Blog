package com.carsonfly.blog.pojo.eve;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by carson on 2016/5/31.
 */
@Entity
public class EVEisk {
    @GenericGenerator(name = "EVEiskIdGenerator", strategy = "increment")
    @Id
    @GeneratedValue(generator = "EVEiskIdGenerator")
    @Column(name = "id", unique = true, nullable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Column(precision = 20, scale = 2)
    public Double getIsk() {
        return isk;
    }

    public void setIsk(Double isk) {
        this.isk = isk;
    }

    @Column(length = 200)
    public String getPlayer() {
        return player;
    }

    public void setPlayer(String player) {
        this.player = player;
    }

    private int id;
    private Double isk;
    private String player;
    private Date time;

    @Column
    @Temporal(TemporalType.TIMESTAMP)
    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }
}
