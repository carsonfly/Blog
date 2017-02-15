package Model;

import com.carsonfly.blog.dao.CommDao;
import com.carsonfly.blog.pojo.Category;
import org.junit.Test;

/**
 * Created by carson on 2016/5/27.
 */
public class TestHibernate {
    @Test
    public void test() {
        TestHibernate test = new TestHibernate();

        CommDao<Category> dao = CommDao.getInstance();
        Category userInfo = new Category();
        userInfo.setValue("ExtJS");


        dao.SaveOrUpdate(userInfo);

    }
}
