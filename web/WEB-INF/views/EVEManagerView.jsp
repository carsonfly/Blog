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

    <script type="text/javascript" src="/js/EVE/manager/TransferAccountInformationStore.js"></script>
    <script type="text/javascript" src="/js/EVE/manager/TransferAccountInformationListView.js"></script>
    <script type="text/javascript" src="/js/EVE/manager/VoteStore.js"></script>
    <script type="text/javascript" src="/js/EVE/manager/VoteListView.js"></script>
    <script type="text/javascript" src="/js/EVE/manager/TaskStore.js"></script>
    <script type="text/javascript" src="/js/EVE/manager/TaskListView.js"></script>
    <script type="text/javascript" src="/js/EVE/manager/AwardStore.js"></script>
    <script type="text/javascript" src="/js/EVE/manager/AwardListView.js"></script>
    <script type="text/javascript" src="/js/EVE/manager/ISKStore.js"></script>
    <script type="text/javascript" src="/js/EVE/manager/ISKListView.js"></script>
    <script type="text/javascript" src="/js/EVE/manager/UserStore.js"></script>
    <script type="text/javascript" src="/js/EVE/manager/UserListView.js"></script>
    <script type="text/javascript" src="/js/EVE/manager/CenterPanel.js"></script>
    <script type="text/javascript" src="/js/EVE/manager/SidePanel.js"></script>
    <script type="text/javascript" src="/js/EVE/manager/MainManagerView.js"></script>


    <link rel="stylesheet" type="text/css" href="ext/resources/css/ext-all.css">


</head>

<body>
<center>
    <div id=login></div>
</center>

</body>
</html>
