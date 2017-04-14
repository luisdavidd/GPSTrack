
<head>
    <meta charset=utf-8>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SMT Solutions</title>
    <!-- Load Roboto font -->
    <link href='http://fonts.googleapis.com/css?family=Roboto:400,300,700&amp;subset=latin,latin-ext' rel='stylesheet' type='text/css'>
    <!-- Load css styles -->
    <link rel="stylesheet" type="text/css" href="css/bootstrap.css?n=1" />
    <link rel="stylesheet" type="text/css" href="css/bootstrap-responsive.css?n=1" />
    <link rel="stylesheet" type="text/css" href="css/style.css?n=1" />
    <link rel="stylesheet" type="text/css" href="css/pluton.css?n=1" />
    <link rel="stylesheet" type="text/css" href="css/jquery.cslider.css?n=1" />
    <link rel="stylesheet" type="text/css" href="css/jquery.bxslider.css?n=1" />
    <link rel="stylesheet" type="text/css" href="css/animate.css?n=1" />
    <!-- Fav and touch icons -->
    <link rel="shortcut icon" href="images/ico/favicon.ico">
    <link rel="stylesheet" type="text/css" href="css/styles.css?n=1" />
    <!-- <link rel="stylesheet" media="all" type="text/css" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
    <link rel="stylesheet" media="all" type="text/css" href="css/jquery-ui-timepicker-addon.css" /> -->
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css?n=1" rel="stylesheet"> 
    <link rel="stylesheet" type="text/css" href="css/daterangepicker.css?n=1" />
  

</head>
<style type="text/css">
    * {
        box-sizing: border-box;
    }
    .col1{
        width: 25%;
        float: left;
        padding: 15px;   
    }
    .col2{
        width: 70%;
        float: left;
        padding-left: 15px; 
        padding-top:30px;   
    }
    .minicol1{
        width: 50%;
        float: left;  
    }
    .minicol2{
        width: 50%;
        float: left;
        padding-left: 0px; 
        height:150px;
    }
    label > input{ /* HIDE RADIO */
      visibility: hidden; /* Makes input not-clickable */
      position: absolute; /* Remove input from document flow */
    }
    label > input + img{ /* IMAGE STYLES */
      cursor:pointer;
      border:2px solid transparent;
    }
    label > input:checked + img{ /* (RADIO CHECKED) IMAGE STYLES */
      border:2px solid #f89406;
      border-radius:25px;
    }
    div.boxi{
        width:20%;
        float:left;
        padding:25px;
        background-color:#000;
        border: 1px solid black;
        opacity:0.9;
        height:65%;
        margin-top:30px;
        margin-left:50px;
    }
    img.truck{
        width:150px;
        height:150px;
        padding-top:10px;
        padding-left:10px;
        padding-right:10px;
        padding-bottom:10px;
    }
</style>
<script type="text/javascript">
    var currentValue = 0;
    var globyx;
    function handleClick(myRadio) {
        console.log('Old value: ' + currentValue);
        console.log('New value: ' + myRadio.value);
        currentValue = myRadio.value;
        globyx = myRadio.value;
    }
</script>
<body class="master">
    <div class="mask"></div>

    <!---strat-wrap -->
    <div id="included"></div>
    <script type="text/javascript" src="http://code.jquery.com/jquery-1.11.0.min.js?n=1" ></script>
    <script src="js/jquery.js"></script> 
    <script> 
        $(function(){
          $("#included").load("header.html"); 
        });
    </script> 
    
    
    <script src="js/maphistoric.js?n=1"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCus7HdIsJX7I3Ny01zAZWVmwr6sy_Vky4&callback=initmapi" async defer></script>

    <!---start-contnet-->

    <div class="content">
        <!---start-about-us-->

        <div class="about-us">
            <div class="wrap">

                <div class="about-header">
                    
                        
                            <!-- mask elemet use for masking background image -->
                            <br>
                           

                            <h2 style="text-align:center;color:#fff;font-weight:bold">Date-Time Search</h2>

                            <div class="container">
                                <input type="text" name="daterange" id = "date" value="0" style="width:300px;display: block;margin:auto;background-color: white" />
                            </div>                
                            <br>   
                                <div class="boxi" style="border-radius: 25px;">
                                    <h2 style="text-align:center;color:#fece1a;font-weight:bold">Select Truck</h2>
                                    <form>
                                    <div style="height:150px">
                                        <div class="minicol1">
                                          <label>
                                            <input type="radio" name="trucks" value="truck1" onclick="handleClick(this);"/>
                                            <img src="http://pngimg.com/uploads/truck/truck_PNG16264.png" class="truck bootstrap-responsive">
                                          </label>
                                        </div>
                                        <div class="minicol2">
                                            <div style="padding-top:10px;padding-left:0px">
                                                <h3 style="color:#fff;">Truck 1</h3>
                                                <p style="color:#fff;padding-top:0px;margin-bottom:0px;font-size:18px">Plates: RXB-174 </p>
                                                <p style="color:#fff;padding-top:0px;margin-bottom:0px;font-size:18px">Driver: 7274 </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div style="height:150px">
                                        <br>
                                        <div class="minicol1">
                                          <label>
                                            <input type="radio" name="trucks" value="truck2" onclick="handleClick(this);"/>
                                            <img src="http://www.pngall.com/wp-content/uploads/2016/09/Cargo-Truck-Free-PNG-Image.png" class="truck bootstrap-responsive">
                                          </label>
                                        </div>
                                        <div class="minicol2">
                                            <div style="padding-top:10px;padding-left:0px">
                                            <h3 style="color:#fff;">Truck 2</h3>
                                            <p style="color:#fff;padding-top:0px;margin-bottom:0px;font-size:18px">Plates: MXO-798 </p>
                                            <p style="color:#fff;padding-top:0px;margin-bottom:0px;font-size:18px">Driver: 7927 </p>
                                            </div>
                                        </div>
                                        <br>
                                    </div>
                                    <div style="height:150px">
                                        <br><br>
                                        <div class="minicol1">
                                          <label>
                                            <input type="radio" name="trucks" value="bothtrucks" onclick="handleClick(this);"/>
                                            <img src="http://pngimg.com/uploads/truck/truck_PNG16264.png" class="truck bootstrap-responsive">
                                          </label>
                                        </div>
                                        <div class="minicol2">
                                            <div style="padding-top:10px;padding-left:0px">
                                                <h3 style="color:#fff;">Both Trucks</h3>
                                            </div>
                                        </div>
                                    </div>
                                    </form>
                                </div>

                            <div class="col2">
                                <div id="map" style="width:90%;height:65%; display: block;margin-left:0"></div>
                            </div>
                            
                            
                            
                            <br>
               </div>

            <!---End-about-->
         </div>
        <!---End-about-us-->
        
       
    </div>
     <div class="footer">
        <p style="font-size:20px">&copy; SMT Solutions - 2017 Copyright</p>
    </div>
    <!-- Footer section end -->
    <!-- ScrollUp button start -->
    <div class="scrollup">
        <a href="#">
            <i class="icon-up-open"></i>
        </a>
    </div>
    <script src="js/jquery.js"></script>
    <script type="text/javascript" src="js/jquery.mixitup.js?n=1"></script>
    <script type="text/javascript" src="js/bootstrap.js?n=1"></script>
    <script type="text/javascript" src="js/modernizr.custom.js?n=1"></script>
    <script type="text/javascript" src="js/jquery.bxslider.js?n=1"></script>
    <script type="text/javascript" src="js/jquery.cslider.js?n=1"></script>
    <script type="text/javascript" src="js/jquery.placeholder.js?n=1"></script>
    <script type="text/javascript" src="js/jquery.inview.js?n=1"></script>
    <!-- Load google maps api and call initializeMap function defined in app.js -->
    <!-- css3-mediaqueries.js for IE8 or older -->
    <script type="text/javascript" src="js/app.js?n=1"></script>

  

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js?n=1"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js?n=1"></script>
    <script type="text/javascript" src="js/moment.min.js?n=1"></script>
    <script type="text/javascript" src="js/daterangepicker.js?n=1"></script>
    <script>
        n =  new Date();
        y = n.getFullYear();
        m = n.getMonth() + 1;
        d = n.getDate();
        document.getElementById("date").innerHTML = y + "-" + m + "-" + d;
    </script>
    <script>
        var startDate;
        var endDate;
         
        $(function() {
            $('input[name="daterange"]').daterangepicker({
                timePicker: true,
                timePickerIncrement: 1,
                timePicker24Hour: true,
                timePickerSeconds: true,
                startDate: moment(),
                endDate: moment(),
                locale: {
                    format: 'YYYY-MM-DD H:mm:ss'
                },

                ranges: {

                   'Today': [moment().startOf('days'), moment()],
                   'Yesterday': [moment().subtract(1, 'days').startOf('days'), moment().subtract(1, 'days').endOf('days'),moment().startOf('date'),moment().endOf('date')],
                   'Last 7 Days': [moment().subtract(6, 'days'), moment(),moment().startOf('date'),moment().endOf('date')],
                   'Last 30 Days': [moment().subtract(29, 'days'), moment().startOf('hour'),moment().endOf('hour')],
                   'This Month': [moment().startOf('month'), moment().endOf('month'),moment().startOf('hour'),moment().endOf('hour')],
                   'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month'),moment().startOf('hour'),moment().endOf('hour')]
                }
            },
            function(start, end) {
                console.log("Callback has been called!");
                $('input[name="daterange"]').html(start.format('YYYY-MM-DD H:mm:ss') + ' * ' + end.format('YYYY-MM-DD H:mm:ss'));
                document.getElementById('date').value = start.format('YYYY-MM-DD H:mm:ss') + ' * ' + end.format('YYYY-MM-DD H:mm:ss');
                startDate = start;
                endDate = end;    
            }
            );

            
        });
    </script>
    <script type="text/javascript" src="js/picker.js?n=1"></script> 
</body>



