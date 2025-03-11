
package com.aa2  // 패키지명 맞게 변경

import android.app.*
import android.content.Intent
import android.os.Build
import android.os.IBinder
import androidx.core.app.NotificationCompat
import android.util.Log

class ForegroundService  : Service() {
    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
    Log.d("ForegroundService", "Service started")
    return START_STICKY
}

    override fun onBind(intent: Intent?): IBinder? {
        return null
    }


    override fun onCreate() {
        super.onCreate()
        startForegroundService()
         Log.d("ForegroundService", "Foreground service is running") 
    }

    private fun startForegroundService() {
        val channelId = "ForegroundServiceChannel"
        val notificationManager = getSystemService(NOTIFICATION_SERVICE) as NotificationManager

        // Android 8.0 이상에서는 ForegroundService에 Notification Channel이 필요
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                channelId,
                "Foreground Service",
                NotificationManager.IMPORTANCE_LOW
            )
            notificationManager.createNotificationChannel(channel)
        }

        val notification = NotificationCompat.Builder(this, channelId)
            .setContentTitle("앱 실행 중")
            .setContentText("이 앱은 백그라운드에서 실행되고 있습니다.")
             .build()

        startForeground(1, notification) // 서비스 실행
    }

    override fun onDestroy() {
        super.onDestroy()
    }
}
