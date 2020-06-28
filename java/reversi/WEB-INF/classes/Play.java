package model;

public class Play {
	private Masu color;
	private int i;
	private int j;
	public Play(Masu color, int i, int j) {
		if(color == Masu.Empty) {
			throw new IllegalArgumentException("マスの色が empty です");
		}
		this.color = color;
		this.i = i;
		this.j = j;
	}
	public Masu getColor() { return this.color; }
	public int getI() { return this.i; }
	public int getJ() { return this.j; }
	public String toString() {
		if(color == Masu.White) {
			return "White,(" + i + "," + j + ")";
		} else {
			return "Black,(" + i + "," + j + ")";
		}

	}
}
