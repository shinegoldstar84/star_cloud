package com.alopeyk.courier.BackgroundGeolocation;

import com.google.android.gms.common.api.Status;

public interface ResolutionRequiredListener
{

    void onResolutionRequired(Status status);

}
