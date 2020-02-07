select id from public."User";
-- delete from "User" where id = 'ck69kmjfm000o0777ribqygn2';
-- relations
select name,email from "Post", "User" where "Post".author = 'ck69p8i5z002h07771hskp8p7';
select * from "Post";