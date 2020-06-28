package model;

import java.io.Serializable;

public class ManualPlayer implements Serializable {
	private Masu color;
	
	public ManualPlayer(Masu color) {
		if(color == Masu.Empty) {
			throw new IllegalArgumentException("プレイヤーの色は空白にはなりません");
		}
		this.color = color;
	}

	public Masu getColor() { return this.color; }

	public Play play(int i, int j) {
		return new Play(this.color, i, j);
	}
}
