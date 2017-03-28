<?php
include 'dbconnection.php';
$result = mysqli_query($connect_todb, "SELECT latitude, longitude, time FROM `trucktrackingtable` ORDER BY id_entry DESC");
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()){
    	echo $row["latitude"],' ', $row["longitude"],' ',$row["time"],' ',$row["position"],'*';
    }
	
} else {			
    echo 0;
}
?>