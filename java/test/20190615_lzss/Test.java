import java.util.*;

public class Test {
	public static void main(String[] args) {
		int swlen = 20;

		//System.out.println("Sliding Window Test");
		//SlidingWindow sw = new SlidingWindow(swlen);
		//System.out.println("sw: " + sw);
		//
		//for(int i=0;i<swlen;i++) {
		//	sw.append(new Integer(i).toString());
		//}
		//System.out.println("sw: " + sw);
		//
		//sw.append("a");
		//System.out.println("sw: " + sw);
		//
		//System.out.println();
		//
		//System.out.println("")
		
		//System.out.println("LZSS Test");

		//Scanner sc = new Scanner(System.in);
		//System.out.print("lzss org string: ");
		//String org = sc.nextLine();
		//LZSS lzss = new LZSS(org, swlen);
		//System.out.println("lzss compressed: " + lzss);
		
		System.out.println("LZSS Test");
		String input = args[0];
		System.out.println("input string: " + input);
		LZSS lzss = new LZSS(input,swlen);
		System.out.println("input string: " + input);
		System.out.println("lzss compressed: " + lzss);
		
	}
}
