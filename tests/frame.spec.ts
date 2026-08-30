import {test,expect,Page} from '@playwright/test';

test.describe("Frames",async () =>{
    test.beforeEach("Open the browser", async ({page}) =>{
        await page.goto("https://ui.vision/demo/webtest/frames/");
    })
    test("Get the frames length", async ({page}) => {
        const frame = page.frames();
        console.log(frame.length);
    })
    //Approach:1 - page.frame()
    test("Get the frame using URL", async ({page}) => {
        const frame = page.frame({url:'https://ui.vision/demo/webtest/frames/frame_1'});
        if(frame){
            await frame.locator("input[name='mytext1']").fill("Testing");
            //frame.fill("input[name='mytext1']",'Testing');
        }
    })
    //Approach:2 - page.frameLocator()
    test("Get the frame using FrameLocator", async ({page}) => {
        await page.frameLocator("[src='frame_1.html']").locator("input[name='mytext1']").fill("Testing FrameLocator");
    })
    test("Get the InnerFrames", async ({page}) => {
        const frame = page.frame({url:'https://ui.vision/demo/webtest/frames/frame_5'});
        if(frame){
            const textField =  frame.locator("input[name='mytext5']");
            await textField.fill("Testing");
            await expect(textField).toHaveValue("Testing");
            await frame.locator("a",{hasText:'https://a9t9.com'}).click();
            const logo = frame.locator("img[src='/content/images/ui.vision.logo2.webp']");
            await logo.waitFor({state:"visible"});
            await expect(logo).toBeVisible();
        }
    })
    //Inner frames or child frames
    test("Get the InnerFrames using parent frame", async ({page}) => {
        const frame = page.frame({url:'https://ui.vision/demo/webtest/frames/frame_3'});
        if(frame){
            await frame.locator("input[name='mytext3']").fill("Testing");
            const childFrame = frame.childFrames();
            await childFrame[0].getByLabel("I am a human").check();
        }
    })
})