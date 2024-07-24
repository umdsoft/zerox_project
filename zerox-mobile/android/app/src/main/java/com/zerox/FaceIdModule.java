package com.zerox;

import android.app.Activity;
import android.content.Intent;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.zerox.myid.FaceIdActivity;
import com.zerox.myid.Keys;

import org.jetbrains.annotations.NotNull;
import org.json.JSONException;
import org.json.JSONObject;

public class FaceIdModule extends ReactContextBaseJavaModule implements ActivityEventListener, LifecycleEventListener {
    private static ReactApplicationContext reactContext;
    private DeviceEventManagerModule.RCTDeviceEventEmitter eventEmitter = null;

    public FaceIdModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
        reactContext.addActivityEventListener(this);
    }


    @NotNull
    @Override
    public String getName() {
        return "FaceIdModule";
    }

    @ReactMethod
    public void OpenFaceIdNativeScreen(String lang) {

        Intent intent = new Intent(getCurrentActivity(), FaceIdActivity.class);
//        intent.putExtra(Keys.PHONE_NUMBER, call.argument<String>(Keys.PHONE_NUMBER));
        intent.putExtra(Keys.CLIENT_ID, "infinity_payment_system-LlN4qMlds2fT85bdAuDoVkv8eyOx5YSPTSoF8HH2");
//        intent.putExtra(Keys.PASSPORT_DATA, call.argument<String>(Keys.PASSPORT_DATA));
//        intent.putExtra(Keys.DATE_OF_BIRTH, "22.11.1997");
//        intent.putExtra(Keys.SDK_HASH, call.argument<String>(Keys.SDK_HASH));
//        intent.putExtra(Keys.EXTERNAL_ID, call.argument<String>(Keys.EXTERNAL_ID));
//        intent.putExtra(Keys.THRESHOLD, call.argument<Float>(Keys.THRESHOLD));
//        intent.putExtra(Keys.BUILD_MODE, call.argument<Int>(Keys.BUILD_MODE));
//        intent.putExtra(Keys.ENTRY_TYPE, call.argument<Int>(Keys.ENTRY_TYPE));
       intent.putExtra(Keys.LOCALE, lang);
//        intent.putExtra(Keys.CAMERA_SHAPE, call.argument<Int>(Keys.CAMERA_SHAPE));
//        intent.putExtra(Keys.WITH_PHOTO, call.argument<Boolean>(Keys.WITH_PHOTO));
        reactContext.startActivityForResult(intent, 999, null);
    }


    public void sendEvent(String eventName, WritableMap data) {
        if (eventEmitter == null) {
            eventEmitter = getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
        }
        if (eventEmitter != null) {
            eventEmitter.emit(eventName, data);
        }
    }

    public void errorEvent(String error, String data) {
        if (eventEmitter == null) {
            eventEmitter = getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
        }
        if (eventEmitter != null) {
            eventEmitter.emit(error, data);
        }

    }


    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        if (requestCode == 999) {
            String code = data.getExtras().getString("KEY_RESULT_STRING");

            WritableMap map = new WritableNativeMap();
            try {
                JSONObject jsonObject = new JSONObject(code);
                map.putString("code", jsonObject.getString("result_code"));
                map.putString("comp_id", jsonObject.getString("comparison"));
                sendEvent("code", map);
            } catch (JSONException e) {
                errorEvent("error", "1");
            }
        }
    }


    @Override
    public void onNewIntent(Intent intent) {

    }

    @Override
    public void onHostResume() {

    }

    @Override
    public void onHostPause() {

    }

    @Override
    public void onHostDestroy() {

    }
}
