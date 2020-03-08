JSmartSwitchRNClient

This is the React-Native client for my Smart Switch.




Prerequisites:
  - NodeJS 12.x LTS
  - Yarn 1.x


Versions:
  - React-Native v0.61
  
Build instructions (Android):
  - under app/gradle.properties, add store and key password
  - execute "gradlew assembleRelease" in android folder

Notes:
  - Starting Android 9 onwards, HTTP requests are forbidden. 
    (To get around this, I use a WebView with height 0, and unmount it once the request is complete.)