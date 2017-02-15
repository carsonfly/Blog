package com.carsonfly.blog.test;

import java.io.UnsupportedEncodingException;

/**
 * Created by carson on 2016/7/30.
 */
public class StringTest {
    public static void main(String[] args) throws UnsupportedEncodingException {
        String note = "\\xE2\\x80\\x8B\\xE8\\x8C\\x83";

        System.out.println(new String(note.getBytes(), "gbk"));

    }
}
