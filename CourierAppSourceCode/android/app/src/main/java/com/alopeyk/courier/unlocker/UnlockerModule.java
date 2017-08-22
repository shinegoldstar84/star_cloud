package com.alopeyk.courier.unlocker;


import android.content.Context;
import android.os.PowerManager;
import android.view.Window;
import android.view.WindowManager;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class UnlockerModule extends ReactContextBaseJavaModule
{

    public UnlockerModule( ReactApplicationContext reactApplicationContext )
    {
        super( reactApplicationContext );
    }

    @Override
    public String getName() {
        return "Unlocker";
    }

    @ReactMethod
    public void unlockScreen()
    {
        PowerManager powerManager = (PowerManager) getReactApplicationContext().getSystemService(Context.POWER_SERVICE);
        PowerManager.WakeLock wakeLock= powerManager.newWakeLock((PowerManager.FULL_WAKE_LOCK | PowerManager.ACQUIRE_CAUSES_WAKEUP | PowerManager.ON_AFTER_RELEASE), "TAG");
        wakeLock.acquire();
        if ( getCurrentActivity() != null )
        {
            try
            {
                Window window = getCurrentActivity().getWindow();
                window.addFlags(
                        WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED
                        | WindowManager.LayoutParams.FLAG_DISMISS_KEYGUARD
                        | WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON
                        | WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON
                );
            }
            catch( Exception exception )
            {

            }
        }
    }


}
