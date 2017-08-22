package com.alopeyk.courier.BackgroundGeolocation;

import android.content.Intent;
import android.content.IntentSender;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.google.android.gms.common.api.Status;

public class ResolverActivity extends ReactActivity
{

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        Intent intent = getIntent();
        Status result = intent.getParcelableExtra( "connectionResult" );
        if ( result.hasResolution() )
        {
            try
            {
                result.startResolutionForResult(this, 1111);
            }
            catch( IntentSender.SendIntentException e)
            {

            }
        }
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data)
    {
        if ( requestCode == 1111 )
        {
            if ( resultCode == RESULT_OK )
            {
                stopService( new Intent( this, BackgroundGeolocationService.class ) );
                startService( new Intent( this, BackgroundGeolocationService.class ) );
            }
            finish();
        }
    }
}
