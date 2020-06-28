import java.util.*;
public class Hafman {
	private String orgStr;
	private int length;
	private ArrayStrBin asb;
	private String hafmanStr;

	public Hafman(String line) {
		//受け取るデータ形式
		//半角文字列
		//例: ajjfdy@asncf.dj,d
		this.orgStr = line;
		this.length = line.length();
		makeHafman();
	}

	public String getHafmanStr() { return this.hafmanStr; }

	private int calcsigma(int i) {
		int tmp = 0;
		while(i>0) {
			tmp += i;
			i--;
		}
		return tmp;
	}

	private void makeHafman() {
		//System.out.println("orgStr: " + orgStr);
		String sorted = Sort.strsort(orgStr);
		//System.out.println("sorted: " + sorted);
		StringBuilder uniqsb = new StringBuilder();
		uniqsb.append(sorted.charAt(0));
		for(int i=1;i < sorted.length();i++) {
			if(uniqsb.charAt(uniqsb.length() - 1) != sorted.charAt(i)) {
				uniqsb.append(sorted.charAt(i));
			}
		}
		String uniq = uniqsb.toString();
		int[] uniqnum = new int[uniq.length()];
		for(int i=0;i<uniqnum.length;i++) {uniqnum[i] = 0;}
		int tmp = 0;
		for(int i=0;i < sorted.length();i++) {
			//System.out.println("start: tmp,uniq i,sorted : " + tmp + "," + uniq.charAt(tmp) + " " + i + "," + sorted.charAt(i));
			if(uniq.charAt(tmp) != sorted.charAt(i)) {
				tmp++;
				uniqnum[tmp]++;
			} else {
				uniqnum[tmp]++;
			}
		}
		//print
		//System.out.print("uniq  : " + uniq + ",");
		//for(int i=0;i<uniqnum.length;i++) {
		//	System.out.print(uniqnum[i] + " ");
		//}
		//System.out.println();

		//test num sort
		//System.out.print("input 数字列を入力: ");
		//String line2 = sc.nextLine();
		//int[] integers = new int[line2.length()];
		//for(int i=0;i<line2.length();i++) {
		//	integers[i] = Integer.parseInt(line2.substring(i,i+1));
		//}
		//int[] sortedintegers = Sort.intsort(integers);
		//for(int i=0;i < sortedintegers.length;i++) {
		//	System.out.print(sortedintegers[i]);
		//}
		//System.out.println();

		//uniqnumsort , uniqsort を呼び出す
		
		//psi用にstring -> string[]に変換
		String[] uniqarray = new String[uniq.length()];
		for(int i=0;i<uniq.length();i++) {
			uniqarray[i] = uniq.substring(i,i+1);
		}

		PairStrInt uniqPsi = new PairStrInt(uniqarray,uniqnum);
		PairStrInt uniqsortPsi = uniqPsi.sort();
		//System.out.println("sorted: " + uniqsortPsi.stringStrs() + "," + uniqsortPsi.stringInts());

		//hafmanによるbinary列の作成
		this.asb = hafmanrec(uniqsortPsi);
		//this.asb.printArray();

		//hafman表現の文字列を作成
		hafmanconvert();

		//結果を出力
		//System.out.println(hafmanStr);

	}

	//hafman表現に元の文字列を変換
	private void hafmanconvert() {
		StringBuilder tmpsb = new StringBuilder();
		for(int i=0;i<orgStr.length();i++) {
			String orgstrsub = this.orgStr.substring(i,i+1);
			for(int j=0;j<this.asb.length();j++) {
				if(orgstrsub.equals(this.asb.getStr(j))) {
					String tmpstr = this.asb.getStringBin(j);
					tmpsb.append(tmpstr);
					//System.out.println("orgstrsub: " + orgstrsub);
					//System.out.println("tmpstr: " + tmpstr);
					//System.out.println("tmpsb: " + tmpsb.toString());
					break;
				}
			}
		}
		this.hafmanStr = tmpsb.toString();
	}

	//hafman木からbinary表現を作る再帰関数
	private ArrayStrBin hafmanrec(PairStrInt org) {
		//System.out.print("org strs: ");
		//System.out.println(org.stringStrs());
		//System.out.print("org Ints: ");
		//System.out.println(org.stringInts());

		int n = org.length();

		if(n == 1) {
			ArrayStrBin asb = new ArrayStrBin(org.getStrs());
			ArrayList<Binary> al = new ArrayList<Binary>();
			al.add(new Binary(1));
			asb.setBin(0,al);
			return asb;
		} else if(n == 2) {
			ArrayStrBin asb = new ArrayStrBin(org.getStrs());
			ArrayList<Binary> al1 = new ArrayList<Binary>();
			ArrayList<Binary> al2 = new ArrayList<Binary>();
			al1.add(new Binary(1));
			al2.add(new Binary(0));
			asb.setBin(0,al1);
			asb.setBin(1,al2);
			return asb;
		} else {
			int[] nextinttmp = new int[n - 1];
			for(int i=0;i<n-2;i++) {
				nextinttmp[i] = org.getInt(i);
			}
			nextinttmp[n-2] = org.getInt(n-2) + org.getInt(n-1);

			String[] nextstrtmp = new String[n-1];
			for(int i=0;i<n-2;i++) {
				nextstrtmp[i] = org.getStr(i);
			}
			nextstrtmp[n-2] = org.getStr(n-2) + org.getStr(n-1);
			PairStrInt nexttmp = new PairStrInt(nextstrtmp,nextinttmp);
			PairStrInt next = nexttmp.sort();
			
			//再帰呼び出し
			ArrayStrBin nextresult = this.hafmanrec(next);

			ArrayStrBin result = new ArrayStrBin(org.getStrs());

			for(int i=0;i<n - 2;i++) {
				for(int j=0;j<nextresult.length();j++) {
					if(org.getStr(i).equals(nextresult.getStr(j))) {
						result.setBin(i,nextresult.getBins(j));
					}
				}
			}

			String an1 = org.getStr(n - 2);
			String an2 = org.getStr(n - 1);
			String bn = an1 + an2;
			int indexbn = 0;
			for(int i=0;i<nextresult.length();i++) {
				if(nextresult.getStr(i).equals(bn)) {
					indexbn = i;
				}
			}
			result.setBin(n - 2,nextresult.getBins(indexbn));
			result.setBin(n - 1,nextresult.getBins(indexbn));
			result.addBin(n - 2,new Binary(1));
			result.addBin(n - 1,new Binary(0));
			
			//return
			return result;
		}
	}
}

class Binary {
	private boolean bin;
	public Binary(int i) {
		if(!(i==0||i==1)) {
			throw new IllegalArgumentException("不正な値です");
		}
		if(i == 0) {this.bin = false;}
		if(i == 1) {this.bin = true;}
	}
	public void setBin(int i) {
		if(!(i==0||i==1)) {
			throw new IllegalArgumentException("不正な値です");
		}
		if(i == 0) {this.bin = false;}
		if(i == 1) {this.bin = true;}
	}
	public int getBinInt() {
		if(this.bin) {
			return 0;
		} else {
			return 1;
		}
	}
}

class PairStrBin {
	private String str;
	private ArrayList<Binary> bins;

	public PairStrBin(String str, ArrayList<Binary> bins) {
		this.str = str;
		this.bins = bins;
	}
	public PairStrBin() {
		this.bins = new ArrayList<Binary>();
	}
	public int binLength() { return bins.size(); }
	public String getStr() { return this.str; }
	public ArrayList<Binary> getBins() { return this.bins; }
	public Binary getBin(int i) { return this.bins.get(i); }
	public String getStringBins() {
		StringBuilder tmpsb = new StringBuilder();
		for(int i=0;i<this.bins.size();i++) {
			tmpsb.append(bins.get(i).getBinInt());
		}
		return tmpsb.toString();
	}
	public void setStr(String str1) {
		this.str = str1;
	}
	public boolean addBin(Binary b) {
	      return bins.add(b);
	}
	public void setBin(ArrayList<Binary> alb) {
		int count = this.bins.size();
		for(int i=count;i>0;i--) {
			this.bins.remove(i);
		}
		this.bins.trimToSize();
		this.bins.addAll(alb);
	}
}

class ArrayStrBin {
	private PairStrBin[] psbs;
	ArrayStrBin(String[] strs) {
		this.psbs = new PairStrBin[strs.length];
		for(int i=0;i<psbs.length;i++) {
			psbs[i] = new PairStrBin();
			psbs[i].setStr(strs[i]);
		}
	}
	public int length() { return psbs.length; }

	public ArrayList<Binary> getBins(int i) {return this.psbs[i].getBins();}
	public Binary getBin(int whichpsb, int binindex) {
		return this.psbs[whichpsb].getBin(binindex);
	}
	public String getStr(int i) {return this.psbs[i].getStr();}
	public String getStringBin(int i) {
		StringBuilder sb = new StringBuilder();
		for(int j=0;j<psbs[i].binLength();j++) {
			sb.append(this.psbs[i].getBin(j).getBinInt());
			//System.out.println("sb: " + sb);
		}
		return sb.toString();
	}
	public void setBin(int i, ArrayList<Binary> alb) {
		psbs[i].setBin(alb);
	}
	public void addBin(int i, Binary b) {
		psbs[i].addBin(b);
	}
	
	public void printArray() {
		for(int i=0;i<this.psbs.length;i++) {
			System.out.println(this.psbs[i].getStr() + " " + this.psbs[i].getStringBins());
		}
	}
}

class PairStrInt {
	private String[] strs;
	private int[] nums;

	public PairStrInt(String[] strs, int[] nums) {
		this.strs = new String[strs.length];
		for(int i=0;i < strs.length;i++) {
			this.strs[i] = strs[i];
		}
		this.nums = new int[nums.length];
		for(int i=0;i < nums.length;i++) {
			this.nums[i] = nums[i];
		}
	}
	public PairStrInt(int length) {
		this(new String[length],new int[length]);
	}

	public void setStr(String str, int i) {
		this.strs[i] = str;
	}
	public void setInt(int num, int i) {
		this.nums[i] = num;
	}

	public String getStr(int i) { return this.strs[i]; }
	public String[] getStrs() { return this.strs; }
	public int getInt(int i) { return this.nums[i]; }
	public int[] getInts() {
		int[] tmp = new int[this.nums.length];
		for(int i=0;i<tmp.length;i++) {
			tmp[i] = this.nums[i];
		}
		return tmp;
	}
	public String stringInts() {
		StringBuilder sb = new StringBuilder();
		for(int i=0;i<this.nums.length;i++) {
			sb.append(nums[i] + " ");
		}
		return sb.toString();
	}
	public String stringStrs() {
		StringBuilder sb = new StringBuilder();
		for(int i=0;i<this.strs.length;i++) {
			sb.append(this.strs[i] + " ");
		}
		return sb.toString();
	}
	public int length() { return nums.length; }

	public PairStrInt sort() {
		//uniqnum の大きい順にuniq を並び替え
		//->uniqsort,uniqnumsort
		int[] numssort = Sort.intsort(nums);
		
		//uniqnumsort の動作確認
		//for(int i=0;i < numssort.length;i++) {
		//	System.out.print(numssort[i]);
		//}
		//System.out.println();

		//uniqの並び替え
		//usable : まだuniqsort に移行していない数字はtrue
		boolean[] usable = new boolean[nums.length];
		for(int i=0;i < usable.length;i++) {usable[i] = true;}

		String[] strsort = new String[this.strs.length];
		for(int i=0;i < numssort.length;i++) {
			for(int j=0;j<nums.length;j++) {
				//System.out.println();
				//System.out.println("uns,un: " + i + "," + j);
				//System.out.print("usable: ");
				//for(int k=0;k < usable.length;k++) {
					//if(usable[k]) {
					//	System.out.print("1");
					//} else {
					//	System.out.print("0");
					//}
				//}
				//System.out.println();
				if(usable[j]) {
					if(numssort[i] == nums[j]) {
						//strsorttmp.append(str.charAt(j));
						strsort[i] = strs[j];
						usable[j] = false;
						break;
					}
				}
			}
		}
		//System.out.println(strsort);
		return new PairStrInt(strsort,numssort);
	}
}

//heap sort
class Sort {
	//数字列を降順にソートする
	public static int[] intsort(int[] org) {
		return intsortrec(org,0);
	}
	private static int[] intsortrec(int[] org, int count) {
		//System.out.print("org: ");
		//printarray(org);
		//System.out.println("count: " + count);
		if(org.length <= 1) {
			return org;
		} else {
			int mid = org.length/2;
			//System.out.println("mid : " + org[mid]);
			int leftnum=0;
			int rightnum=0;
			for(int k=0;k<mid;k++) {
				if(org[k] >= org[mid]) {
					leftnum++;
				} else {
					rightnum++;
				}
			}
			for(int k=mid+1;k<org.length;k++) {
				if(org[k] >= org[mid]) {
					leftnum++;
				} else {
					rightnum++;
				}
			}
			int[] left = new int[leftnum];
			int[] right = new int[rightnum];
			
			int leftidx = 0;
			int rightidx = 0;
			for(int k=0;k<mid;k++) {
				if(org[k] >= org[mid]) {
					left[leftidx] = org[k];
					leftidx++;
				} else {
					right[rightidx] = org[k];
					rightidx++;
				}
				//System.out.println("lidx.ridx: " + leftidx + "," + rightidx);
				//System.out.print("left: ");
				//printarray(left);
				//System.out.print("right: ");
				//printarray(right);
			}
			for(int k=mid+1;k<org.length;k++) {
				if(org[k] >= org[mid]) {
					left[leftidx] = org[k];
					leftidx++;
				} else {
					right[rightidx] = org[k];
					rightidx++;
				}
				//System.out.println("lidx.ridx: " + leftidx + "," + rightidx);
				//System.out.print("left: ");
				//printarray(left);
				//System.out.print("right: ");
				//printarray(right);
			}
			int[] result = new int[org.length];

			count++;
			int[] leftsorted = intsortrec(left,count);
			int[] rightsorted = intsortrec(right,count);
			if(leftidx != 0 && rightidx != 0) {
				for(int i=0;i<leftsorted.length;i++) {
					result[i] = leftsorted[i];
				}
				result[leftsorted.length] = org[mid];
				for(int i=0;i<rightsorted.length;i++) {
					result[leftsorted.length + 1 + i] = rightsorted[i];
				}
			} else if(leftidx == 0) {
				result[0] = org[mid];
				for(int i=0;i<rightsorted.length;i++) {
					result[1 + i] = rightsorted[i];
				}
			} else if(rightidx == 0) {
				for(int i=0;i<leftsorted.length;i++) {
					result[i] = leftsorted[i];
				}
				result[leftsorted.length] = org[mid];
			}

			//return
			//System.out.println();
			//System.out.print("leftsorted: ");printarray(leftsorted);
			//System.out.print("rightsorted: ");printarray(rightsorted);
			//System.out.print("result: ");printarray(result);
			return result;
		}
	}

	public static String strsort(String org) {
		return strsortrec(org,0);
	}
	private static String strsortrec(String org,int count) {
		//System.out.println("sortrec start org: " + org);
		if(org.length() <= 1 ) {
			//System.out.println("sortrec return " + org);
			return org;
		} else {
			int mid = org.length()/2;
			//System.out.println("mid: " + org.charAt(mid));
			StringBuilder left = new StringBuilder();
			StringBuilder right = new StringBuilder();
			for(int k=0;k<mid;k++) {
				if(org.charAt(k) < org.charAt(mid)) {
					left.append(org.substring(k,k+1));
				} else if(org.charAt(k) >= org.charAt(mid)) {
					right.append(org.substring(k,k+1));
				}
			}
			for(int k=mid+1;k<org.length();k++) {
				if(org.charAt(k) < org.charAt(mid)) {
					left.append(org.substring(k,k+1));
				} else if(org.charAt(k) >= org.charAt(mid)) {
					right.append(org.substring(k,k+1));
				}
			}
			String result = strsortrec(left.toString(),count+1) + org.substring(mid,mid+1) + strsortrec(right.toString(),count+1);
			//System.out.println("sortrec return " + result);
			return result;
		}
	}

	private static void printarray(int[] ar) {
		for(int i=0;i<ar.length;i++) {
			System.out.print(ar[i]);
		}
		System.out.println();
	}
}
