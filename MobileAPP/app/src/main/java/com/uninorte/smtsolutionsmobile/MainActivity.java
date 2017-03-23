package com.uninorte.smtsolutionsmobile;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.TextView;

import org.w3c.dom.Text;

public class MainActivity extends AppCompatActivity implements LocationListener {

    private LocationManager LM;
    private TextView TLati, TLong, TRunner;
    private String TAG = "Localizacion";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        TLati = (TextView) findViewById(R.id.TLat);
        TLong = (TextView) findViewById(R.id.TLon);
        TRunner = (TextView) findViewById(R.id.runner);
        LM = (LocationManager) this.getSystemService(Context.LOCATION_SERVICE);
    }

    @Override
    public void onLocationChanged(Location location) {
        TRunner.setText(R.string.change);
        TLati.setText(String.format(getResources().getString(R.string.Latitude), location.getLatitude()));
        TLong.setText(String.format(getResources().getString(R.string.Longitude), location.getLongitude()));

    }

    @Override
    public void onStatusChanged(String provider, int status, Bundle extras) {

    }

    @Override
    public void onProviderEnabled(String provider) {

    }

    @Override
    public void onProviderDisabled(String provider) {

    }

    public void onClickGO(View view) {
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            // TODO: Consider calling
            //    ActivityCompat#requestPermissions
            // here to request the missing permissions, and then overriding
            //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
            //                                          int[] grantResults)
            // to handle the case where the user grants the permission. See the documentation
            // for ActivityCompat#requestPermissions for more details.
            return;
        }
        LM.requestLocationUpdates(LocationManager.GPS_PROVIDER, 1000, 1, this);
        TRunner.setText(R.string.wait);
    }

    public void onClickSTOP(View view) {
        LM.removeUpdates(this);
        TRunner.setText(R.string.nothing);
    }

    @Override
    protected void onDestroy() {
        LM.removeUpdates(this);
        super.onDestroy();
    }
}
