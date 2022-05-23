package com.weather;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Bundle;
import android.widget.LinearLayout;
import android.widget.RemoteViews;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Implementation of App Widget functionality.
 */
public class WeatherWidget extends AppWidgetProvider {

    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager,
                                int appWidgetId) {
        try {
            SharedPreferences sharedPref = context.getSharedPreferences("DATA", Context.MODE_PRIVATE);
            String appString = sharedPref.getString("appData", "{\"text\":'no data', \"temp\":'no data', \"icon\": 'no data'}");
            JSONObject appData = new JSONObject(appString);
            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.weather_widget);
            views.setTextViewText(R.id.appwidget_text_city, appData.getString("text"));
            views.setTextViewText(R.id.appwidget_text_temp, appData.getString("temp"));

            switch (appData.getString("icon")) {
                case "01d":
                    views.setImageViewResource(R.id.appwidget_icon_weather, R.drawable.img_01d);
                    break;
                case "01n":
                    views.setImageViewResource(R.id.appwidget_icon_weather, R.drawable.img_01n);
                    break;
                case "02d":
                    views.setImageViewResource(R.id.appwidget_icon_weather, R.drawable.img_02d);
                    break;
                case "02n":
                    views.setImageViewResource(R.id.appwidget_icon_weather, R.drawable.img_02n);
                    break;
                case "03d":
                    views.setImageViewResource(R.id.appwidget_icon_weather, R.drawable.img_03d);
                    break;
                case "03n":
                    views.setImageViewResource(R.id.appwidget_icon_weather, R.drawable.img_03n);
                    break;
                case "04d":
                    views.setImageViewResource(R.id.appwidget_icon_weather, R.drawable.img_04d);
                    break;
                case "04n":
                    views.setImageViewResource(R.id.appwidget_icon_weather, R.drawable.img_04n);
                    break;
                case "09d":
                    views.setImageViewResource(R.id.appwidget_icon_weather, R.drawable.img_09d);
                    break;
                case "09n":
                    views.setImageViewResource(R.id.appwidget_icon_weather, R.drawable.img_09n);
                    break;
                case "10d":
                    views.setImageViewResource(R.id.appwidget_icon_weather, R.drawable.img_10d);
                    break;
                case "10n":
                    views.setImageViewResource(R.id.appwidget_icon_weather, R.drawable.img_10n);
                    break;
                case "11d":
                    views.setImageViewResource(R.id.appwidget_icon_weather, R.drawable.img_11d);
                    break;
                case "11n":
                    views.setImageViewResource(R.id.appwidget_icon_weather, R.drawable.img_11n);
                    break;
                case "13d":
                    views.setImageViewResource(R.id.appwidget_icon_weather, R.drawable.img_13d);
                    break;
                case "13n":
                    views.setImageViewResource(R.id.appwidget_icon_weather, R.drawable.img_13n);
                    break;
                case "50d":
                    views.setImageViewResource(R.id.appwidget_icon_weather, R.drawable.img_50d);
                    break;
                case "50n":
                    views.setImageViewResource(R.id.appwidget_icon_weather, R.drawable.img_50n);
                    break;
            }
            appWidgetManager.updateAppWidget(appWidgetId, views);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        // There may be multiple widgets active, so update all of them
        for (int appWidgetId : appWidgetIds) {
            // Create an Intent to launch ExampleActivity
            Intent intent = new Intent(context, MainActivity.class);
            PendingIntent pendingIntent = PendingIntent.getActivity(
                    /* context = */ context,
                    /* requestCode = */ 0,
                    /* intent = */ intent,
                    /* flags = */ PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
            );

            // Get the layout for the widget and attach an on-click listener
            // to the button.
            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.weather_widget);
            views.setOnClickPendingIntent(R.id.go_to_activity_main, pendingIntent);

            updateAppWidget(context, appWidgetManager, appWidgetId);
//            appWidgetManager.updateAppWidget(appWidgetId, views);
        }
    }

    @Override
    public void onEnabled(Context context) {
        // Enter relevant functionality for when the first widget is created
    }

    @Override
    public void onDisabled(Context context) {
        // Enter relevant functionality for when the last widget is disabled
    }
}