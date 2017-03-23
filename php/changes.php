<?php
include 'dbconnection.php';
$num = mysqli_query($connect_todb, "SELECT COUNT(*) FROM `trucktrackingtable`");

if ($num->num_rows > 0) {
    // output data of each row
    while($row = $num->fetch_assoc()){
    	echo $row["COUNT(*)"];
    }
}


?>