<?php
  //insert into databse
  $db_host = "localhost";
  $db_user = "sagarntd_fdbker";
  $db_pass = "Hf=t+vaDwWr}";
  $db_name = "sagarntd_tss_feedbacks";
  $db_insert_status = "";


  $score   = $_POST['usefulness-score'];
  $role   = $_POST['user-role'];
  $content  = nl2br($_POST['message']);

  $db_link = mysql_connect($db_host, $db_user, $db_pass);
  if($db_link) {
    if(mysql_select_db($db_name, $db_link)) {
      $query = 'INSERT INTO ui_feedbacks '.
               '(usefulness_score, user_role, message) '.
               'VALUES ( '.'"'.$score.'", '.'"'.$role.'", '.'"'.$content.'"'.' )';
      $db_insert_status = mysql_query($query, $db_link);
      $db_insert_status = 'DB Insertion Status : '.$db_insert_status;
    }else{
      $db_insert_status = "DB Error : " . mysql_error();
    }
  }else{
    $db_insert_status = "DB Error : " . mysql_error();
  }
  mysql_close($db_link);

  //send mail
  $sendto   = "contact@sagarsutar.com";
  $sendVia  = "uifeedback@sagarsutar.com";

  $subject  = "New UI Feedback";
  $headers  = "From: " . strip_tags($sendVia) . "\r\n";
  $headers .= "MIME-Version: 1.0\r\n";
  $headers .= "Content-Type: text/html;charset=utf-8 \r\n";

  $msg  = "<html><body style='font-family:Arial,sans-serif;'>";
  $msg .= "<h2 style='font-weight:bold;border-bottom:2px solid #4AAEDE;padding-bottom:3px;'>Message</h2>\r\n";
  $msg .= "<p><strong>Score:</strong> ".$score."</p>\r\n";
  $msg .= "<p><strong>User role:</strong> ".$role."</p>\r\n";
  $msg .= "<p><strong>Message:</strong> ".$content."</p>\r\n";
  $msg .= "<hr>\r\n";
  $msg .= "<p>".$db_insert_status."</p>\r\n";
  $msg .= "</body></html>";
  
  if(@mail($sendto, $subject, $msg, $headers)) {
  	echo "true";
  } else {
  	echo "false";
  }

?>