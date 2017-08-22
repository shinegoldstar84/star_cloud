package com.alopeyk.courier.BackgroundGeolocation;

import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.IBinder;
import android.support.annotation.Nullable;
import android.util.Log;

import com.google.android.gms.common.api.Status;

public class BackgroundGeolocationService extends Service
{
    private static final String TAG = "ALO_BG_GEO";
    public BackgroundGeolocation backgroundGeolocation;
    public String url = "";
    public String version = "";
    public int bgGeoInterval = 2000;
    public String token = "";
    public boolean backgroundMode = false;

    @Override
    public int onStartCommand(final Intent intent, int flags, int startId) {
        SharedPreferences prefs = this.getSharedPreferences( "com.alopeyk.courier", Context.MODE_PRIVATE );
        Log.d( TAG, "INTERVAL: " + prefs.getInt( "bgGeoInterval", 0 ) );
        url = prefs.getString( "url", "https://api.alopeyk.com/api/v2/positions" );
        version = prefs.getString( "version", "2.2.0" );
        bgGeoInterval = prefs.getInt( "bgGeoInterval", 2000 );
        token = prefs.getString( "token", null );
        backgroundMode = prefs.getBoolean( "backgroundMode", false );
        Log.d( TAG, "AloPeyk Background Geolocation Service Started With Background Mode : " + backgroundMode );
        ResolutionRequiredListener listener = new ResolutionRequiredListener() {
            @Override
            public void onResolutionRequired(Status status)
            {
                Intent myIntent = new Intent( BackgroundGeolocationService.this, ResolverActivity.class );
                myIntent.putExtra( "connectionResult", status);
                myIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                startActivity(myIntent);
                Log.d(TAG, "RESOLUTION : " + status);
            }
        };
        backgroundGeolocation = new BackgroundGeolocation()
                .setContext( getBaseContext() )
                .setToken( token )
                .setVersion( version )
                .setBgGeoInterval( bgGeoInterval )
                .setUrl( url )
                .setListener(listener)
                .setOffline( false );
        backgroundGeolocation.stop();
        backgroundGeolocation.start();

        if ( !backgroundMode )
        {
            return Service.START_NOT_STICKY;
        }
        return Service.START_STICKY;
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onDestroy() {
        backgroundGeolocation.stop();
        Log.d( TAG, "AloPeyk Background Geolocation Service service stopped" );
        stopSelf();
        super.onDestroy();
    }
}
