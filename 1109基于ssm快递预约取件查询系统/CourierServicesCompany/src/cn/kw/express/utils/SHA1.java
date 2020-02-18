package cn.kw.express.utils;


import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;

/**
 * SHA1
 *
 */
public class SHA1 {

	private static final char[] HEX_DIGITS = { '0', '1', '2', '3', '4', '5','6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f' };
	
	/**
	 * Takes the raw bytes from the digest and formats them correct.
	 *
	 * @param bytes
	 *            the raw bytes from the digest.
	 * @return the formatted bytes.
	 */
	public static String getFormattedText(byte[] bytes) {
		int len = bytes.length;
		StringBuilder buf = new StringBuilder(len * 2);
		// 把密文转换成十六进制的字符串形式
		for (int j = 0; j < len; j++) { 			buf.append(HEX_DIGITS[(bytes[j] >> 4) & 0x0f]);
			buf.append(HEX_DIGITS[bytes[j] & 0x0f]);
		}
		return buf.toString();
	}
	
	public static final String encode(String str){
		if (str == null) {
			return null;
		}
		try {
			MessageDigest messageDigest = MessageDigest.getInstance("SHA1");
			messageDigest.update(str.getBytes());
			return getFormattedText(messageDigest.digest());
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
	 public static String getSHA1(String token, String timestamp, String nonce) throws NoSuchAlgorithmException  {
         String[] array = new String[] { token, timestamp, nonce };
         StringBuffer sb = new StringBuffer();
         // 字符串排序
         Arrays.sort(array);
         for (int i = 0; i < 3; i++) {
             sb.append(array[i]);
         }
         String str = sb.toString();
         // SHA1签名生成
         MessageDigest md = MessageDigest.getInstance("SHA-1");
         md.update(str.getBytes());
         byte[] digest = md.digest();

         StringBuffer hexstr = new StringBuffer();
         String shaHex = "";
         for (int i = 0; i < digest.length; i++) {
             shaHex = Integer.toHexString(digest[i] & 0xFF);
             if (shaHex.length() < 2) {
                 hexstr.append(0);
             }
             hexstr.append(shaHex);
         }
         return hexstr.toString();
 }
}
