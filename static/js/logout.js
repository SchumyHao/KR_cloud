
$(".user-logout").click(function () {
   $.post("/logout_servlet", {}, function (r, s) {
       window.location.href = 'login.html';
   }) ;
});