<%--whitePlay.jsp--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="model.*"%>
<%
Board board = (Board) session.getAttribute("board");
String stringBoard = board.getStringBoard();
Integer turnNum = (Integer) session.getAttribute("turnNum");
String playingSide = (String) session.getAttribute("playingSide");
String started = (String) session.getAttribute("started");
String errorMsg = (String)session.getAttribute("errorMsg");
%>

<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width">
  <title>Reversi Playing</title>
  <link rel="stylesheet" href="${pageContext.request.contextPath}/css/sanitize.css">
  <link rel="stylesheet" href="${pageContext.request.contextPath}/css/style.css">
</head>

<body>
<jsp:include page="/WEB-INF/html/reversi_header.html" />

<div class="errormsg">
<%if(errorMsg != null) {%>
<%= errorMsg %><br>
<%}%>
</div>

<jsp:include page="displayBoard.jsp" />

<div class="status_and_input">
<p>白のターン</p>
<form action="/reversi/ControlMain" method="post">
<span class="input_label">横(0～7,→方向):</span><input type="text" name="coordinate_i"><br>
<span class="input_label">縦(0～7,↓方向):</span><input type="text" name="coordinate_j"><br>
<button type="submit">操作する(ターン進行)</button>
</form>
</div>

<jsp:include page="/WEB-INF/html/reversi_footer.html" />
</body>
</html>
