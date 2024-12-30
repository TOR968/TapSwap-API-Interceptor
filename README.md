# TapSwap API Interceptor

A Tampermonkey userscript for intercepting and logging API requests from TapSwap, specifically focusing on capturing CHQ and CHR values.

## Installation

1. Install the [Tampermonkey](https://www.tampermonkey.net/) browser extension
2. Install [script](https://github.com/TOR968/TapSwap-API-Interceptor/raw/main/tapswap.user.js)

## Usage

The script will automatically:
Open dev console (F12)

-   Log CHQ values when logging in (green color in console)
-   Log CHR values when making challenge requests (green color in console)

## Console Output Examples

Logs

-   Login CHQ value: 998d3892e3992283rn2hdn8232rh89...
-   Challenge CHR value: 361273...
