package model;

public class PlayerChild extends Player {
	public PlayerChild(Masu color) {
		super(color);
	}

	public Play play() {
		int i = (int)Math.floor(Math.random() * 8);
		int j = (int)Math.floor(Math.random() * 8);
		return new Play(super.getColor(), i, j);
	}
}
