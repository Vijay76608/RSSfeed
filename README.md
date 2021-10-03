# RSSfeed

Based on the given coding test requirements all the features mentioned are implemented.

The App is built using React Native, Typescript, Expo and Jest for unit testing.

Following points mention the overview of implemented features of app in regards to the requirements:
- App consists of two bottom Tabs, one for fetching feed from server and other for feeds stored locally on phone.
- A textbox to enter feed URL and fetch feed data.
- The feed data then converted to JSON and displayed in a scrollable listView.
- Each Feed item opens up in a modal when pressed.
- Each Feed item can be saved to device by long pressing any item from list.
- Entering new URL refreshes the list and gets the new feed.
- User can mention storage setting in second tab
- User can only store the number of feeds on device that are mentioned in second tab.

Quick description of folder structure:

Tab Route files    - /navigation
Layout files - /screens
Reusable components - /components
test files - /components/_tests
local storage - /constants/storage
common functions - /constants/helper
fonts - /assets

Instructions to run project:

Clone the repo - git clone https://github.com/Vijay76608/RSSfeed.git
Install dependencies - npm install
Executing unit tests - npm run test
Starting the project - npm run start (It opens expo dashboard and we can run on various devices and emulators from it)
Android Emulator - npm run android
IOS Emulator - npm run ios
App can be run on physical device by scanning QR code on expo dashboard.
