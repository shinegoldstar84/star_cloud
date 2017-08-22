package com.alopeyk.courier;

import android.app.ActivityManager;
import android.app.NotificationManager;
import android.content.Context;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.modules.i18nmanager.I18nUtil;

import java.util.List;

public class MainActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        I18nUtil sharedInstance = I18nUtil.getInstance();
        sharedInstance.allowRTL( getApplicationContext(), true );
        sharedInstance.forceRTL( getApplicationContext(), true );
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "AlopeykCourier";
    }

    @Override
    protected void onDestroy()
    {
        NotificationManager notificationManager = ( NotificationManager ) this.getSystemService( Context.NOTIFICATION_SERVICE );
        notificationManager.cancel(1);
        super.onDestroy();
    }
}
