package model;

import java.io.Serializable;

public class Board implements Serializable {
	private Masu[] board = new Masu[64];

	public Board() {
		for(int i=0;i<board.length;i++) {
			board[i] = Masu.Empty;
		}
		this.setMasu(3,3,Masu.White);
		this.setMasu(4,4,Masu.White);
		this.setMasu(3,4,Masu.Black);
		this.setMasu(4,3,Masu.Black);
	}

	public Masu getMasu(int i,int j) {
		return this.board[masuExchange(i,j)];
	}
	public void setMasu(int i,int j, Masu masu) {
		this.board[masuExchange(i,j)] = masu;
	}

	private int masuExchange(int i,int j) {
		return 8 * j + i;
	}

	public void printBoard() {
		for(int j=0;j<8;j++) {
			for(int i=0;i<8;i++) {
				if(board[masuExchange(i,j)] == Masu.White) {
					System.out.print("w ");
				} else if(board[masuExchange(i,j)] == Masu.Black) {
					System.out.print("b ");
				} else {
					System.out.print("_ ");
				}
			}
			System.out.println();
		}
	}
	
	public String getStringBoard() {
		StringBuffer sb = new StringBuffer();
		for(Masu masu: board) {
			if(masu == Masu.White) {
				sb.append("w");
			} else if(masu == Masu.Black) {
				sb.append("b");
			} else {
				sb.append("_");
			}
		}
		return sb.toString();
	}
}
