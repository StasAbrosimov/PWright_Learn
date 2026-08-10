import { test, expect } from '@playwright/test'

test('the-internet.herokuapp DD', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/drag_and_drop')
    //drag element

    await expect(page.locator('#column-a>header')).toHaveText('A')
    await expect(page.locator('#column-b>header')).toHaveText('B')

    var colA = page.locator('#column-a');
    //drop target
    var colB = page.locator('#column-b');

    await colA.dragTo(colB);

    await expect(page.locator('#column-a>header')).toHaveText('B')
    await expect(page.locator('#column-b>header')).toHaveText('A')
});



test('jQuery + iFrame Droppable DD', async ({ page }) => {
    await page.goto('https://jqueryui.com/droppable/')

    var innerIframe = page.frameLocator('.demo-frame')
    //drag element
    var draggable = innerIframe.locator('#draggable');
    //drop target
    var droppable = innerIframe.locator('#droppable');

    await draggable.dragTo(droppable);

    await expect(innerIframe.locator('#droppable>p')).toHaveText('Dropped!');
});


