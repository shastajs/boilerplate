# shasta-boilerplate

This is a work in progress - There is sparse documentation, no tests, and it's not on npm. Use at your own risk while we finish up!

## Getting Started

### Setup

```
git clone https://github.com/shastajs/boilerplate your-project
cd your-project
rm -rf .git
npm install
npm start
```

### Configure

- Open the `config` folder
- Walk through each file and put in your facebook login tokens, database credentials, etc.

## What's Included

Early list, barely any info - lots more to document.

## Client

- webpack w/ hot reloading
- shasta
- shasta-router
- shasta-data-view
- shasta-logger
- sass
  - rucksack
- semantic ui

## Server

## Connections

- redis
- rethinkdb via thinky

## HTTP

- sutro
  - Provides all APIs from models
- passport
  - facebook provider
