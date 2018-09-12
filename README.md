# SC-Social-App

A simple app using result from [JSONPlaceholder](https://jsonplaceholder.typicode.com/).
Showing a list of friends and friends related:

1. POSTS
2. COMMENTS
2. ALBUMS
3. PHOTOS
3. TODOS

## Getting Started
In order to run this project, react-native related plugins have to be installed

###Dependecies
##### 1.Node, Watchman

```
brew install node &&
brew install watchman
```

##### 2. React-Native-CLI

```
npm install -g react-native-cli
```

##### 3. Cocoapods

```
sudo gem install cocoapods
```

#### Step to run this project
Navigate to this project root folder in terminal

##### 1. Install node_modules

```
npm install
```

##### 2. Build iOS workspace

Navigate to ios folder in the project, and execute

```
pod install
```

##### 3. Start Packager

```
npm start
```

##### 4. Build app to simulator/emulator

Navigate back to root folder and execute

```
react-native run-ios

or

react-native run-android
```
