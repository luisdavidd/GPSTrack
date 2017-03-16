$(window).load(loadjs());   //Wait the page to be fully loaded (Inner frames, images, etc)
// var flightPath;

var map;
var flightPlanCoordinates;
var flightPath;
var flightBlack;
var markerf;
var markeri;
var myinitialpot;
var myLatLnglast;


function loadjs(){
    init();
    
}

function initmap(){
    
     
     var myOptions = {
         //scrollwheel: false,
         //draggable: false,
         disableDefaultUI: false,
         mapTypeControl: true,
         scaleControl: true,
         zoomControl: true,
         center: new google.maps.LatLng(+11.01930, -74.85152),
         zoom: 17
     };

     map = new google.maps.Map(document.getElementById('map'), myOptions);
    flightPlanCoordinates = [];

    //flightPath.setMap(null);
    flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        //strokeColor: '#000000',
        strokeColor: '#FFCF00',
        strokeOpacity: 2.0,
        strokeWeight: 5
        });

    flightBlack = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        clickable: false,
        //strokeColor: '#000000',
        strokeColor: '#FFCF00',
        strokeOpacity: 2.0,
        strokeWeight: 5
        });
    
    myLatLnglast= new google.maps.LatLng(+11.01930, -74.85152);
    myinitialpot = new google.maps.LatLng(+11.01930, -74.85152);
    markerf = new google.maps.Marker({
        position: myLatLnglast,
        title: 'Current Position',
        icon: {
        url: "images/truckoff.png",
        scaledSize: new google.maps.Size(64, 78)
    }
    });

    markeri= new google.maps.Marker({
        position: myinitialpot,
        title: 'Start',
        icon: {
        url: "images/init.png",
        scaledSize: new google.maps.Size(64*2/3, 78*2/3)
    }
    });

    
    

    //init();
    // // Set the map's style to the initial value of the selector.
    
    
}
function init(){
    var temp = 0;
    var numb_init = 0;
    $.post('php/changes.php',function(num){
       numb_init = num;
    });
    temp = numb_init;
    setInterval(function(){
       $.post('php/changes.php',function(num){
        numb_init = num;
       if(numb_init != temp) {
            temp = numb_init;
            readData();
       }
    });
    }, 2000);
    
}

function readData(){  //This function fetches the requested php code and inserts it on the function defined
    $.post('php/readata.php',function(coordinates){
        processreadData(coordinates)
    });
}

function processreadData(coordinates){
    
    console.log(coordinates);
    var entiredata = coordinates.split("*");

    var coorC = [];
    var latC  = [];
    var lonC  = []; 
    var dateC = [];
    var timeC = [];
    var positionC = [];
    var DATE;
    var TIME;
    //var markeraprox;
    var iore = 0;
    var kinitial;
    var kend;
    //var flightPlanCoordinates = [];

    for(i=0;i<entiredata.length;i++){
        coorC = entiredata[i].split(" ");
        latC.push(coorC[0]);
        lonC.push(coorC[1]);
        dateC.push(coorC[2]);
        timeC.push(coorC[3]);
        positionC.push(coorC[4]);

    }
    delete latC[latC.length-1];
    delete lonC[lonC.length-1];
    delete dateC[dateC.length-1];
    delete timeC[timeC.length-1];

    aammddend = dateC[0].split("-");
    hhmmssend = timeC[0].split(":");
    aammddinit = dateC[latC.length-2].split("-");
    hhmmssinit = timeC[latC.length-2].split(":");

    map.setOptions({styles: styles['retro']});

    var myLatLng = new google.maps.LatLng(latC[Math.round((latC.length - 2) / 2)],lonC[Math.round((lonC.length - 2) / 2)]);
    var myOptions = {
        scrollwheel: true,
        draggable: true,
        disableDefaultUI: false,
        mapTypeControl: true,
        scaleControl: true,
        zoomControl: true,
        center:myLatLng,
        zoom: 17
    };

    //Make Polyline
    flightPlanCoordinates = [{lat:Number(latC[0]),lng:Number(lonC[0])}];
    for(i=1;i<latC.length-1;i++){
        flightPlanCoordinates.push({lat:Number(latC[i]),lng:Number(lonC[i])});
    }

    flightPath.setMap(null);
    flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        //strokeColor: '#000000',
        strokeColor: '#FFCF00',
        strokeOpacity: 2.0,
        strokeWeight: 5
    });
    flightPath.setMap(map);
    
    //Poly Negra
    flightBlack.setMap(null);
    flightBlack = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        clickable: false,
        strokeColor: '#000000',
       // strokeColor: '#FFCF00',
        strokeOpacity: 2.0,
        strokeWeight: 5
    });
    flightBlack.setMap(map);

    // Locate initial point
    myinitialpot  = new google.maps.LatLng(latC[0],lonC[0]);
    myLatLnglast  = new google.maps.LatLng(latC[latC.length-2],lonC[lonC.length-2]);
    markerf.setMap(null);
    markerf = new google.maps.Marker({
        position: myLatLnglast,
        title: 'Start',
        icon: {
        url: "images/init.png",
        scaledSize: new google.maps.Size(64, 78)
    }
    });

    markerf.setMap(map);
    kinitial = latC.length-2;
    kend = 0;

    //Locate last point
    markeri.setMap(null); 
    markeri= new google.maps.Marker({
        position: myinitialpot,
        title: 'Current Position',
        icon: {
        url: "images/truckoff.png",
        scaledSize: new google.maps.Size(64*2/3, 78*2/3)
    }
    });
    
    markeri.setMap(map);  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
google.maps.event.addListener(markerf,'click',function(event){

iore = 1;

    markeri.setIcon({
        url: "images/initoff.png",
        scaledSize: new google.maps.Size(60*2/3, 78*2/3)
    });
    markerf.setIcon({
        url: "images/truck.png",
        scaledSize: new google.maps.Size(60, 78)
    });
}); 

google.maps.event.addListener(markeri,'click',function(){

iore = 0;

    markerf.setIcon({
        url: "images/truckoff.png",
        scaledSize: new google.maps.Size(60*2/3, 78*2/3)
    });

    markeri.setIcon({
        url: "images/init.png",
        scaledSize: new google.maps.Size(60, 78)
    });
        
}); 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    google.maps.event.addListener(flightPath, "click", function(event){
        var coord = event.latLng.toString();
        coord = coord.replace("(","");
        coord = coord.replace(")","");
        var ll = coord.split(",");
        var LAT = ll[0];
        var LON = ll[1]
        var myPoint = new google.maps.LatLng(ll[0],ll[1]);

    var k;
    var ert;
    var ern;
    var ertotal;
    var ermin = 10000;
    for(i=0;i<entiredata.length;i++){
        ert = Math.abs(latC[i]-LAT);
        ern = Math.abs(lonC[i]-LON);
        ertotal = ert + ern;

        if (ertotal<ermin){
            ermin = ertotal;
            DATE = dateC[i];
            TIME = timeC[i];
            k=i;
        }

        if (i>0){
            yi = latC[i-1];
            yf = latC[i];
            xi = lonC[i-1];
            xf = lonC[i];
            m = (yf-yi)/(xf-xi);
            b = yf - (m*xf);

            y = m*LON + b;
            ertotal = Math.abs(y-LAT);
            er1 = Math.abs(latC[i-1]-LAT) + Math.abs(lonC[i-1]-LON);
            er2 = Math.abs(latC[i]-LAT) + Math.abs(lonC[i]-LON);


        if (ertotal<ermin){
            ermin = ertotal;
            if (er1<er2){
                k = i-1;
            DATE = dateC[i-1];
            TIME = timeC[i-1];

            }else{
                k=i;
            DATE = dateC[i];
            TIME = timeC[i];
            }
        }

        }

    } 

    if (iore==0){ // kend siempre debe ser menor a kinitial
    if (kend<k){

    myinitial = new google.maps.LatLng(latC[k], lonC[k]);
    kinitial = k;
    markeri.setPosition(myinitial);

            //Black Polyline
    BlackCoordinates = [{lat:Number(latC[kend]),lng:Number(lonC[kend])}];
    for(i=kend;i<kinitial+1;i++){
        BlackCoordinates.push({lat:Number(latC[i]),lng:Number(lonC[i])});
    }
    flightBlack.setPath(BlackCoordinates);

    aammddinit = DATE.split("-");
    hhmmssinit = TIME.split(":");

    //alert(DATE + "." + TIME);
    //2017-03-08.15:57:37
}else{
    alert("ERROR: Endpoint cannot be before Start.");
}
            
}else{

    if (k<kinitial){


        mylast = new google.maps.LatLng(latC[k], lonC[k]);
        kend = k;
        markerf.setPosition(mylast);

                    //Black Polyline
    BlackCoordinates = [{lat:Number(latC[kend]),lng:Number(lonC[kend])}];
    for(i=kend;i<kinitial+1;i++){
        BlackCoordinates.push({lat:Number(latC[i]),lng:Number(lonC[i])});
    }
    flightBlack.setPath(BlackCoordinates);

    aammddend = DATE.split("-");
    hhmmssend = TIME.split(":");
    //alert(DATE + "." + TIME);
}else{
    alert("ERROR: Endpoint cannot be before Start.");
}

}

    });

    flightPath.setMap(map);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 }  

 
 var styles = {
        default: null,
        retro: [
        {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
        {
            featureType: 'administrative',
            elementType: 'geometry.stroke',
            stylers: [{color: '#c9b2a6'}]
        },
        {
            featureType: 'administrative.land_parcel',
            elementType: 'geometry.stroke',
            stylers: [{color: '#dcd2be'}]
        },
        {
            featureType: 'administrative.land_parcel',
            elementType: 'labels.text.fill',
            stylers: [{color: '#ae9e90'}]
        },
        {
            featureType: 'landscape.natural',
            elementType: 'geometry',
            stylers: [{color: '#dfd2ae'}]
        },
        {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [{color: '#dfd2ae'}]
        },
        {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: '#93817c'}]
        },
        {
            featureType: 'poi.park',
            elementType: 'geometry.fill',
            stylers: [{color: '#a5b076'}]
        },
        {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#447530'}]
        },
        {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#f5f1e6'}]
        },
        {
            featureType: 'road.arterial',
            elementType: 'geometry',
            stylers: [{color: '#fdfcf8'}]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#f8c967'}]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{color: '#e9bc62'}]
        },
        {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry',
            stylers: [{color: '#e98d58'}]
        },
        {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry.stroke',
            stylers: [{color: '#db8555'}]
        },
        {
            featureType: 'road.local',
            elementType: 'labels.text.fill',
            stylers: [{color: '#806b63'}]
        },
        {
            featureType: 'transit.line',
            elementType: 'geometry',
            stylers: [{color: '#dfd2ae'}]
        },
        {
            featureType: 'transit.line',
            elementType: 'labels.text.fill',
            stylers: [{color: '#8f7d77'}]
        },
        {
            featureType: 'transit.line',
            elementType: 'labels.text.stroke',
            stylers: [{color: '#ebe3cd'}]
        },
        {
            featureType: 'transit.station',
            elementType: 'geometry',
            stylers: [{color: '#dfd2ae'}]
        },
        {
            featureType: 'water',
            elementType: 'geometry.fill',
            stylers: [{color: '#b9d3c2'}]
        },
        {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#92998d'}]
        }
        ]
    };   
