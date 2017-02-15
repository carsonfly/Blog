package com.carsonfly.blog.pojo.eve;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by carson on 2016/5/31.
 */
@Entity
public class EVEVote implements Comparable<EVEVote> {
    @GenericGenerator(name = "EVEVoteIdGenerator", strategy = "increment")
    @Id
    @GeneratedValue(generator = "EVEVoteIdGenerator")
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
    public int getPlayer() {
        return player;
    }

    public void setPlayer(int player) {
        this.player = player;
    }


    @Column
    @Temporal(TemporalType.TIMESTAMP)
    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    private int id;
    private Double isk;
    private int player;
    private String taskName;
    private String userName;
    private int vote;
    private Date time;
    private int result;
    private int taskId;

    @Override
    public String toString() {
        return "EVEVote{" +
                "id=" + id +
                ", isk=" + isk +
                ", player=" + player +
                ", vote=" + vote +
                ", time=" + time +
                ", result=" + result +
                ", taskId=" + taskId +
                ", isWin=" + isWin +
                '}';
    }

    @Column
    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    @Column
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }


    @Column
    public boolean isWin() {
        return isWin;
    }

    public void setWin(boolean isWin) {
        this.isWin = isWin;
    }

    private boolean isWin;

    @Column
    public int getVote() {
        return vote;
    }

    public void setVote(int vote) {
        this.vote = vote;
    }

    @Column
    public int getResult() {
        return result;
    }

    public void setResult(int result) {
        this.result = result;
    }

    @Column
    public int getTaskId() {
        return taskId;
    }

    public void setTaskId(int taskId) {
        this.taskId = taskId;
    }


    @Override
    public int compareTo(EVEVote o) {
        if (o.getVote() < this.getVote()) {
            return 1;
        } else if (o.getVote() < this.getVote()) {
            return -1;
        } else {
            return 0;
        }
    }
}
