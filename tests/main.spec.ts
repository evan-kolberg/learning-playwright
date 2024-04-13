import { test } from '@playwright/test';
import { Page } from 'playwright';
import { readFile } from 'fs/promises';

async function runNodeScript(encrypted: string): Promise<string> {
    const util = require('util');
    const exec = util.promisify(require('child_process').exec);
    const { stdout } = await exec(`node index.js ${encrypted}`);
    return JSON.parse(stdout).word;
}

async function inputWord(page: Page, word: string): Promise<void> {
    for (const i of word) {
        await page.click(`button.key[data-key='${i}']`);
    }
    await page.click("button.key[data-key='enter']");
}

test('decrypt and enter answer', async ({ page }) => {

    const url = JSON.parse(await readFile('tests/url.json', 'utf-8')).url;
    await page.goto(url);

    const button = await page.waitForSelector('//*[@id="modal-panel"]/div[1]/button');
    await button.click();

    const parsedUrl = new URL(url);
    const encryptedText = parsedUrl.hash.substring(1);

    const decryptedWord = await runNodeScript(encryptedText);

    const words: string[] = ['tengo', 'busca', 'estar', 'adios', 'madre', decryptedWord];
    for (const word of words) {
        await inputWord(page, word);
    }

    await page.click('//*[@id="modal-panel"]/div[1]/button');

    await page.evaluate(() => {
        const element = document.evaluate('/html/body/div[1]/div[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (element instanceof HTMLElement) {
            element.scrollTop = element.scrollHeight;
        }
    });
});


