<?php
include 'dbconnection.php';
$date1 = json_encode($_POST['init']);
$date2 = json_encode($_POST['end']);


$result = mysqli_query($connect_todb, "SELECT latitude, longitude, time FROM trucktrackingtable WHERE `truckid`='1' AND `time` BETWEEN $date1 AND $date2 ORDER BY id_entry DESC");
//echo $date1,' ',$date2;
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()){
    	echo $row["latitude"],' ', $row["longitude"],' ',$row["time"],' ',$row["position"],'*';
    }
	
} else {			
    echo "No soy nada";
}
?>