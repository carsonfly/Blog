package com.carsonfly.blog.pojo.eve;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by carson on 2016/5/31.
 */
@Entity
public class EVETask {
    @GenericGenerator(name = "EVETaskIdGenerator", strategy = "increment")
    @Id
    @GeneratedValue(generator = "EVETaskIdGenerator")
    @Column(name = "id", unique = true, nullable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


    private int id;

    @Column
    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    @Column(length = 500)
    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    @Column
    @Temporal(TemporalType.TIMESTAMP)
    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    @Column
    @Temporal(TemporalType.TIMESTAMP)
    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    @Column
    public int getPart() {
        return part;
    }

    public void setPart(int part) {
        this.part = part;
    }

    @Column
    public int getDone() {
        return done;
    }

    public void setDone(int done) {
        this.done = done;
    }

    @Column
    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    private int level;
    private String itemName;
    private Date startTime;
    private Date endTime;
    private int part;
    private int done;
    private int winNumber;
    private Double value;
    private Integer remainPart;
    private String note;

    @Column
    public Integer getRemainPart() {
        return remainPart;
    }

    public void setRemainPart(Integer remainPart) {
        this.remainPart = remainPart;
    }

    @Column(length = 1000)
    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    @Override
    public String toString() {
        return "EVETask{" +
                "id=" + id +
                ", level=" + level +
                ", itemName='" + itemName + '\'' +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
                ", part=" + part +
                ", done=" + done +
                ", winNumber=" + winNumber +
                ", value=" + value +
                ", remainPart=" + remainPart +
                ", note='" + note + '\'' +
                '}';
    }

    @Column
    public int getWinNumber() {
        return winNumber;
    }

    public void setWinNumber(int winNumber) {
        this.winNumber = winNumber;
    }
}
