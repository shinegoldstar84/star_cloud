package com.alopeyk.courier.BackgroundGeolocation;


import android.content.Context;
import android.location.Location;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.common.api.PendingResult;
import com.google.android.gms.common.api.ResultCallback;
import com.google.android.gms.common.api.Status;
import com.google.android.gms.location.FusedLocationProviderApi;
import com.google.android.gms.location.LocationListener;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.location.LocationSettingsRequest;
import com.google.android.gms.location.LocationSettingsResult;
import com.google.android.gms.location.LocationSettingsStatusCodes;

import java.io.IOException;
import java.util.Calendar;

import okhttp3.Call;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class BackgroundGeolocation  implements GoogleApiClient.ConnectionCallbacks, GoogleApiClient.OnConnectionFailedListener, LocationListener
{

    private static final String TAG = "ALO_BG_GEO";
    private GoogleApiClient googleApiClient;
    private Location lastLocation;
    private LocationRequest locationRequest;
    private double latitudeValue = 0.0;
    private double longitudeValue = 0.0;
    private Context context;
    private boolean isStarted = false;
    private boolean isMockLocation = false;

    private int bgGeoInterval = 2000;
    private String url = "";
    private String token = "";
    private String version = "";
    private boolean offline = false;
    private static final MediaType JSON = MediaType.parse( "application/json; charset=utf-8" );
    private OkHttpClient client = new OkHttpClient();
    private EventEmitter eventEmitter;
    private long lastLocationTime;
    private ResolutionRequiredListener listener;

    public BackgroundGeolocation()
    {
        eventEmitter = EventEmitter.getInstance();
    }

    public BackgroundGeolocation setContext(Context context)
    {
        this.context = context;
        return this;
    }

    public BackgroundGeolocation setListener( ResolutionRequiredListener listener )
    {
        this.listener = listener;
        return this;
    }

    public BackgroundGeolocation setVersion( String version )
    {
        this.version = version;
        return this;
    }

    public BackgroundGeolocation setUrl( String url )
    {
        Log.d( TAG, "URL : " + url );
        this.url = url;
        return this;
    }

    public BackgroundGeolocation setToken( String token )
    {
        this.token = token;
        return this;
    }

    public BackgroundGeolocation setOffline( boolean offline )
    {
        this.offline = offline;
        return this;
    }

    public BackgroundGeolocation setBgGeoInterval( int bgGeoInterval )
    {
        this.bgGeoInterval = bgGeoInterval;
        return this;
    }

    public void start()
    {
        Log.d( TAG, "STARTED" );
        Log.d( TAG, "url : " + url );
        isStarted = true;
        startGoogle();
    }


    private void startGoogle()
    {
        if ( googleApiClient == null )
        {
            locationRequest = createLocationRequest();
            googleApiClient = new GoogleApiClient.Builder( context )
                    .addConnectionCallbacks( this )
                    .addApi( LocationServices.API )
                    .addOnConnectionFailedListener( this )
                    .build();
            googleApiClient.disconnect();
            googleApiClient.connect();
        }
    }

    public void stop()
    {
        if ( googleApiClient != null )
        {
            googleApiClient.disconnect();
            isStarted = false;
        }
    }

    private void reload()
    {
        if ( isStarted )
        {
            stop();
            startGoogle();
        }
    }

    public void changeBgGeoInterval( int interval )
    {
        bgGeoInterval = interval;
        Log.d( TAG, "Interval Changed : " + bgGeoInterval );
        locationRequest = createLocationRequest();
        reload();
    }

    private LocationRequest createLocationRequest()
    {
        LocationRequest locationRequest = new LocationRequest();
        locationRequest.setInterval( bgGeoInterval );
        locationRequest.setFastestInterval( bgGeoInterval / 2 );
        locationRequest.setPriority( LocationRequest.PRIORITY_HIGH_ACCURACY );
        return locationRequest;
    }

    @Override
    public void onConnected(@Nullable Bundle bundle) {
        Log.d( TAG, "Connection has been called" );
        LocationSettingsRequest.Builder builder = new LocationSettingsRequest.Builder().addLocationRequest( locationRequest );
        final PendingResult<LocationSettingsResult> result = LocationServices.SettingsApi.checkLocationSettings( googleApiClient, builder.build() );
        try
        {
            result.setResultCallback(new ResultCallback<LocationSettingsResult>()
            {
                @Override
                public void onResult(@NonNull LocationSettingsResult result)
                {
                    final Status status = result.getStatus();
                    Log.d( TAG, "STATUS CODE : " + status.getStatusCode() + " MESSAGE : " + status.getStatusMessage() );
                    switch ( status.getStatusCode() )
                    {
                        case LocationSettingsStatusCodes.SUCCESS:
                            lastLocation = LocationServices.FusedLocationApi.getLastLocation( googleApiClient );
                            if (isStarted)
                            {
                                if ( lastLocation != null )
                                {
                                    latitudeValue = lastLocation.getLatitude();
                                    longitudeValue = lastLocation.getLongitude();
                                    lastLocationTime = lastLocation.getTime();
                                    try
                                    {
                                        if (latitudeValue > 32 && latitudeValue < 37 && longitudeValue > 49 && longitudeValue < 55)
                                        {
                                            doPost( url, getRequestBody() );
                                        }
                                    }
                                    catch( IOException e )
                                    {
                                        Log.e( TAG, e.getMessage() );
                                    }
                                    Log.d( TAG, "LATITUDE 1: " + latitudeValue + " Longitude 1: " + longitudeValue );
                                }
                                LocationServices.FusedLocationApi.requestLocationUpdates( googleApiClient, locationRequest, BackgroundGeolocation.this );
                            }
                            break;
                        case LocationSettingsStatusCodes.SETTINGS_CHANGE_UNAVAILABLE:
                            Log.d( TAG, "SETTINGS CHANGE UNAVAILABLE" );
                            break;
                        case LocationSettingsStatusCodes.RESOLUTION_REQUIRED:
                            listener.onResolutionRequired(status);
                            break;
                    }
                }
            });
        }
        catch( Exception e )
        {
            Log.d( TAG, "IllegalException" + e.getMessage() );
        }

    }

    @Override
    public void onConnectionSuspended(int i) {
        Log.d( TAG, "SUSPEND" );
        eventEmitter.emit( "locationConnectionFailed", null );
    }

    @Override
    public void onConnectionFailed(@NonNull ConnectionResult connectionResult) {
        Log.d( TAG, "FAILED" );
        eventEmitter.emit( "locationConnectionFailed", null );
    }

    @Override
    public void onLocationChanged(Location location) {
        latitudeValue = location.getLatitude();
        longitudeValue = location.getLongitude();
        lastLocationTime = location.getTime();
        Bundle extras = location.getExtras();
        isMockLocation = extras != null && extras.getBoolean(FusedLocationProviderApi.KEY_MOCK_LOCATION, false);
        Log.d(TAG, getTime(lastLocationTime) + " -- LATITUDE : " + location.getLatitude() + " Longitude : " + location.getLongitude());
        try
        {
            if (latitudeValue > 32 && latitudeValue < 37 && longitudeValue > 49 && longitudeValue < 55)
            {
                doPost( url, getRequestBody() );
            }
        }
        catch( IOException e )
        {
            Log.e( TAG, "IO_EXCEPTION : " + e.getMessage() );
        }
    }

    private String getRequestBody()
    {
        return "{" +
                    "\"location\":{" +
                        "\"coords\":{"+
                            "\"latitude\":" + latitudeValue + ",\"longitude\":"+longitudeValue+",\"mock\":"+isMockLocation+
                        "}"+
                    "},"+
                    "\"offline\":" + offline +
                "}";
    }

    private String getTime( long timestamp )
    {
        Calendar calendar =  Calendar.getInstance();
        calendar.setTimeInMillis( timestamp );
        return android.text.format.DateFormat.format( "HH:mm:ss", timestamp ).toString();
    }

    private void doPost( String url, String data ) throws IOException
    {
        Log.i(TAG, "MOCK LOCATION STATUS: " + isMockLocation);
        okhttp3.RequestBody body = okhttp3.RequestBody.create( JSON, data );
        Request request = new Request.Builder()
                    .header( "Authorization", "Bearer " + token )
                    .url( url )
                    .post( body )
                    .build();
        client.newCall( request )
              .enqueue(new okhttp3.Callback() {
                        @Override
                        public void onFailure(Call call, IOException e) {
                            Log.d( TAG, "Http Call Failed Network Error" );
                            eventEmitter.emit("positionHttpRequestFail", null);
                        }

                        @Override
                        public void onResponse(Call call, Response response) throws IOException {
                            Log.d( TAG, "HTTP RESPONSE : " + response.code() );
                            WritableMap map = Arguments.createMap();
                            map.putDouble("latitude", latitudeValue);
                            map.putDouble("longitude", longitudeValue);
                            map.putString("response", response.body().string());
                            map.putDouble( "timestamp", (double) lastLocationTime );
                            eventEmitter.emit( "positionHttpResponse", map );
                        }
                    });
    }

}
