import {test,expect} from '@playwright/test';

//For running only Grouping1 
//Execute this command - npx playwright test tests/grouping.spec.ts --grep Grouping1
test.describe('Grouping1', async() => {
    test('Test 1', async({}) => {
        console.log("Test 1");
    });
    test('Test 2', async({}) => {
        console.log("Test 2");
    });
});

//For running only Grouping2 
//Execute this command - npx playwright test tests/grouping.spec.ts --grep Grouping2
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