# yelperout
Yelper Out (Help Her Out) mobile app that wraps yelp in a unique way.

- [yelperout](#yelperout)
  - [Build for local testing](#build-for-local-testing)
  - [Issues](#issues)
  - [Enhancements](#enhancements)
  - [Screenshots](#screenshots)

## Build for local testing
This is just working locally for ios right now, android to come
1. Set up the machine for react native development [RN Docs](https://reactnative.dev/docs/environment-setup)
2. Clone this repository
3. In the root of this repo, execute `yarn install`, which will install node_modules.
4. In  `app/app.tsx` replace apiKey with your created [Yelp Fusion](https://www.yelp.com/developers/v3/manage_app) api key
5. After node_modules is installed we need to link pods for ios `cd ios && pod install && cd ..`
6. We are ready to build iOS `yarn ios`

## Issues

- *Search results not updating*
  - Check to make sure your api key is getting hit in [Yelp Fusion](https://www.yelp.com/developers/v3/manage_app)
  - Implemented a debounce so there may be a slight delay on a search query, to trigger the callback maybe add a space to the input or try selecting a categegory or location again
- *Get location error on first launch*
  - Accept the permission and reload the app (in a prod environment I would add a permissions listener to automatically refresh on permission grant)
- *Emptying location causes an undefined error*
  - This seems to be a side affect of the simple debounce, just reload the app

## Enhancements
Check out our project boards and issues as I plan on leveraging Github to maintain this app and add future enhancements

https://github.com/skarDude/yelperout/projects/


## Screenshots
![Simulator Screen Shot - iPhone 11 - 2021-04-05 at 00 31 20](https://user-images.githubusercontent.com/12519126/113549816-e7bd8880-95a6-11eb-8ad0-6e618ff55a7a.png)

![Simulator Screen Shot - iPhone 11 - 2021-04-05 at 00 31 49](https://user-images.githubusercontent.com/12519126/113549819-e9874c00-95a6-11eb-8967-1f6b6dc7b3d6.png)
![Simulator Screen Shot - iPhone 11 - 2021-04-05 at 00 32 02](https://user-images.githubusercontent.com/12519126/113549821-eab87900-95a6-11eb-8f6f-d5a0f27bea15.png)
![Simulator Screen Shot - iPhone 11 - 2021-04-05 at 00 32 14](https://user-images.githubusercontent.com/12519126/113549823-eb510f80-95a6-11eb-8ea2-b8e8ff24db11.png)
![Simulator Screen Shot - iPhone 11 - 2021-04-05 at 00 32 28](https://user-images.githubusercontent.com/12519126/113549824-ebe9a600-95a6-11eb-9028-c09545583cb3.png)
![Simulator Screen Shot - iPhone 11 - 2021-04-05 at 00 33 48](https://user-images.githubusercontent.com/12519126/113549826-ebe9a600-95a6-11eb-810e-6bdc11b1e65e.png)
![Simulator Screen Shot - iPhone 11 - 2021-04-05 at 00 35 24](https://user-images.githubusercontent.com/12519126/113549828-ec823c80-95a6-11eb-8a7c-d88b92e46e21.png)
