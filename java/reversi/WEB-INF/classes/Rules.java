package model;

public class Rules {
	private Board playingboard;
	int[] iarray = {-1,0,1,-1,1,-1,0,1};
	int[] jarray = {-1,-1,-1,0,0,1,1,1};

	public Rules(Board board) {
		this.playingboard = board;	
	}

	public Masu getMasu(int i,int j) {
		//System.out.println("rules getmasu 実行");
		return this.playingboard.getMasu(i,j);
	}
	private void setMasu(int i,int j, Masu masu) {
		this.playingboard.setMasu(i,j,masu);
	}
	public void printBoard() { this.playingboard.printBoard(); }


	/**白マスを数える*/
	public int countWhite() {
		int count = 0;
		for(int i=0;i<8;i++) {
			for(int j=0;j<8;j++) {
				if(getMasu(i,j) == Masu.White) {
					count++;
				}
			}
		}
		return count;
	}
	/**黒マスを数える*/
	public int countBlack() {
		int count = 0;
		for(int i=0;i<8;i++) {
			for(int j=0;j<8;j++) {
				if(getMasu(i,j) == Masu.Black) {
					count++;
				}
			}
		}
		return count;
	}

	/**操作内容に対して判定を下す*/
	public boolean judge(Play play) {
		int i = play.getI();
		int j = play.getJ();
		Masu color = play.getColor();
		//System.out.println("judge: 判定を始めます");
		if(this.getMasu(i,j) != Masu.Empty) {
			System.out.println("空でないマスにコマはおけません");
			return false;
		} else if(this.aroundIsEmpty(i,j)) {
			System.out.println("周りが全て空であるマスにコマはおけません");
			return false;
		} else {
			//System.out.println("コマが置けるかもしれません");
			boolean bl = false;
			for(int k=0;k<8;k++) {
				int nexti = i + iarray[k];
				int nextj = j + jarray[k];
				boolean existToErace = false;
				while(true) {
					//System.out.println("次のマスにおけるか判定します");
					int[] isedge = this.isEdge(i,j);
					if(nexti<0 || nexti>7 || nextj<0 || nextj>7) {
						//System.out.println("次のマスは盤の外なので進めません");
						break;
					} else if(this.getMasu(nexti,nextj) == Masu.Empty) {
						//System.out.println("次のマスはemptyなので進めません");
						break;
					} else if(this.getMasu(nexti,nextj) != color) {
						nexti += iarray[k];
						nextj += jarray[k];
						//System.out.println("次のマスは敵のコマがあります。進みます");
						existToErace = true;
					} else if(this.getMasu(nexti,nextj) == color) {
						//System.out.println("自分のコマを見つけました");
						if(!(existToErace)) {
							//System.out.println("ひっくりかえせる敵のコマがありません。");
							break;
						}
						int idistance = Math.abs(nexti - i);
						int jdistance = Math.abs(nextj - j);
						int itmp = i;
						int jtmp = j;
						for(int tmp=0;tmp < Math.max(idistance,jdistance);tmp++) {
							this.setMasu(itmp,jtmp,color);
							itmp += iarray[k];
							jtmp += jarray[k];
						}
						//System.out.println("敵のコマをひっくり返しました");
						bl = true;
						break;
					} else {
						throw new IllegalArgumentException("この分岐には来ないはずです");
					}
				}
			}
			if(bl) { System.out.println("コマが置けました。ひっくりかえせる敵のコマをひっくり返しました"); }
			else { System.out.println("コマが置けませんでした"); }
				
			return bl;
		}
	}

	private Masu[] chkAround(int i, int j) {
		Masu[] masuarray = new Masu[8];
		for(int k=0;k<masuarray.length;k++) {
			masuarray[k] = this.getMasu(i+iarray[k],j+jarray[k]);
		}
		return masuarray;
	}


	/**端かどうかを判定し、端なら方向を示すint[]を返す
	 * (0,0)なら端でない
	 * 例えば(1,1)なら右下が端
	 * */
	private int[] isEdge(int i,int j) {
		if(i==0) {
			if(j==0) {
				int[] result = {-1,-1};
				return result;
			} else if(j==7) {
				int[] result = {-1,1};
				return result;
			} else {
				int[] result = {-1,0};
				return result;
			}
		} else if(i==7) {
			if(j==0) {
				int[] result = {1,-1};
				return result;
			} else if(j==7) {
				int[] result = {1,1};
				return result;
			} else {
				int[] result = {1,0};
				return result;
			}
		} else {
			if(j==0) {
				int[] result = {0,-1};
				return result;
			} else if(j==7) {
				int[] result = {0,1};
				return result;
			} else {
				int[] result = {0,0};
				return result;
			}
		} 
	}

	private boolean aroundIsEmpty(int i, int j) {
		boolean bl = true;
		int[] isedge = this.isEdge(i,j);
		for(int k=0;k < this.iarray.length;k++) {
			for(int l=0;l<this.jarray.length;l++) {
				int itmp = iarray[k];
				int jtmp = jarray[l];
				if(itmp != isedge[0] && jtmp != isedge[1]) {
					if(this.getMasu(i+itmp,j+jtmp) != Masu.Empty) {
						bl = false;
					}
				} else if(isedge[0] == 0 && itmp == 0 && jtmp == -isedge[1]) {
					if(this.getMasu(i,j+jtmp) != Masu.Empty) {
						bl = false;
					}
				} else if(isedge[1] == 0 && jtmp == 0 && itmp == -isedge[0]) {
					if(this.getMasu(i+itmp,jtmp) != Masu.Empty) {
						bl = false;
					}
				} else if(isedge[0] == 0 && isedge[1] == 0) {
					int[] icrossarray = {0,-1,1,0};
					int[] jcrossarray = {-1,0,0,1};
					for(int caidx=0;caidx < icrossarray.length;caidx++) {
							if(this.getMasu(i+icrossarray[caidx],j+jcrossarray[caidx]) != Masu.Empty) {
								bl =false;
							}
					}
				}
			}
		}
		return bl;
	}

}
