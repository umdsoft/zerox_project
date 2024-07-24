package com.zerox;

import android.content.Context;
import androidx.annotation.NonNull;
import androidx.biometric.BiometricManager;
import androidx.biometric.BiometricPrompt;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.FragmentActivity;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import java.util.concurrent.Executor;

public class BiometricModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;

    BiometricModule(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "BiometricModule";
    }

    @ReactMethod
    public void authenticate(Callback errorCallback, Callback successCallback) {
        Executor executor = ContextCompat.getMainExecutor(reactContext);
        FragmentActivity activity = (FragmentActivity) getCurrentActivity();

        if (activity == null) {
            errorCallback.invoke("Activity is null");
            return;
        }

        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                BiometricPrompt biometricPrompt = new BiometricPrompt(activity, executor, new BiometricPrompt.AuthenticationCallback() {
                    @Override
                    public void onAuthenticationError(int errorCode, @NonNull CharSequence errString) {
                        super.onAuthenticationError(errorCode, errString);
                        errorCallback.invoke(errString);
                    }

                    @Override
                    public void onAuthenticationSucceeded(@NonNull BiometricPrompt.AuthenticationResult result) {
                        super.onAuthenticationSucceeded(result);
                        successCallback.invoke("Authentication succeeded!");
                    }

                    @Override
                    public void onAuthenticationFailed() {
                        super.onAuthenticationFailed();
                        errorCallback.invoke("Authentication failed");
                    }
                });

                BiometricPrompt.PromptInfo promptInfo = new BiometricPrompt.PromptInfo.Builder()
                    .setTitle("Biometric Authentication")
                    .setSubtitle("Log in using your biometric credential")
                    .setNegativeButtonText("Cancel")
                    .build();

                BiometricManager biometricManager = BiometricManager.from(reactContext);
                if (biometricManager.canAuthenticate(BiometricManager.Authenticators.BIOMETRIC_STRONG) == BiometricManager.BIOMETRIC_SUCCESS) {
                    biometricPrompt.authenticate(promptInfo);
                } else {
                    errorCallback.invoke("Biometric authentication is not available");
                }
            }
        });
    }
}
