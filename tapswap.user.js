// ==UserScript==
// @name         TapSwap API Interceptor
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Intercept and log API requests for TapSwap
// @author       You
// @match        https://*.tapswap.club/*
// @run-at       document-start
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tapswap.club
// @grant        none
// ==/UserScript==

(function () {
    "use strict";

    const originalFetch = window.fetch;
    window.fetch = async function (...args) {
        const url =
            args[0] instanceof URL ? args[0].href : typeof args[0] === "string" ? args[0] : args[0]?.url || "unknown";

        try {
            if (url.includes("/challenge") && args[1]?.body) {
                try {
                    const body = JSON.parse(args[1].body);
                    if (body.chr) {
                        console.log("%c Challenge CHR value:", "color: green", body.chr);
                    }
                } catch (e) {
                    console.error("Failed to parse challenge request body:", e);
                }
            }

            const response = await originalFetch.apply(this, args);
            const clone = response.clone();

            try {
                const responseData = await clone.text();

                if (url.includes("/login")) {
                    try {
                        const json = JSON.parse(responseData);
                        if (json.chq) {
                            console.log("%c Login CHQ value:", "color: green", json.chq);
                        }
                    } catch (e) {
                        console.error("Failed to parse login response:", e);
                    }
                }

                return response;
            } catch (parseError) {
                console.error("Response parsing error:", parseError);
                return response;
            }
        } catch (fetchError) {
            console.error("Fetch error:", fetchError);
            throw fetchError;
        }
    };
})();
