package com.alopeyk.courier.BackgroundGeolocation;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.support.v4.app.NotificationCompat;
import android.util.Log;

import com.alopeyk.courier.MainActivity;
import com.alopeyk.courier.R;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.Systrace;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GoogleApiAvailability;

import javax.annotation.Nullable;


public class BackgroundGeolocationModule extends ReactContextBaseJavaModule
{

    private Intent intent;
    public EventEmitter eventEmitter;
    private NotificationManager notificationManager = ( NotificationManager ) getReactApplicationContext().getSystemService( Context.NOTIFICATION_SERVICE );

    public BackgroundGeolocationModule( ReactApplicationContext reactContext )
    {
        super(reactContext);
        eventEmitter = EventEmitter.getInstance().setReactContext( reactContext );
    }

    @Override
    public String getName()
    {
        return "BackgroundGeolocation";
    }

    @ReactMethod
    public void configure(ReadableMap map, @Nullable Callback callback)
    {
        SharedPreferences sharedPreferences = getReactApplicationContext().getSharedPreferences( "com.alopeyk.courier", Context.MODE_PRIVATE );
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString( "url", map.getString( "url" ) );
        editor.putInt( "bgGeoInterval", map.getInt( "bgGeoInterval" ) );
        editor.putString( "version", map.getString( "version" ) );
        editor.putString( "token", map.getString( "token" ) );
        editor.putBoolean( "backgroundMode", false );
        editor.apply();
        if ( callback != null )
        {
            callback.invoke(true);
        }
    }

    @ReactMethod
    public void start(Promise promise)
    {
        if ( isGooglePlayServicesAvailable() )
        {
            intent = new Intent( getCurrentActivity(), BackgroundGeolocationService.class );
            getReactApplicationContext().stopService(intent);
            getReactApplicationContext().startService(intent);
            notificationManager.notify(1, buildNotification( "الوپیک", "شما آنلاین هستید. منتظر درخواست باشید." ).build());
            promise.resolve(true);
        }
        else
        {
            promise.reject("500", "google play services unavailable");
        }
    }

    private boolean isGooglePlayServicesAvailable()
    {
        GoogleApiAvailability googleApiAvailability = GoogleApiAvailability.getInstance();
        int resultCode = googleApiAvailability.isGooglePlayServicesAvailable( getReactApplicationContext() );
        return resultCode == ConnectionResult.SUCCESS;
    }

    @ReactMethod
    public void stop(Promise promise)
    {
        if (intent != null)
        {
            getReactApplicationContext().stopService( intent );
            notificationManager.cancel(1);
            promise.resolve("true");
        }
    }

    @ReactMethod
    public void setConfig(ReadableMap map)
    {
        int bgGeoInterval = map.hasKey("bgGeoInterval") ? map.getInt( "bgGeoInterval" ) : 2000;
        boolean backgroundMode = map.hasKey( "backgroundMode" ) && map.getBoolean("backgroundMode");
        SharedPreferences sharedPreferences = getReactApplicationContext().getSharedPreferences( "com.alopeyk.courier", Context.MODE_PRIVATE );
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putInt( "bgGeoInterval", bgGeoInterval );
        editor.putBoolean( "backgroundMode", backgroundMode );
        editor.apply();
        if ( backgroundMode )
        {
            notificationManager.cancel(1);
            notificationManager.notify(0, buildNotification( "الوپیک", "درخواست فعال" ).build());
        }
        else
        {
            notificationManager.cancel(0);
            notificationManager.notify(1, buildNotification( "الوپیک", "شما آنلاین هستید. منتظر درخواست باشید." ).build());
        }
        Log.d( "ALO_BG_GEO", "SetConfig Called => \n BackgroundGeolocationInterval : "  + bgGeoInterval + " \n BackgroundMode : " + backgroundMode );
        getReactApplicationContext().stopService( intent );
        getReactApplicationContext().startService( intent );
    }

    private NotificationCompat.Builder buildNotification( String title, String content)
    {
        Intent intent = new Intent(getCurrentActivity(), MainActivity.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(getCurrentActivity(), (int) System.currentTimeMillis(), intent, 0);
        return new NotificationCompat.Builder(getReactApplicationContext())
                .setContentTitle( title )
                .setContentText( content )
                .setContentIntent(pendingIntent)
                .setSmallIcon( R.mipmap.ic_launcher )
                .setAutoCancel(false)
                .setOngoing(true)
                .setPriority(Notification.PRIORITY_HIGH);
    }

}
