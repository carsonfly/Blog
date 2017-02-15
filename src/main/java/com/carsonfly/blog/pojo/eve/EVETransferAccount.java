package com.carsonfly.blog.pojo.eve;

import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * Created by carson on 2016/7/26.
 */
@Entity
@org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.NONE)
public class EVETransferAccount {
    private String date;
    private String type;
    private String amount;
    private String balance;
    private String describe;
    private Boolean hasRead;

    private int id;

    @GenericGenerator(name = "EVETransferAccountIdGenerator", strategy = "increment")
    @Id
    @GeneratedValue(generator = "EVETransferAccountIdGenerator")
    @Column(name = "id", unique = true, nullable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Column
    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    @Column
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Column(length = 1000)
    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    @Column(length = 1000)
    public String getBalance() {
        return balance;
    }

    public void setBalance(String balance) {
        this.balance = balance;
    }

    @Column(length = 1000, name = "description")
    public String getDescribe() {

        return describe;
    }

    public void setDescribe(String describe) {

        this.describe = describe;
    }

    @Column
    public Boolean isHasRead() {
        return hasRead;
    }

    public void setHasRead(Boolean hasRead) {
        this.hasRead = hasRead;
    }

    @Override
    public String toString() {
        return "EVETransferAccount{" +
                "date=" + date +
                ", type='" + type + '\'' +
                ", amount='" + amount + '\'' +
                ", balance='" + balance + '\'' +
                ", describe='" + describe + '\'' +
                ", hasRead=" + hasRead +
                ", id=" + id +
                '}';
    }
}
