package com.alopeyk.courier.locationenabled;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.location.LocationManager;
import android.provider.Settings;
import android.util.Log;
import android.widget.Toast;

import com.alopeyk.courier.BackgroundGeolocation.EventEmitter;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;


public class LocationReceiver extends BroadcastReceiver {


    private EventEmitter eventEmitter = EventEmitter.getInstance();

    @Override
    public void onReceive(Context context, Intent intent)
    {
        SharedPreferences prefs = context.getSharedPreferences("com.alopeyk.courier", Context.MODE_PRIVATE);
        if ( intent.getAction().matches( "android.location.PROVIDERS_CHANGED" ) )
        {
            boolean gpsEnabled = false;
            boolean locationEnabled = false;

            LocationManager locationManager = ( LocationManager ) context.getSystemService( Context.LOCATION_SERVICE );
            try
            {
                gpsEnabled = locationManager.isProviderEnabled( LocationManager.GPS_PROVIDER );
            }
            catch ( Exception e )
            {
                Log.d( "EXCEPTION", e.toString() );
            }

            try
            {
                locationEnabled = locationManager.isProviderEnabled( LocationManager.NETWORK_PROVIDER );
            }
            catch( Exception e )
            {
                Log.d( "EXCEPTION", e.toString() );
            }
            if ( !gpsEnabled && !locationEnabled )
            {
                SharedPreferences.Editor editor = prefs.edit();
                editor.putBoolean("locationEnabled", false);
                editor.apply();
                try
                {
                    WritableMap map = Arguments.createMap();
                    map.putBoolean("available", false);
                    eventEmitter.emit("location:change", map);
                    Toast.makeText( context, "عدم دسترسی به مکان یاب.\n لطفا مکان یاب دستگاه خود را روشن نمایید", Toast.LENGTH_LONG ).show();
                    Intent myIntent = new Intent( Settings.ACTION_LOCATION_SOURCE_SETTINGS );
                    myIntent.setFlags( Intent.FLAG_ACTIVITY_NEW_TASK );
                    context.startActivity( myIntent );

                }
                catch ( Exception e )
                {
                    Log.d( "EXCEPTION", e.toString() );
                }
            }
            else
            {
                boolean isLocationDisabledBefore = prefs.getBoolean("locationEnabled", true);
                if ( !isLocationDisabledBefore )
                {
                    WritableMap map = Arguments.createMap();
                    map.putBoolean("available", true);
                    SharedPreferences.Editor editor = prefs.edit();
                    editor.putBoolean( "locationEnabled", true );
                    editor.apply();
                    eventEmitter.emit("location:change", map);
                }
            }
        }
    }
}
