import java.util.Scanner;

//非線型方程式f(x) = 0 について、ここではf(x) = x^2 - N のみとする
public class Newton {
	public static void main(String args[]) {
		//データ取り込み
		//受け付けるデータ形式(想定)
		//int x0
		//int N
		//int ep : 許容値であり少しずつ減らす数
		Scanner sc = new Scanner(System.in);
		System.out.print("x0 = ");
		int x0 = sc.nextInt();
		System.out.print("N = ");
		int N = sc.nextInt();
		System.out.print("epciron = ");
		int ep = sc.nextInt();

		//Function 生成
		int[] tmp = {-N,0,1};
		Function fc = new Function(tmp);
		Function fcdush = fc.fdush();
		//Function fctouch = fc.ftouch(x0);

		int x = x0;
		int x1 = 0;
		while(x - x1 > ep) {
			x -= ep;
			Function fctouch = fc.ftouch(x);
			x1 = fctouch.liney2x(0);
		}

		System.out.println("f(x1) = 0 となるx1 は x1 = " + x1);
		//return x1;
	}

}

//2次までの関数を表すクラス
class Function {
	private int[] indexes;	//0,1,2番目の要素がそれぞれ0次,1次,2次のindex

	public Function(int[] indexes) {
		this.indexes = new int[indexes.length];
		for(int i=0;i < indexes.length;i++) {
			this.indexes[i] = indexes[i];
		}
	}

	public int f(int x) {
		int total = 0;
		for(int i=0;i < this.indexes.length;i++) {
			total += indexes[i] * decimal(x,i);
		}
		return total;
	}

	public Function fdush() {
		int[] newindexes = new int[this.indexes.length - 1];
		for(int i=1;i < indexes.length;i++) {
			newindexes[i-1] = indexes[i] * i;
		}
		return new Function(newindexes);
	}

	//int n : 累乗する対象
	//int count : 累乗する回数
	//count >= 0
	private static int decimal(int n, int count) {
		int total = 1;
		for(int i = 0;i < count;i++) {
			total *= n;
		}
		return total;
	}

	//接線
	public Function ftouch(int x0) {
		int y0 = f(x0);
		Function fd = fdush();
		int katamuki = fd.f(x0);
		int[] newindexes = {y0 - katamuki * x0,katamuki};
		return new Function(newindexes);
	}

	public void print() {
		for(int i = this.indexes.length - 1;i > 0;i--) {
			if(this.indexes[i] != 0) {
				System.out.print(this.indexes[i] + " * x^" + i + " + ");
			}
		}
		if(this.indexes[0] != 0) {
			System.out.println(this.indexes[0]);
		} else {
			System.out.println();
		}
			
	}

	//一次線形関数でyからxを求める
	public int liney2x(int y) {
		System.out.println("a2,a1 : " + this.indexes[1] + "," + this.indexes[0]);
		if(this.indexes.length != 2) {
			throw new IllegalArgumentException("liney2x: 不正な値です。一次関数にしか使えません");
		}
		int result = ( y - this.indexes[0] ) / this.indexes[1];
		System.out.println("y2x : " + result);
		return result;

	}
}
