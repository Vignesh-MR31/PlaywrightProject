import {test,expect} from '@playwright/test';

test.beforeAll('Open browser', async()=>{
    console.log("Open Browser");
})

test.afterAll('Logout', async()=>{
    console.log("Close Browser");
})

test.beforeEach('Login', async()=>{
    console.log("Logged In successfully");
})

test.afterEach('Close browser', async()=>{
    console.log("Logged out successfully");
})

test.describe('Grouping1', async() => {
    test('Test 1', async({}) => {
        console.log("Test 1");
    });
    test('Test 2', async({}) => {
        console.log("Test 2");
    });
});


test.describe('Grouping2', async() => {
    test('Test 3', async({}) => {
        console.log("Test 3");
    });
    test('Test 4', async({}) => {
        console.log("Test 4");
    });
    test('Test 5', async({}) => {
        console.log("Test 5");
    });
});