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

## Screenshots
![Simulator Screen Shot - iPhone 11 - 2021-04-05 at 00 31 20](https://user-images.githubusercontent.com/12519126/113549816-e7bd8880-95a6-11eb-8ad0-6e618ff55a7a.png)

![Simulator Screen Shot - iPhone 11 - 2021-04-05 at 00 31 49](https://user-images.githubusercontent.com/12519126/113549819-e9874c00-95a6-11eb-8967-1f6b6dc7b3d6.png)
![Simulator Screen Shot - iPhone 11 - 2021-04-05 at 00 32 02](https://user-images.githubusercontent.com/12519126/113549821-eab87900-95a6-11eb-8f6f-d5a0f27bea15.png)
![Simulator Screen Shot - iPhone 11 - 2021-04-05 at 00 32 14](https://user-images.githubusercontent.com/12519126/113549823-eb510f80-95a6-11eb-8ea2-b8e8ff24db11.png)
![Simulator Screen Shot - iPhone 11 - 2021-04-05 at 00 32 28](https://user-images.githubusercontent.com/12519126/113549824-ebe9a600-95a6-11eb-9028-c09545583cb3.png)
![Simulator Screen Shot - iPhone 11 - 2021-04-05 at 00 33 48](https://user-images.githubusercontent.com/12519126/113549826-ebe9a600-95a6-11eb-810e-6bdc11b1e65e.png)
![Simulator Screen Shot - iPhone 11 - 2021-04-05 at 00 35 24](https://user-images.githubusercontent.com/12519126/113549828-ec823c80-95a6-11eb-8a7c-d88b92e46e21.png)
