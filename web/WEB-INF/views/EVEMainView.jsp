<%@ page language="java" pageEncoding="utf8" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <base href="<%=basePath%>">

    <title>Login</title>

    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="Login">
    <script type="text/javascript" src="/ext/ext-all-debug.js"></script>
    <script type="text/javascript" src="/ext/locale/ext-lang-zh_CN.js"></script>
    <script type="text/javascript" src="/js/EVE/Toast.js"></script>
    <script type="text/javascript" src="/js/EVE/VoteStore.js"></script>
    <script type="text/javascript" src="/js/EVE/VoteListView.js"></script>
    <script type="text/javascript" src="/js/EVE/AccountView.js"></script>
    <script type="text/javascript" src="/js/EVE/TaskStore.js"></script>
    <script type="text/javascript" src="/js/EVE/TaskListView.js"></script>
    <script type="text/javascript" src="/js/EVE/InformationListView.js"></script>
    <script type="text/javascript" src="/js/EVE/GambleView.js"></script>


    <script type="text/javascript" src="/js/EVE/MainView.js"></script>


    <link rel="stylesheet" type="text/css" href="ext/resources/css/ext-all-access.css">


</head>

<body>
<center>
    <div id=login></div>
</center>

</body>
</html>
