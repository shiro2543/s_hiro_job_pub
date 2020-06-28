//controller

package servlet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.ServletContext;

import model.*;

@WebServlet("/ControlMain")
public class ControlMain extends HttpServlet {
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		HttpSession session = request.getSession();
		String started = (String) session.getAttribute("started");
		String playingSide = (String)session.getAttribute("playingSide");
		if(started == null) {
			String tmpStr = "yes";
			session.setAttribute("started",tmpStr);
			Board board = new Board();
			Rules rules = new Rules(board);
			ManualPlayer whitePlayer = new ManualPlayer(Masu.White);
			Player blackPlayer = new PlayerChild(Masu.Black);
			session.setAttribute("board",board);
			session.setAttribute("whitePlayer", whitePlayer);
			session.setAttribute("blackPlayer", blackPlayer);
			session.setAttribute("whiteTryNum", new Integer(0));
			session.setAttribute("blackTryNum", new Integer(0));
			session.setAttribute("turnNum", new Integer(0));
			session.setAttribute("playingSide", "White");
			session.setAttribute("whiteGiveUp",false);
			session.setAttribute("blackGiveUp",false);
			RequestDispatcher dispatcher = request.getRequestDispatcher("/WEB-INF/jsp/whitePlay.jsp");
			dispatcher.forward(request, response);
		} else if(started.equals("yes") && playingSide.equals("Black")) {
			Board board = (Board)session.getAttribute("board");
			ManualPlayer whitePlayer = (ManualPlayer)session.getAttribute("whitePlayer");
			Player blackPlayer = (Player)session.getAttribute("blackPlayer");
			int whiteTryNum = ((Integer)session.getAttribute("whiteTryNum")).intValue();
			int blackTryNum = ((Integer)session.getAttribute("blackTryNum")).intValue();
			int turnNum = ((Integer)session.getAttribute("turnNum")).intValue();
			boolean whiteGiveUp = ((Boolean)session.getAttribute("whiteGiveUp")).booleanValue();
			boolean blackGiveUp = ((Boolean)session.getAttribute("blackGiveUp")).booleanValue();
			ReversiMain rMain = new ReversiMain(board, whitePlayer, blackPlayer, whiteTryNum, blackTryNum);
			if(rMain.blackTurn()) {
				//ターン進行・sessionに保存
				session.setAttribute("turnNum",new Integer(turnNum + 1));
				session.setAttribute("blackTryNum",new Integer(0));
				session.setAttribute("board",board);
				session.setAttribute("blackGiveUp",new Boolean(false));
				
				//ターン進行・次のページ(whiteの操作ぺージ)へフォワード
				session.setAttribute("playingSide","White");
				RequestDispatcher dispatcher = request.getRequestDispatcher("/WEB-INF/jsp/whitePlay.jsp");
				dispatcher.forward(request, response);
			} else {
				//操作ミス・ターン進行せず
				session.setAttribute("blackTryNum", new Integer(blackTryNum + 1));
				if(blackTryNum >= rMain.getTryNum()-1) {
					session.setAttribute("blackGiveUp", new Boolean(true));
					if(whiteGiveUp) {
						//双方ギブアップ、試合終了。結果ページへ
						session.setAttribute("errorMsg", "双方操作ミス 試合終了です");
						session.setAttribute("countw",new Integer(rMain.countw()));
						session.setAttribute("countb",new Integer(rMain.countb()));
						RequestDispatcher dispatcher = request.getRequestDispatcher("/WEB-INF/jsp/result.jsp");
						dispatcher.forward(request, response);
					} else {
						//黒だけ操作ミス、操作回数超過
						session.setAttribute("errorMsg", "操作ミス 操作が戻ってきます");
						session.setAttribute("playingSide","White");
						session.setAttribute("blackTryNum",new Integer(0));
						RequestDispatcher dispatcher = request.getRequestDispatcher("/WEB-INF/jsp/whitePlay.jsp");
						dispatcher.forward(request, response);
					}
				} else {
					//ターン進行せず・同じページ(blackの操作ぺージ)へフォワード
					session.setAttribute("errorMsg", "操作ミス もう一度操作します(残り回数: " + (rMain.getTryNum()-blackTryNum-1) + ")");
					RequestDispatcher dispatcher = request.getRequestDispatcher("/WEB-INF/jsp/blackPlay.jsp");
					dispatcher.forward(request, response);
				}
			}
		} else {
			throw new RuntimeException("とりえない値です");
		}
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		HttpSession session = request.getSession();
		String started = (String)session.getAttribute("started");
		String playingSide = (String)session.getAttribute("playingSide");
		if(started.equals("yes") && playingSide.equals("White")) {
			Board board = (Board)session.getAttribute("board");
			ManualPlayer whitePlayer = (ManualPlayer)session.getAttribute("whitePlayer");
			Player blackPlayer = (Player)session.getAttribute("blackPlayer");
			int whiteTryNum = ((Integer)session.getAttribute("whiteTryNum")).intValue();
			int blackTryNum = ((Integer)session.getAttribute("blackTryNum")).intValue();
			int turnNum = ((Integer)session.getAttribute("turnNum")).intValue();
			boolean whiteGiveUp = ((Boolean)session.getAttribute("whiteGiveUp")).booleanValue();
			boolean blackGiveUp = ((Boolean)session.getAttribute("blackGiveUp")).booleanValue();
			String strI = request.getParameter("coordinate_i");
			String strJ = request.getParameter("coordinate_j");
			boolean coordinate_get = true;
			int i = -1;
			int j = -1;
			if(strI.equals("")||strJ.equals("")||strI==null||strJ==null) {
				coordinate_get = false;
			} else {
				i = Integer.parseInt(strI);
				j = Integer.parseInt(strJ);
			}
			
			ReversiMain rMain = new ReversiMain(board, whitePlayer, blackPlayer, whiteTryNum, blackTryNum);
			
			if(coordinate_get&&rMain.whiteTurn(i,j)) {
				//ターン進行・sessionに保存
				session.setAttribute("turnNum",new Integer(turnNum + 1));
				session.setAttribute("whiteTryNum",new Integer(0));
				session.setAttribute("board",board);
				session.setAttribute("whiteGiveUp", new Boolean(false));
				
				//ターン進行・次のページ(blackの操作ぺージ)へフォワード
				session.setAttribute("playingSide","Black");
				RequestDispatcher dispatcher = request.getRequestDispatcher("/WEB-INF/jsp/blackPlay.jsp");
				dispatcher.forward(request, response);
			} else {
				//ターン進行せず・sessionにトライ回数だけ保存
				session.setAttribute("whiteTryNum", new Integer(whiteTryNum + 1));
				if(whiteTryNum >= rMain.getTryNum()-1) {
					session.setAttribute("whiteGiveUp", new Boolean(true));
					if(blackGiveUp) {
						//双方ギブアップ、試合終了。結果ページへ
						session.setAttribute("errorMsg", "双方操作ミス 試合終了です");
						session.setAttribute("countw",new Integer(rMain.countw()));
						session.setAttribute("countb",new Integer(rMain.countb()));
						RequestDispatcher dispatcher = request.getRequestDispatcher("/WEB-INF/jsp/result.jsp");
						dispatcher.forward(request, response);
					} else {
						//白だけ操作ミス、操作回数超過
						session.setAttribute("errorMsg", "操作ミス 操作が相手に移ります");
						session.setAttribute("playingSide","Black");
						session.setAttribute("whiteTryNum",new Integer(0));
						RequestDispatcher dispatcher = request.getRequestDispatcher("/WEB-INF/jsp/blackPlay.jsp");
						dispatcher.forward(request, response);
					}
				} else {
					//ターン進行せず・同じページ(whiteの操作ぺージ)へフォワード
					session.setAttribute("errorMsg", "操作ミス もう一度操作してください(残り回数: " + (rMain.getTryNum()-whiteTryNum-1) + ")");
					RequestDispatcher dispatcher = request.getRequestDispatcher("/WEB-INF/jsp/whitePlay.jsp");
					dispatcher.forward(request, response);
				}
			}
		} else {
			throw new IllegalArgumentException("ありえない分岐です");
		}
	}
}
