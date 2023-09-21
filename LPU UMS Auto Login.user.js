// ==UserScript==
// @name         LPU UMS Auto Login
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Autofill username and password on LPU UMS login page.
// @author       You
// @match        https://ums.lpu.in/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Replace the following variables with your LPU UMS username and password
    const username = 'Enter your username here';
    const password = 'Enter yout password here';
    
    // Function to simulate a real click on an element
    function simulateClick(element) {
        const clickEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        });
        element.dispatchEvent(clickEvent);
    }

    // Function to simulate a real click on the login button
    function simulateLoginClick() {
        const loginButton = document.getElementById('iBtnLogins');
        simulateClick(loginButton);
    }

    // Wait for the login page to fully load before autofilling the login form
    window.addEventListener('load', function() {
        // Fill in the username field
        const usernameField = document.getElementById('txtU');
        usernameField.value = username;

        // Fill in the password field
        const passwordField = document.getElementById('TxtpwdAutoId_8767');
        passwordField.value = password;

        // Submit the form by clicking the login button
        simulateLoginClick();
    });
})();
