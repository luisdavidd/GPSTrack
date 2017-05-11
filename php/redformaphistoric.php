<?php
include 'dbconnection.php';
$result = mysqli_query($connect_todb, "SELECT t.latitude, t.longitude, t.time, t.route, f.name_person,f.pathimg FROM `trucktrackingtable` as t,faces f where f.id_faces=t.face ORDER BY id_entry DESC;");
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()){
    	echo $row["latitude"],' ', $row["longitude"],' ',$row["time"],' ',$row["route"],' ',$row["name_person"],' ',$row["pathimg"],'*';
    }
	
} else {			
    echo 0;
}
?>