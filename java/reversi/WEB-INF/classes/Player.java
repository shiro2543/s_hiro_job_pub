package model;

import java.io.Serializable;

public abstract class Player implements Serializable {
	private Masu color;
	
	public Player(Masu color) {
		if(color == Masu.Empty) {
			throw new IllegalArgumentException("プレイヤーの色は空白にはなりません");
		}
		this.color = color;
	}
	public Masu getColor() { return this.color; }

	/**playメソッド
	 * 置きたいマス目を返す
	 * 高度なプレイヤーは、RulesクラスのgetMasu()から盤の状況を判別して、
	 * ルールを破らないようプレイしたり、勝てるように独自のアルゴリズムを
	 * 使用したり、といった実装を試みる
	 */
	public abstract Play play();
}
