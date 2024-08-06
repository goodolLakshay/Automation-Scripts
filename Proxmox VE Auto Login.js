// ==UserScript==
// @name         Proxmox VE Auto Login
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Automatically logs in to Proxmox VE
// @author       You
// @match        https://192.168.1.9:8006/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  // Configuration
  const config = {
    username: "ENTER_USERNAME_HERE", // Change to your username
    password: "DOUBLE_CLICk_ON_THESE_FIELDS", // Change to your password
    usernameFieldId: "textfield-1065-inputEl",
    passwordFieldId: "textfield-1066-inputEl",
    loginButtonId: "button-1070",
    retryInterval: 500, // Retry interval in milliseconds
    maxRetries: 20, // Maximum number of retries
    loginDelay: 1000, // Delay in milliseconds before pressing login button (2000 ms = 2 seconds)
  };

  // Utility Functions
  function log(message) {
    console.log(`[Proxmox VE Auto Login] ${message}`);
  }

  function setFieldValue(field, value) {
    if (field) {
      field.value = value;
      field.dispatchEvent(new Event("input", { bubbles: true }));
      field.dispatchEvent(new Event("change", { bubbles: true }));
      log(`Set value for field with id: ${field.id}`);
    } else {
      log(`Field with id ${field.id} not found`);
    }
  }

  function fillCredentials(retryCount = 0) {
    log("Starting to fill credentials...");
    const usernameField = document.getElementById(config.usernameFieldId);
    const passwordField = document.getElementById(config.passwordFieldId);

    if (usernameField && passwordField) {
      log("All fields found, setting values...");
      setFieldValue(usernameField, config.username);
      setFieldValue(passwordField, config.password);

      const loginButton = document.getElementById(config.loginButtonId);
      if (loginButton) {
        log(
          `Login button found, waiting ${
            config.loginDelay / 1000
          } seconds before clicking...`
        );
        setTimeout(() => {
          loginButton.click();
          log("Login button clicked");
        }, config.loginDelay);
      } else {
        log("Login button not found");
      }
    } else {
      if (retryCount < config.maxRetries) {
        log(
          `Retrying to find fields (attempt ${retryCount + 1}/${
            config.maxRetries
          })...`
        );
        setTimeout(() => fillCredentials(retryCount + 1), config.retryInterval);
      } else {
        log("One or more fields not found after maximum retries");
        if (!usernameField)
          log(`Username field with id ${config.usernameFieldId} not found`);
        if (!passwordField)
          log(`Password field with id ${config.passwordFieldId} not found`);
      }
    }
  }

  // Run the function after the page has fully loaded
  window.addEventListener("load", () => fillCredentials());
})();
