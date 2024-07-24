package com.zerox.myid

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.google.gson.Gson
import com.zerox.R
import com.zerox.myid.Keys
import uz.myid.android.sdk.capture.*
import uz.myid.android.sdk.capture.model.OrganizationDetails
import java.util.*

class FaceIdActivity : AppCompatActivity(), MyIdResultListener {

    private val myIdClient = MyIdClient()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_face_id)
        startMyId()
    }

    override fun onSuccess(result: MyIdResult) {
        val resultData = ResultData(
            resultCode = result.code,
            comparison = result.comparison
        )
        val intent = Intent().apply {
            putExtra(Keys.RESULT_STRING, Gson().toJson(resultData))
        }

        setResult(RESULT_OK, intent)
        finish()
    }

    override fun onError(e: MyIdException) {
        val resultData = ResultData(
            errorMessage = e.message,
            errorCode = e.code
        )
        val intent = Intent().apply {
            putExtra(Keys.RESULT_STRING, Gson().toJson(resultData))
        }

        setResult(RESULT_OK, intent)
        finish()
    }

    override fun onUserExited() {
        val resultData = ResultData(
            errorMessage = "User exited",
            errorCode = 400
        )
        val intent = Intent().apply {
            putExtra(Keys.RESULT_STRING, Gson().toJson(resultData))
        }

        setResult(RESULT_OK, intent)
        finish()
    }

    private fun startMyId() {
        val phoneNumber = intent.extras?.getString(Keys.PHONE_NUMBER, "").orEmpty()
        val clientId = intent.extras?.getString(Keys.CLIENT_ID, "").orEmpty()
        val passportData = intent.extras?.getString(Keys.PASSPORT_DATA, "").orEmpty()
        val dateOfBirth = intent.extras?.getString(Keys.DATE_OF_BIRTH, "").orEmpty()
        val sdkHash = intent.extras?.getString(Keys.SDK_HASH, "").orEmpty()
        val externalId = intent.extras?.getString(Keys.EXTERNAL_ID, "").orEmpty()
        val threshold = intent.extras?.getFloat(Keys.THRESHOLD, 0.5f) ?: 0.5f

        val buildMode = when (intent.extras?.getString(Keys.BUILD_MODE, "")?.uppercase()) {
            MyIdBuildMode.DEBUG.name -> MyIdBuildMode.DEBUG
            else -> MyIdBuildMode.PRODUCTION
        }
        val entryType = when (intent.extras?.getString(Keys.ENTRY_TYPE, "")?.uppercase()) {
            MyIdEntryType.FACE.name -> MyIdEntryType.FACE
            else -> MyIdEntryType.AUTH
        }
        val cameraShape = when (intent.extras?.getString(Keys.CAMERA_SHAPE, "")?.uppercase()) {
            MyIdCameraShape.ELLIPSE.name -> MyIdCameraShape.ELLIPSE
            else -> MyIdCameraShape.CIRCLE
        }

        val locale = intent.extras?.getString(Keys.LOCALE, "en") ?: "en"
        val withPhoto = intent.extras?.getBoolean(Keys.WITH_PHOTO, false) ?: false

        val organizationDetails = OrganizationDetails(phoneNumber = phoneNumber)

        val myIdConfig = MyIdConfig.builder(clientId = clientId)
            .withPassportData(passportData)
            .withBirthDate(dateOfBirth)
            .withSdkHash(sdkHash)
            .withExternalId(externalId)
            .withThreshold(threshold)
            .withBuildMode(buildMode)
            .withEntryType(entryType)
            .withLocale(Locale(locale))
            .withCameraShape(cameraShape)
            .withOrganizationDetails(organizationDetails)
            .withPhoto(withPhoto)
            .build()

        val intent = myIdClient.createIntent(activity = this, myIdConfig = myIdConfig)
        result.launch(intent)
    }

    private val result = takeUserResult(this)
}


