package com.alopeyk.courier.BackgroundGeolocation;


import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import javax.annotation.Nullable;

public class EventEmitter
{
    private static EventEmitter instance;
    public static ReactContext reactContext;

    private EventEmitter()
    {

    }

    public static EventEmitter getInstance()
    {
        if ( EventEmitter.instance == null )
        {
            EventEmitter.instance = new EventEmitter();
        }
        return EventEmitter.instance;
    }

    public EventEmitter setReactContext(ReactContext reactContext)
    {
        EventEmitter.reactContext = reactContext;
        return this;
    }

    public void emit(String eventName, @Nullable WritableMap params)
    {
        if ( EventEmitter.reactContext != null )
        {
            EventEmitter.reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(eventName, params);
        }
    }

}
