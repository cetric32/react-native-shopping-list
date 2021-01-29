# Deploy the app for production

#!/bin/bash

cd android/ ;
./gradlew bundleRelease;

cd .. ;
npx react-native run-android --variant=release;
