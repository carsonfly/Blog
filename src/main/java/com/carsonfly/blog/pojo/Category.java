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
public class Category {
    private Integer id;

    @Column(length = 200)
    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    private String value;

    @GenericGenerator(name = "CategoryIdGenerator", strategy = "increment")
    @Id
    @GeneratedValue(generator = "CategoryIdGenerator")
    @Column(name = "id", unique = true, nullable = false)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }


}
