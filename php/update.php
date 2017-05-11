<?php
include 'dbconnection.php';
$sql = mysqli_query($connect_todb, "UPDATE `trucktrackingtable` SET `on`= '0' WHERE `on`= '1'");
if ($connect_todb->query($sql) === TRUE) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: " . $connect_todb->error;
}
?>