package model;

import java.util.*;
import model.*;
import java.io.Serializable;

public class ReversiMain {
	private static final int trynum = 3;	//1ターンにつき間違えられる上限
	private int whiteTryNum;
	private int blackTryNum;
	private Board board;
	private Rules rules;
	private ManualPlayer wside;
	private Player bside;
	
	public ReversiMain(Board board, ManualPlayer wSidePlayer, Player bSidePlayer, int whiteTryNum, int blackTryNum) {
		//ルール・ボードの生成
		this.board = board;
		this.rules = new Rules(board);
		//プレイヤーの生成
		this.wside = wSidePlayer;
		this.bside = bSidePlayer;
		this.whiteTryNum = whiteTryNum;
		this.blackTryNum = blackTryNum;
	}
	
	public int getTryNum() { return this.trynum; }
	
	public boolean whiteTurn(int i, int j) {
		int tmpWhiteTryNum = whiteTryNum + 1;
		if(tmpWhiteTryNum > this.trynum) {
			whiteTryNum = 0;
			return false;
		} else {
			whiteTryNum = tmpWhiteTryNum;
			return rules.judge(this.wside.play(i,j));
		}
	}
	
	public boolean blackTurn() {
		int tmpBlackTryNum = blackTryNum + 1;
		if(tmpBlackTryNum > this.trynum) {
			blackTryNum = 0;
			return false;
		} else {
			blackTryNum = tmpBlackTryNum;
			return rules.judge(this.bside.play());
		}
	}
	
	public int countw() { return rules.countWhite(); }
	public int countb() { return rules.countBlack(); }
}


