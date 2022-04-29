import { _electron as electron } from "playwright";
import { test, expect } from "@playwright/test";
import { resolve } from "path";
import * as fs from "fs";

test("Front page is called Cider", async () => {

    //app set up
    const paths = {
        "mainBuild": resolve(__dirname, "../../build/"),
        "main": resolve(__dirname, "../main"),
        "root": resolve(__dirname, "../../"),
        "cwd": __dirname,
        "processcwd": process.cwd()
    }

    const electronApp = await electron.launch({ args: ['build/index.js'], cwd: paths.root });

    const appPath = await electronApp.evaluate(async ({ app }) => {
        // This runs in the main Electron process, parameter here is always
        // the result of the require('electron') in the main app script.
        return app.getAppPath();
    });

    //get title of first window page
    const window = await electronApp.firstWindow();

    //if title is not cide, test fails
    expect(await window.title()).toEqual("Cider");


    //close app
    await electronApp.close();
});

test("HTML", async () => {

    //app set up
    const paths = {
        "mainBuild": resolve(__dirname, "../../build/"),
        "main": resolve(__dirname, "../main"),
        "root": resolve(__dirname, "../../"),
        "cwd": __dirname,
        "processcwd": process.cwd()
    }

    const electronApp = await electron.launch({ args: ['build/index.js'], cwd: paths.root });

    const appPath = await electronApp.evaluate(async ({ app }) => {
        // This runs in the main Electron process, parameter here is always
        // the result of the require('electron') in the main app script.
        return app.getAppPath();
    });

    //get title of first window page
    const window = await electronApp.firstWindow();

    console.log(window.innerHTML(""));

    //close app
    await electronApp.close();
});

test("Process", async () => {

    //app set up
    const paths = {
        "mainBuild": resolve(__dirname, "../../build/"),
        "main": resolve(__dirname, "../main"),
        "root": resolve(__dirname, "../../"),
        "cwd": __dirname,
        "processcwd": process.cwd()
    }

    const electronApp = await electron.launch({ args: ['build/index.js'], cwd: paths.root });

    const appPath = await electronApp.evaluate(async ({ app }) => {
        // This runs in the main Electron process, parameter here is always
        // the result of the require('electron') in the main app script.
        return app.getAppPath();
    });

    //get title of first window page
   // console.log(await electronApp.process());


});


//fails to see buttons
test("Ensure only button visible", async () => {

    const paths = {
        "mainBuild": resolve(__dirname, "../../build/"),
        "main": resolve(__dirname, "../main"),
        "root": resolve(__dirname, "../../"),
        "cwd": __dirname,
        "processcwd": process.cwd()
    }

    const electronApp = await electron.launch({ args: ['build/index.js'], cwd: paths.root });

    const appPath = await electronApp.evaluate(async ({ app }) => {
        // This runs in the main Electron process, parameter here is always
        // the result of the require('electron') in the main app script.
        return app.getAppPath();
    });

    const window = await electronApp.firstWindow();
    expect(await window.isVisible("button")).toBeTruthy();

    await electronApp.close();
});

//FAILING TEST
//None of the buttons work on this app (at least not when not logged in)
test("button", async () => {

    //app set up
    const paths = {
        "mainBuild": resolve(__dirname, "../../build/"),
        "main": resolve(__dirname, "../main"),
        "root": resolve(__dirname, "../../"),
        "cwd": __dirname,
        "processcwd": process.cwd()
    }

    const electronApp = await electron.launch({ args: ['build/index.js'], cwd: paths.root });

    const appPath = await electronApp.evaluate(async ({ app }) => {
        // This runs in the main Electron process, parameter here is always
        // the result of the require('electron') in the main app script.
        return app.getAppPath();
    });

    const mainWindow = await electronApp.firstWindow();
    const [window] = await Promise.all([electronApp.waitForEvent('window'), mainWindow.click('button')])
    console.log([window])

});

test("Ensure only one window open", async () => {

    const paths = {
        "mainBuild": resolve(__dirname, "../../build/"),
        "main": resolve(__dirname, "../main"),
        "root": resolve(__dirname, "../../"),
        "cwd": __dirname,
        "processcwd": process.cwd()
    }

    const electronApp = await electron.launch({ args: ['build/index.js'], cwd: paths.root });

    const appPath = await electronApp.evaluate(async ({ app }) => {
        // This runs in the main Electron process, parameter here is always
        // the result of the require('electron') in the main app script.
        return app.getAppPath();
    });

    const window =  electronApp.windows();
    expect(window.length).toEqual(1);

    await electronApp.close();
});


test("browserWindow", async () => {

    const paths = {
        "mainBuild": resolve(__dirname, "../../build/"),
        "main": resolve(__dirname, "../main"),
        "root": resolve(__dirname, "../../"),
        "cwd": __dirname,
        "processcwd": process.cwd()
    }

    const electronApp = await electron.launch({ args: ['build/index.js'], cwd: paths.root });

    const appPath = await electronApp.evaluate(async ({ app }) => {
        // This runs in the main Electron process, parameter here is always
        // the result of the require('electron') in the main app script.
        return app.getAppPath();
    });

    const window =  electronApp.firstWindow();
    const browser = electronApp.browserWindow(await window)

    expect(browser[Symbol.toStringTag]);
    await electronApp.close();
});

test("browserWindow Returns Promise", async () => {

    const paths = {
        "mainBuild": resolve(__dirname, "../../build/"),
        "main": resolve(__dirname, "../main"),
        "root": resolve(__dirname, "../../"),
        "cwd": __dirname,
        "processcwd": process.cwd()
    }

    const electronApp = await electron.launch({ args: ['build/index.js'], cwd: paths.root });

    const appPath = await electronApp.evaluate(async ({ app }) => {
        // This runs in the main Electron process, parameter here is always
        // the result of the require('electron') in the main app script.
        return app.getAppPath();
    });

    const window =  electronApp.firstWindow();
    const browser = electronApp.browserWindow(await window);

    expect(browser).toBe(Promise);
    await electronApp.close();
});

test("browserWindow Returns Context", async () => {

    const paths = {
        "mainBuild": resolve(__dirname, "../../build/"),
        "main": resolve(__dirname, "../main"),
        "root": resolve(__dirname, "../../"),
        "cwd": __dirname,
        "processcwd": process.cwd()
    }

    const electronApp = await electron.launch({ args: ['build/index.js'], cwd: paths.root });

    const appPath = await electronApp.evaluate(async ({ app }) => {
        // This runs in the main Electron process, parameter here is always
        // the result of the require('electron') in the main app script.
        return app.getAppPath();
    });

    const browser = electronApp.context();
    expect(browser)
    await electronApp.close();
});

test("window values", async () => {

    const paths = {
        "mainBuild": resolve(__dirname, "../../build/"),
        "main": resolve(__dirname, "../main"),
        "root": resolve(__dirname, "../../"),
        "cwd": __dirname,
        "processcwd": process.cwd()
    }

    const electronApp = await electron.launch({ args: ['build/index.js'], cwd: paths.root });

    const appPath = await electronApp.evaluate(async ({ app }) => {
        // This runs in the main Electron process, parameter here is always
        // the result of the require('electron') in the main app script.
        return app.getAppPath();
    });

    const window = electronApp.windows();
    expect(window.values()).toContain(Object)
});


test("window values ", async () => {

    const paths = {
        "mainBuild": resolve(__dirname, "../../build/"),
        "main": resolve(__dirname, "../main"),
        "root": resolve(__dirname, "../../"),
        "cwd": __dirname,
        "processcwd": process.cwd()
    }

    const electronApp = await electron.launch({ args: ['build/index.js'], cwd: paths.root });

    const appPath = await electronApp.evaluate(async ({ app }) => {
        // This runs in the main Electron process, parameter here is always
        // the result of the require('electron') in the main app script.
        return app.getAppPath();
    });

    const window = electronApp.windows();
    window.entries()
    console.log(window.entries())

});