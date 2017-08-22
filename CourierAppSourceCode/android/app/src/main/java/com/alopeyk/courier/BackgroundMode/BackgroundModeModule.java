package com.alopeyk.courier.BackgroundMode;


import android.content.Intent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class BackgroundModeModule extends ReactContextBaseJavaModule
{

    private Intent intent ;

    public BackgroundModeModule(ReactApplicationContext reactContext)
    {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "BackgroundMode";
    }

    @ReactMethod
    public void enableBackgroundMode()
    {
        intent = new Intent( getCurrentActivity(), BackgroundMode.class );
        getReactApplicationContext().startService( intent );
    }

    @ReactMethod
    public void disableBackgroundMode()
    {
        getReactApplicationContext().stopService( intent );
    }


}
