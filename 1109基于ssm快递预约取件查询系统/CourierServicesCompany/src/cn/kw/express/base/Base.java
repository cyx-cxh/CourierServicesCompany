package cn.kw.express.base;

import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.text.DecimalFormat;
import java.util.Date;
import java.util.Random;

import static org.apache.commons.lang3.StringUtils.isBlank;
import static org.apache.commons.lang3.StringUtils.isNotBlank;

/**
 * Base
 */
public abstract class Base {

    protected Logger log = LoggerFactory.getLogger(getClass());

    protected static DateTimeFormatter DF_LONG = DateTimeFormat.forPattern("yyyyMMddHHmmss");
    protected static DateTimeFormatter DF_DAY = DateTimeFormat.forPattern("M月d日");
    protected static DecimalFormat decimalFormat = new DecimalFormat("#.00");

    public static final Random r = new Random();

    public static Date getDate() {
        return new Date();
    }

    public static boolean notEmpty(String var) {
        return isNotBlank(var);
    }

    public static boolean empty(String var) {
        return isBlank(var);
    }

    public static boolean notEmpty(Object var) {
        return null != var;
    }

    public static boolean empty(Object var) {
        return null == var;
    }

    public static boolean notEmpty(File file) {
        return null != file && file.exists();
    }

    public static boolean empty(File file) {
        return null == file || !file.exists();
    }

    public static boolean notEmpty(Object[] var) {
        return null != var && 0 < var.length;
    }

    public static boolean empty(Object[] var) {
        return null == var || 0 == var.length;
    }
}
