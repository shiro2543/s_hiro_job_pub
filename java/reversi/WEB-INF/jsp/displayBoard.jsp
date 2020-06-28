<%--displayBorad.jsp--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="model.*"%>
<%
Board board = (Board) session.getAttribute("board");
String stringBoard = board.getStringBoard();
%>
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width">
  <link rel="stylesheet" href="${pageContext.request.contextPath}/css/sanitize.css">
  <link rel="stylesheet" href="${pageContext.request.contextPath}/css/style.css">
</head>
<body>
<div class="container">
<%for(int i=0;i<8;i++) {%><!--
--><%for(int j=0;j<8;j++) {%><!--
--><%if(stringBoard.substring(8*i+j,8*i+j+1).equals("w")) {%><!--
--><span class="relative"><span class="white koma absolute"></span><span class="board"></span></span><!--
--><%} else if(stringBoard.substring(8*i+j,8*i+j+1).equals("b")) {%><!--
--><span class="relative"><span class="black koma absolute"></span><span class="board"></span></span><!--
--><%} else {%><!--
--><span class="relative"><span class="board"></span></span><%}%><!--
--><%}%><!--
--><%if(i!=7) {%><!--
--><br><!--
--><%}%>
<%}%>
</div>
</body>
</html>
