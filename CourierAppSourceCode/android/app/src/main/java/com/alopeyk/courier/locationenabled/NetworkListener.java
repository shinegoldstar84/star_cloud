package com.alopeyk.courier.locationenabled;


import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.provider.Settings;
import android.widget.Toast;

public class NetworkListener extends BroadcastReceiver
{


    @Override
    public void onReceive(Context context, Intent intent)
    {
        if ( intent.getAction().matches( "android.net.conn.CONNECTIVITY_CHANGE" ) )
        {
            ConnectivityManager connectivityManager = ( ConnectivityManager ) context.getSystemService( Context.CONNECTIVITY_SERVICE );
            NetworkInfo networkInfo = connectivityManager.getActiveNetworkInfo();
            if (
                    networkInfo == null || (
                            networkInfo.getType() != ConnectivityManager.TYPE_WIFI &&
                            networkInfo.getType() != ConnectivityManager.TYPE_MOBILE
                    )
             )
            {
                Toast.makeText( context, "عدم ارتباط با اینترنت \n لطفا اینترنت دستگاه خود را روشن نمایید", Toast.LENGTH_LONG ).show();
                Intent myIntent = new Intent();
                myIntent.setFlags( Intent.FLAG_ACTIVITY_NEW_TASK );
                myIntent.setAction( Settings.ACTION_DATA_ROAMING_SETTINGS );
                context.startActivity( myIntent );
            }
        }
    }
}
