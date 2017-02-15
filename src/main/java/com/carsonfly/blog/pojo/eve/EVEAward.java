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
public class EVEAward {
    @GenericGenerator(name = "EVEAwardIdGenerator", strategy = "increment")
    @Id
    @GeneratedValue(generator = "EVEAwardIdGenerator")
    @Column(name = "id", unique = true, nullable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


    private int id;
    private int level;
    private String itemName;
    private int cycle;
    private int part;
    private int amount;
    private Double value;

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
    public int getCycle() {
        return cycle;
    }

    public void setCycle(int cycle) {
        this.cycle = cycle;
    }

    @Column
    public int getPart() {
        return part;
    }

    public void setPart(int part) {
        this.part = part;
    }

    @Column
    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    @Column
    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }
}
