# Jipcode

This is node porting of <https://github.com/rinkei/jipcode>
This library is available in the browser.

## Why?

I wanted to use the same data for server and client. But I didn't want to use the server's resources.
And there was no Japanese address library available in TypeScript, where dependency maintenanced continually.

## Installation

```
yarn add jipcode
```

or

```
npm install jipcode
```

## Usage

Basically, it has same interface with ruby version.

```ts
import { locate } from "jipcode";

await locate("1150051")
// returns [{ city: "北区", prefecture: "東京都", town: "浮間", zipcode: "1150051" }]

await locate("1150051", { prefectureCode: true })
// returns [{ city: "北区", prefecture: "東京都", prefectureCode: 13, town: "浮間", zipcode: "1150051" }]
```

- `zipcode`: 郵便番号
- `prefecture`: 都道府県
- `city`: 市区町村
- `town`: 町域番地

## Release

It will be released after ruby version release.

## Any problem?

Feel free to report issues. 😃

