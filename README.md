# yelperout
Yelper Out (Help Her Out) Chrome extension to randomly select a date night and more

- [yelperout](#yelperout)
  - [Build for local testing](#build-for-local-testing)
  - [Debugging](#debugging)

## Build for local testing
1. Clone this repository
2. In the root of this repo, execute `yarn`, which will install node_modules.
3. In App.tsx replace apiKey with your [Yelp Fusion](https://www.yelp.com/developers/v3/manage_app) api key
4. After node_modules is installed we need a build folder run `yarn build`
5. Open up Google Chrome and goto `chrome://extensions`
6. Toggle on developer mode top right corner
7. Select Load Unpacked top left corner and import the build directory from this project
8. Yelper Out should show up in your extensions below make sure to toggle it on and hit refresh
9. Interact with the extension from the top right corner right now it is just boiler plate with a search button that triggers a cors error

## Debugging

If you come across any issues interacting with the extension, in `chrome://extensions` the Yelper Out app will show an `Errors` interactive button
