package com.carsonfly.blog.dao;


import org.apache.log4j.Logger;
import org.hibernate.*;
import org.hibernate.cfg.Configuration;
import org.hibernate.criterion.*;

import java.util.List;
import java.util.Map;
import java.util.Set;


public class CommDao<T> {
    protected Logger logger = Logger.getLogger(this.getClass());
    private Session session = null;

    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    private SessionFactory sessionFactory = null;
    private static CommDao dao;

    public static CommDao getInstance() {
        if (dao == null) {
            dao = new CommDao();
            try {
                Configuration cfg = new Configuration().configure("config/hibernate.cfg.xml");
                if (cfg != null) {

                    SessionFactory sessionFactory = cfg.buildSessionFactory();

                    Session session = sessionFactory.openSession();
                    dao.setSessionFactory(sessionFactory);
                    dao.setSession(session);
                }

            } catch (HibernateException e) {
                e.printStackTrace();
            }
        }
        return dao;
    }

    private CommDao() {

    }

    public T SaveOrUpdate(T obj) {

        Transaction transaction = session.beginTransaction();
        try {
            session.saveOrUpdate(obj);
        } catch (Exception e) {
            e.printStackTrace();
            session.clear();
            try {
                session.saveOrUpdate(obj);
            } catch (Exception e1) {
                System.out.println(obj);
                e1.printStackTrace();
            }
        }
        try {
            transaction.commit();
        } catch (RuntimeException e) {
            e.printStackTrace();
            try {
                session.getTransaction().rollback();
            } catch (RuntimeException rbe) {
                rbe.printStackTrace();
            }
        }

        return obj;
    }

    public T deleteObject(T obj) {
        Transaction transaction = session.beginTransaction();
        session.delete(obj);
        transaction.commit();
        return obj;
    }

    public T updateObject(T obj) {
        Transaction transaction = session.beginTransaction();
        session.saveOrUpdate(obj);
        transaction.commit();
        return obj;
    }

    /*��ѯģ��
     * @param <E>
     * @param cl
     * @param map
     * @param orderstr
     * @param beginPosition
     * @param count
     * @return list
     */
    public <E> List<E> criteriaQuery(final Class cl, final Map map, final String orderstr, final Integer beginPosition, final Integer count) {
        session.clear();
        Criteria criteria = session.createCriteria(cl);
        if (map != null) {
            Set keySet = map.keySet();

            Disjunction disjunction = Restrictions.disjunction();
            for (Object key : keySet) {
                if (key == null || map.get(key) == null) {
                    continue;
                }

                if (map.get(key).getClass() == String.class) {
                    disjunction.add(Restrictions.like(key.toString(), map.get(key).toString(), MatchMode.ANYWHERE));
                } else {
                    criteria.add(Expression.eq(key.toString(), map.get(key)));
                }
                criteria.add(disjunction);

            }
        }
        if (orderstr != null) {
            criteria.addOrder(Order.desc(orderstr));
        }
        if (beginPosition != null) {
            criteria.setFirstResult(beginPosition);
        } else {
            criteria.setFirstResult(0);
        }
        if (count != null) {
            criteria.setMaxResults(count);
        }
        try {
            return (List<E>) criteria.list();
        } catch (Exception e) {
            e.printStackTrace();
            return null;

        }
    }

    public <E> List<E> HQLQuery(String hql, String[] args) {
        Query query = session.createQuery(hql);
        if (args != null) {
            for (int i = 0; i < args.length; i++) {
                query.setString(i, args[i]);
            }
        }

        return query.list();
    }

    public <E> List<E> SQLQuery(String sql, String[] args, Class cl) {
        Query query = session.createSQLQuery(sql).addEntity(cl);
        for (int i = 0; i < args.length; i++) {
            query.setString(i, args[i]);
        }
        return query.list();
    }

    public int SQLExcute(String sql) {
        Transaction transaction = session.beginTransaction();
        int r = session.createSQLQuery(sql).executeUpdate();
        transaction.commit();
        return r;
    }

    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }

    public void closeSession() {
        if (session != null) {
            session.close();

        }
    }

    public int HQLExcute(String hql) {
        Transaction transaction = session.beginTransaction();
        Query query = session.createQuery(hql);
        int r = query.executeUpdate();
        transaction.commit();
        return r;
    }
}
