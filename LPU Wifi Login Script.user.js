// ==UserScript==
// @name         LPU Wifi Login Script
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Automated login for Lovely Professional University internet access.
// @author       You
// @match        https://internet.lpu.in/24online/*
// @match        https://10.10.10.1/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Replace the following variables with your actual username and password
    const username = 'Enter_Your_Username_here';
    const password = 'Enter_Your_Password_here';

    // Function to simulate a real click on the checkbox
    function simulateCheckboxClick(element) {
        const clickEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        });
        element.dispatchEvent(clickEvent);
    }

    // Function to fill in the login form and submit it
    function performLogin() {
        // Check the "I Agree with Terms and Conditions" checkbox
        const agreeCheckbox = document.getElementById('agreepolicy');
        simulateCheckboxClick(agreeCheckbox);

        // Fill in the username and password fields
        const usernameField = document.querySelector('input[name="username"]');
        const passwordField = document.querySelector('input[name="password"]');
        usernameField.value = username;
        passwordField.value = password;

        // Trigger the click event on the "Login" button
        const loginButton = document.getElementById('loginbtn');
        loginButton.click();
    }

    // Wait for the login page to fully load before triggering the login process
    window.addEventListener('load', performLogin);
})();
