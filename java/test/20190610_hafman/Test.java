import java.util.Scanner;
public class Test {
	public static void main(String[] args) {

		int[] ints = new int[0];

		Scanner sc = new Scanner(System.in);
		System.out.print("orginal string: ");
		String line = sc.nextLine();
		Hafman hafman = new Hafman(line);
		System.out.println(hafman.getHafmanStr());
	}
}
