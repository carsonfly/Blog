package com.carsonfly.blog.pojo.eve;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by carson on 2016/7/26.
 */
@Entity
@Table(name = "tbl_walletrec")
public class EVETransferAccountJson {
    private Date dt;
    private String item;
    private int id;
    private Boolean hasRead;


    @GenericGenerator(name = "EVETransferAccountJsonIdGenerator", strategy = "increment")
    @Id
    @GeneratedValue(generator = "EVETransferAccountJsonIdGenerator")
    @Column(name = "id", unique = true, nullable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Column
    @Temporal(TemporalType.TIMESTAMP)
    public Date getDate() {
        return dt;
    }

    public void setDate(Date dt) {
        this.dt = dt;
    }

    @Column(length = 10000)
    public String getItem() {
        return item;
    }

    public void setItem(String item) {
        this.item = item;
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
        return "EVETransferAccountJson{" +
                "dt=" + dt +
                ", item='" + item + '\'' +
                ", id=" + id +
                ", hasRead=" + hasRead +
                '}';
    }

}
