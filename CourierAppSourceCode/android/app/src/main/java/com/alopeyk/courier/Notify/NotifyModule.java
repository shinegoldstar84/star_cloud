package com.alopeyk.courier.Notify;

import android.app.Notification;
import android.app.NotificationManager;
import android.content.Context;
import android.support.v4.app.NotificationCompat;

import com.alopeyk.courier.R;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;


public class NotifyModule extends ReactContextBaseJavaModule
{

    private NotificationManager notificationManager = ( NotificationManager ) getReactApplicationContext().getSystemService( Context.NOTIFICATION_SERVICE );

    public NotifyModule(ReactApplicationContext reactContext)
    {
        super(reactContext);
    }

    @Override
    public String getName()
    {
        return "Notify";
    }

    @ReactMethod
    public void showNotification(ReadableMap map)
    {
        notificationManager.notify(map.getInt("id"), buildNotification(map).build());
    }

    @ReactMethod
    public void dismissNotification(int id)
    {
        notificationManager.cancel(id);
    }

    private NotificationCompat.Builder buildNotification(ReadableMap map)
    {
        return new NotificationCompat.Builder(getReactApplicationContext())
                .setContentTitle(map.getString("title"))
                .setContentText(map.getString("content"))
                .setSmallIcon( R.mipmap.ic_launcher )
                .setAutoCancel(map.hasKey("cancelable") && map.getBoolean("cancelable"))
                .setOngoing(map.hasKey("onGoing") && map.getBoolean("onGoing"))
                .setPriority(Notification.PRIORITY_HIGH);
    }

}
