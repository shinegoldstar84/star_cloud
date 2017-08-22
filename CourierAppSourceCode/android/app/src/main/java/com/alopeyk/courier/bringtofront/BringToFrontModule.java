package com.alopeyk.courier.bringtofront;

import android.content.Intent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class BringToFrontModule extends ReactContextBaseJavaModule
{


    public BringToFrontModule( ReactApplicationContext reactApplicationContext )
    {
        super( reactApplicationContext );
    }

    @Override
    public String getName()
    {
        return "BringToFront";
    }

    @ReactMethod
    public void bringToFront()
    {
        if ( getCurrentActivity() != null )
        {
            try
            {
                Intent intent = new Intent( getReactApplicationContext(), getCurrentActivity().getClass() );
                intent.addFlags( Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_SINGLE_TOP | Intent.FLAG_ACTIVITY_REORDER_TO_FRONT );
                intent.setAction( Intent.ACTION_MAIN );
                intent.addCategory( Intent.CATEGORY_LAUNCHER );
                getCurrentActivity().getApplicationContext().startActivity( intent );
            }
            catch ( Exception e )
            {

            }

        }
    }


}
