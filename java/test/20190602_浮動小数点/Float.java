import java.util.Scanner;

public class Float {
	public static void main(String args[]) {
		System.out.print("input float number 's string expression: ");
		Scanner sc = new Scanner(System.in);
		String line = sc.nextLine();

		//※未実装
		//ここに下記の作業を書く
		//文字列内に . がない場合、整数部分のみとして処理させる

		String[] splited = line.split("\\.");

		//わかりやすい名前に変更
		String seisu = splited[0];
		String shosu = splited[1];
		System.out.println(float2expression(seisu,shosu));
	}
	public static String float2expression(String seisu, String shosu) {
		//con10to2を呼び出し、整数部分を変換
		String seisuMod2 = int10to2(seisu);
		String shosuMod2 = xxx10to2(shosu);
		//System.out.println(seisuMod2 + "." + shosuMod2);

		//仮数、指数、符号をそろえる
		//仮数
		String kasuu = revZerofill(seisuMod2 + shosuMod2,23);
		//指数
		int indextmp1 = ketasu(Integer.parseInt(seisuMod2));
		String indextmp2 = int10to2(new Integer(indextmp1).toString());
		String index = zerofill(indextmp2,8);

		//符号
		//0なら正数(ここでは正数しか処理しない)
		int fugo = 0;

		//出力
		//System.out.println(fugo + "|" + index + "|" + kasuu);
		return fugo + index + kasuu;
	}

	//10進数整数部分を2進数整数部分に変換するメソッド
	private static String int10to2(String seisu) {
		//整数部分を2進数に変換
		int devide = Integer.parseInt(seisu);
		int mod = 0;
		StringBuilder sb = new StringBuilder();
		while(devide != 0) {
			mod = devide % 2;
			devide = devide / 2;
			sb.append(mod);
		}
		return sb.reverse().toString();
	}

	//10進数小数部分を2進数小数部分に変換するメソッド
	private static String xxx10to2(String shosu) {
		//loop用変数
		StringBuilder sb = new StringBuilder();

		//str -> double変換
		double multi = conStr2Shosu(shosu);
		int mod = 0;
		int count = 0;
		int limit = 10;	//小数部分をどこまでさかのぼるか

		while(multi != 0 && count < limit) {
			if(multi * 2 >= 1) {
				mod = 1;
				multi = multi * 2 - 1;
			} else {
				mod = 0;
				multi = multi * 2;
			}
			sb.append(mod);
			count++;
			//System.out.println("count,mod,multi: " + count + "," + mod + "," + multi );
		}
		return sb.toString();
	}

	//10進整数の桁数を数えるメソッド
	private static int ketasu(int num) {
		int count = 0;
		while(num > 0) {
			num = num / 10;
			count++;
		}
		return count;
	}
	
	//10進浮動小数点数を指定桁数桁下げする
	private static double dev10(double num, int count) {
		while(count > 0) {
			num /= 10;
			count--;
		}
		return num;
	}

	//小数部分の文字列表現を小数に変換する
	private static double conStr2Shosu(String shosu) {
		double total = 0;
		for(int i = 0;i < shosu.length();i++) {
			int tmp = Integer.parseInt(shosu.substring(i,i+1));
			total += dev10(tmp,i+1);
		}
		return total;
	}

	//指定した桁数で左側に0埋めをする
	private static String zerofill(String num, int keta) {
		StringBuilder sb = new StringBuilder();
		int zeronum = keta - ketasu(Integer.parseInt(num));
		for(int i = 0;i < zeronum;i++) {
			sb.append("0");
		}
		sb.append(num);
		return sb.toString();
	}
	//指定した桁数で右側に0埋めをする
	private static String revZerofill(String num, int keta) {
		StringBuilder sb = new StringBuilder();
		int zeronum = keta - ketasu(Integer.parseInt(num));
		sb.append(num);
		for(int i = 0;i < zeronum;i++) {
			sb.append("0");
		}
		return sb.toString();
	}
}

