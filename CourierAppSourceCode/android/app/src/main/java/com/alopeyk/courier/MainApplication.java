package com.alopeyk.courier;

import android.app.Application;

import com.alopeyk.courier.BackgroundGeolocation.BackgroundGeolocationPackage;
import com.alopeyk.courier.BackgroundMode.BackgroundModePackage;
import com.alopeyk.courier.Notify.NotifyPackage;
import com.alopeyk.courier.bringtofront.BringToFrontPackage;
import com.alopeyk.courier.unlocker.UnlockerPackge;
import com.facebook.react.ReactApplication;
import com.brentvatne.react.ReactVideoPackage;
import com.microsoft.codepush.react.CodePush;
import com.airbnb.android.react.maps.MapsPackage;
import com.oblador.vectoricons.VectorIconsPackage;
// import com.rssignaturecapture.RSSignatureCapturePackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.burnweb.rnsendintent.RNSendIntentPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.transistorsoft.rnbackgroundgeolocation.RNBackgroundGeolocation;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ReactVideoPackage(),
            new CodePush(
              "VAzAEuukkemfuw4Pd9tZKWIUmR3kb71e71fb-f839-453a-b9d7-f6f84a570b71",
              MainApplication.this,
              BuildConfig.DEBUG
              , "https://deploy.alopeyk.com"
            ),
            new MapsPackage(),
            new VectorIconsPackage(),
            // new RSSignatureCapturePackage(),
            new ReactNativeConfigPackage(),
            new ReactNativePushNotificationPackage(),
            new RNSendIntentPackage(),
            new RNSoundPackage(),
            new RNBackgroundGeolocation(),
            new RNDeviceInfo(),
            new UnlockerPackge(),
            new BringToFrontPackage(),
            new BackgroundGeolocationPackage(),
              new BackgroundModePackage(),
              new NotifyPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
