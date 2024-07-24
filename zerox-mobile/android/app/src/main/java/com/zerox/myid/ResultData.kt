package com.zerox.myid

import androidx.annotation.Keep
import com.google.gson.annotations.SerializedName

@Keep
data class ResultData(
    @SerializedName("result_code")
    val resultCode: String? = null,
    @SerializedName("comparison")
    val comparison: Double? = null,
    @SerializedName("error_message")
    val errorMessage: String? = null,
    @SerializedName("error_code")
    val errorCode: Int? = null
)
