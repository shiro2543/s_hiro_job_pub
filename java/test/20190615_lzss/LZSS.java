import java.util.*;

public class LZSS {
	/**Sliding Window*/
	private SlidingWindow sw;
	/**圧縮するか否かのリミット これより短い一致は圧縮しない*/
	private int limit = 5;
	/**入力された元データ*/
	private String orgdata;
	/**現在対象とするorgdata の範囲*/
	private StringBuilder orgTarget = new StringBuilder();
	/**結果を出力していく*/
	private ArrayList<String> resultdata = new ArrayList<String>();

	public LZSS(String orgdata, int swlen) {
		this.orgdata = orgdata;
		this.sw = new SlidingWindow(swlen);
		convert();
	}

	public String toString() {
		StringBuilder tmpsb = new StringBuilder();
		for(int i=0;i<this.resultdata.size();i++) {
			tmpsb.append(this.resultdata.get(i) + ",");
		}
		return tmpsb.toString();
	}
	public void printStatus() {
		sw.printStatus();
		System.out.println("orgTarget: " + this.orgTarget.toString());
		System.out.println("resultdata: " + this.toString());
	}

	private void convert() {
		//最初は一文字しかないので不一致確定
		resultdata.add("0");

		/**swの先頭がorgdata のどの位置にあたるか*/
		int head = 0;

		for(int i=0;i<orgdata.length();i++) {
			//元データから一文字読み込む
			orgTarget.append(orgdata.charAt(i));	

			//今対象としている文字列(orgTarget)と一致する文字列がswに
			//あるかどうか確認する
			int idx = sw.indexOf(orgTarget.toString());
			System.out.println();
			this.printStatus();
			System.out.println("head: " + head);
			System.out.println("idx: " + idx);
			System.out.println();
			//無い場合
			if(idx == -1) {
				if(orgTarget.length() == 1) {
					System.out.println("一致なし、orgtarget一文字");
					resultdata.add(orgTarget.toString());
					sw.append(orgTarget.toString());
					orgTarget.delete(0,1);
					head = idx;
				} else {
					System.out.println("一致なし、orgtarget2文字以上");
					if(orgTarget.length() - 1 >= this.limit) {
						System.out.println("かつ、orgtargetがlimit以上の長さ");
						resultdata.add("1");
						resultdata.add(new Integer(sw.getIndex() + head).toString());
						resultdata.add(new Integer(orgTarget.length() - 1).toString());
						sw.append(orgTarget.toString());
						orgTarget.delete(0,orgTarget.length() - 1);
						idx = sw.indexOf(orgTarget.toString());
						if(idx == -1) {
							resultdata.add("0");
							resultdata.add(orgTarget.toString());
							orgTarget.delete(0,1);
						}
						head = idx;
					} else {
						System.out.println("かつ、orgtargetがlimitより短いとき");
						for(int j=0;j<orgTarget.length() - 1;j++) {
							char[] tmpchararray = new char[1];
							tmpchararray[0] = orgTarget.charAt(j);
							resultdata.add(new String(tmpchararray));
						}
						sw.append(orgTarget.toString());
						orgTarget.delete(0,orgTarget.length() - 1);
						head = idx;
					}
				}
			//有る場合
			} else {
				System.out.println("一致あり");
				if(i == orgdata.length() - 1) {
					System.out.println("かつ、orgdata の最後までたどり終わったとき");
					if(orgTarget.length() >= this.limit) {
						System.out.println("かつ、orgtargetがlimit以上のとき");
						resultdata.add("1");
						resultdata.add(new Integer(sw.getIndex() + idx).toString());
						resultdata.add(new Integer(orgTarget.length()).toString());
						sw.append(orgTarget.toString());
						orgTarget.delete(0,orgTarget.length());
					} else {
						System.out.println("かつ、orgtargetがlimitより短いとき");
						for(int j=0;j<orgTarget.length();j++) {
							char[] tmpChAr = new char[1];
							tmpChAr[0] = orgTarget.charAt(j);
							resultdata.add(new String(tmpChAr));
						}
						sw.append(orgTarget.toString());
						orgTarget.delete(0,orgTarget.length());
					}
				} else if(orgTarget.length() == sw.length()) {
					System.out.println("かつ、orgtargetの長さがswの長さと同じになってしまったとき");
					resultdata.add("1");
					resultdata.add(new Integer(sw.getIndex() + idx).toString());
					resultdata.add(new Integer(orgTarget.length()).toString());
					sw.append(orgTarget.toString());
					orgTarget.delete(0,orgTarget.length());
					head = idx;
				} else {
					System.out.println("それ以外のとき");
					head = idx;
				}
			}
		}
	}
}

class SlidingWindow {
	private int length;
	private StringBuilder window;
	private int idx = 0;

	public SlidingWindow(int length) {
		this.length = length;
		this.window = new StringBuilder(length);
	}
	
	public void printStatus() {
		System.out.println("sw: " + this.window.toString());
		System.out.println("sw idx: " + this.idx);
	}

	public void append(String str) {
		if(this.window.length() == this.length) {
			this.idx += str.length();
			this.window.delete(0,str.length());
		}
		this.window.append(str);
	}
	public void append(char ch) {
		char[] charray = new char[1];
		charray[0] = ch;
		this.append(new String(charray));
	}
	public int getIndex() { return this.idx; }
	public int indexOf(String str) {
		return this.window.indexOf(str);
	}
	public void deleteTail() {
		int tmpint = this.window.length();
		window.delete(tmpint - 1, tmpint);
	}
	public void clear() {
		this.idx += this.window.length();
		window.delete(0,this.window.length());
	}
	public int length() { return this.length;}
	public String toString() {
		return this.window.toString();
	}
}
