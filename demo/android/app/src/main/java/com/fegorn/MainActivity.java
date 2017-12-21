package com.fegorn;

import android.graphics.Typeface;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.views.text.ReactFontManager;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "fego-rn";
    }
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		Typeface tf = Typeface.createFromAsset(getAssets(), "font/FontAwesome.ttf");
		ReactFontManager.getInstance().setTypeface("FontAwesome", 0, tf);
		Typeface tf2 = Typeface.createFromAsset(getAssets(), "font/entypo.ttf");
		ReactFontManager.getInstance().setTypeface("entypo", 0, tf2);
	}
}
