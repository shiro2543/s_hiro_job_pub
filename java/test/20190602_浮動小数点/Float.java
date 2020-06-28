import java.util.Scanner;

public class Float {
	public static void main(String args[]) {
		System.out.print("input float number 's string expression: ");
		Scanner sc = new Scanner(System.in);
		String line = sc.nextLine();

		//��������
		//�����ɉ��L�̍�Ƃ�����
		//��������� . ���Ȃ��ꍇ�A���������݂̂Ƃ��ď���������

		String[] splited = line.split("\\.");

		//�킩��₷�����O�ɕύX
		String seisu = splited[0];
		String shosu = splited[1];
		System.out.println(float2expression(seisu,shosu));
	}
	public static String float2expression(String seisu, String shosu) {
		//con10to2���Ăяo���A����������ϊ�
		String seisuMod2 = int10to2(seisu);
		String shosuMod2 = xxx10to2(shosu);
		//System.out.println(seisuMod2 + "." + shosuMod2);

		//�����A�w���A���������낦��
		//����
		String kasuu = revZerofill(seisuMod2 + shosuMod2,23);
		//�w��
		int indextmp1 = ketasu(Integer.parseInt(seisuMod2));
		String indextmp2 = int10to2(new Integer(indextmp1).toString());
		String index = zerofill(indextmp2,8);

		//����
		//0�Ȃ琳��(�����ł͐��������������Ȃ�)
		int fugo = 0;

		//�o��
		//System.out.println(fugo + "|" + index + "|" + kasuu);
		return fugo + index + kasuu;
	}

	//10�i������������2�i�����������ɕϊ����郁�\�b�h
	private static String int10to2(String seisu) {
		//����������2�i���ɕϊ�
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

	//10�i������������2�i�����������ɕϊ����郁�\�b�h
	private static String xxx10to2(String shosu) {
		//loop�p�ϐ�
		StringBuilder sb = new StringBuilder();

		//str -> double�ϊ�
		double multi = conStr2Shosu(shosu);
		int mod = 0;
		int count = 0;
		int limit = 10;	//�����������ǂ��܂ł����̂ڂ邩

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

	//10�i�����̌����𐔂��郁�\�b�h
	private static int ketasu(int num) {
		int count = 0;
		while(num > 0) {
			num = num / 10;
			count++;
		}
		return count;
	}
	
	//10�i���������_�����w�茅������������
	private static double dev10(double num, int count) {
		while(count > 0) {
			num /= 10;
			count--;
		}
		return num;
	}

	//���������̕�����\���������ɕϊ�����
	private static double conStr2Shosu(String shosu) {
		double total = 0;
		for(int i = 0;i < shosu.length();i++) {
			int tmp = Integer.parseInt(shosu.substring(i,i+1));
			total += dev10(tmp,i+1);
		}
		return total;
	}

	//�w�肵�������ō�����0���߂�����
	private static String zerofill(String num, int keta) {
		StringBuilder sb = new StringBuilder();
		int zeronum = keta - ketasu(Integer.parseInt(num));
		for(int i = 0;i < zeronum;i++) {
			sb.append("0");
		}
		sb.append(num);
		return sb.toString();
	}
	//�w�肵�������ŉE����0���߂�����
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

