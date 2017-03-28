
<head>
    <meta charset=utf-8>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SMT Solutions</title>
    <!-- Load Roboto font -->
    <link href='http://fonts.googleapis.com/css?family=Roboto:400,300,700&amp;subset=latin,latin-ext' rel='stylesheet' type='text/css'>
    <!-- Load css styles -->
    <link rel="stylesheet" type="text/css" href="css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="css/bootstrap-responsive.css" />
    <link rel="stylesheet" type="text/css" href="css/style.css" />
    <link rel="stylesheet" type="text/css" href="css/pluton.css" />
    <link rel="stylesheet" type="text/css" href="css/jquery.cslider.css" />
    <link rel="stylesheet" type="text/css" href="css/jquery.bxslider.css" />
    <link rel="stylesheet" type="text/css" href="css/animate.css" />
    <!-- Fav and touch icons -->
    <link rel="shortcut icon" href="images/ico/favicon.ico">
    <link rel="stylesheet" type="text/css" href="css/styles.css" />
    <!-- <link rel="stylesheet" media="all" type="text/css" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
    <link rel="stylesheet" media="all" type="text/css" href="css/jquery-ui-timepicker-addon.css" /> -->
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="css/daterangepicker.css" />
  

</head>
<body class="master">
    <div class="mask"></div>

    <!---strat-wrap -->
    <script type="text/javascript" src="http://code.jquery.com/jquery-1.11.0.min.js" ></script>
    <div class="navbar">
        <div class="navbar-inner">
            <div class="container">
                <a href="#" class="brand">
                    <img src="images/logo3.png" width="800" height="774" alt="Logo" />
                    <!-- This is website logo -->
                </a>
                <!-- Navigation button, visible on small resolution -->
                <button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse" style="background:#000;color:#fff">
                    <i class="icon-menu"></i>
                </button>
                <!-- Main navigation -->
                <div class="nav-collapse collapse pull-right">
                    <ul class="nav" id="top-navigation">
                        <li class="active"><a href="index.html">Home</a></li>
                        <li><a href="consulta.php">Live Track</a></li>
                        <li><a href="historical.php">Historical</a></li>
                        <li><a href="index.html#about">About</a></li>
                        <li><a href="index.html#contact">Contact</a></li>
                    </ul>
                </div>
                <!-- End main navigation -->
            </div>
        </div>
    </div>

    <script src="js/maphistoric.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCus7HdIsJX7I3Ny01zAZWVmwr6sy_Vky4&callback=initmapi" async defer></script>

   
    <!---start-contnet-->

    <div class="content">
        <!---start-about-us-->

        <div class="about-us">
            <div class="wrap">

                <div class="about-header">
                    
                        
                            <!-- mask elemet use for masking background image -->
                            <br>

                            <div class="container">
                                <input type="text" name="daterange" id = "date" value="0" style="width:300px;display: block;margin:auto;background-color: white"/>
                            </div>                
                            <br><br>   
                            
                            <div id="map" style="width:75%;height:75%; display: block;margin: auto;"></div>
                            
                            
                            <br><br><br>    
               </div>

            <!---End-about-->
         </div>
        <!---End-about-us-->
        
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
    </div>
    <script src="js/jquery.js"></script>
    <script type="text/javascript" src="js/jquery.mixitup.js"></script>
    <script type="text/javascript" src="js/bootstrap.js"></script>
    <script type="text/javascript" src="js/modernizr.custom.js"></script>
    <script type="text/javascript" src="js/jquery.bxslider.js"></script>
    <script type="text/javascript" src="js/jquery.cslider.js"></script>
    <script type="text/javascript" src="js/jquery.placeholder.js"></script>
    <script type="text/javascript" src="js/jquery.inview.js"></script>
    <!-- Load google maps api and call initializeMap function defined in app.js -->
    <!-- css3-mediaqueries.js for IE8 or older -->
    <script type="text/javascript" src="js/app.js"></script>

    <!-- <script type="text/javascript" src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
    <script type="text/javascript" src="http://code.jquery.com/ui/1.10.3/jquery-ui.min.js"></script>
    <script type="text/javascript" src="js/jquery-ui-timepicker-addon.js"></script>
    <script type="text/javascript" src="js/jquery-ui-sliderAccess.js"></script> -->

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/moment.min.js"></script>
    <script type="text/javascript" src="js/daterangepicker.js"></script>
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
                startDate: moment().subtract('days', 29),
                endDate: moment(),
                locale: {
                    format: 'YYYY-MM-DD H:mm:ss'
                },
                ranges: {
                   'Today': [moment(), moment()],
                   'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days'),moment().startOf('date'),moment().endOf('date')],
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
   <!--  <script>
        $('input[name="daterange"]').on('apply.daterangepicker', function(ev, picker) {
           console.log(picker.startDate.format('YYYY-MM-DD H:mm:ss'));
           console.log(picker.endDate.format('YYYY-MM-DD H:mm:ss'));
        });        
    </script> -->
    <script type="text/javascript" src="js/picker.js"></script> 
</body>



