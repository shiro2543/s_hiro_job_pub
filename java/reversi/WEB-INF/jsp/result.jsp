<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="model.*"%>
<%
Board board = (Board) session.getAttribute("board");
String stringBoard = board.getStringBoard();
String errorMsg = (String)session.getAttribute("errorMsg");
int countw = ((Integer)session.getAttribute("countw")).intValue();
int countb = ((Integer)session.getAttribute("countb")).intValue();
String result;
if(countw > countb) {
	result="白の勝利！";
} else if(countw < countb) {
	result="黒の勝利！";
} else {
	result="引き分け...";
}
%>

<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Reversi Result</title>
</head>

<body>
<jsp:include page="../html/reversi_header.html" />

<div class="errormsg">
<%if(errorMsg != null) {%>
<%= errorMsg %><br>
<%}%>
</div>

<jsp:include page="displayBoard.jsp" />

<div class="status_and_input">
<p>結果表示</p>
<p>白:<%=countw%></p>
<p>黒:<%=countb%></p>
<p>結果:<%=result%></p>
</div>

<jsp:include page="../html/reversi_footer.html" />

</body>
</html>
