package com.droidconworkshop1;

import com.wix.detox.Detox;
import com.wix.detox.Detox.DetoxIdlePolicyConfig;

import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;

import androidx.test.ext.junit.runners.AndroidJUnit4;
import androidx.test.filters.LargeTest;
import androidx.test.rule.ActivityTestRule;

@RunWith(AndroidJUnit4.class)
@LargeTest
public class DetoxTest {
  @Rule
  // Replace 'MainActivity' with the value of android:name entry in
  // <activity> in AndroidManifest.xml
  public ActivityTestRule<MainActivity> mActivityRule = new ActivityTestRule<>(MainActivity.class, false, false);

  @Test
  public void runDetoxTests() {
    DetoxIdlePolicyConfig detoxConfig = new DetoxIdlePolicyConfig();
    detoxConfig.masterTimeoutSec = 90;
    detoxConfig.idleResourceTimeoutSec = 60;

    Detox.runTests(mActivityRule, detoxConfig);
  }
}