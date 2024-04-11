import json
import urllib.parse
from playwright.async_api import async_playwright
from random_user_agent.user_agent import UserAgent
import subprocess


async def run_node_script(encrypted):
    process = await asyncio.create_subprocess_exec('node', 'index.js', encrypted, stdout=subprocess.PIPE)
    output, _ = await process.communicate()
    output = output.decode('utf-8').strip()
    decrypted = json.loads(output)["word"]
    print(decrypted)
    return decrypted


async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)  
        context = await browser.new_context(user_agent=UserAgent().get_random_user_agent())
        page = await context.new_page()

        url = input('Enter a URL:  ')
        await page.goto(url)

        button = await page.wait_for_selector('//*[@id="modal-panel"]/div[1]/button')
        await button.click()

        parsed_url = urllib.parse.urlparse(url)
        encrypted_text = parsed_url.fragment

        decrypted_word = await run_node_script(encrypted_text)

        await page.bring_to_front()

        for word in ['tengo', 'busca', 'estar', 'adios', 'madre', decrypted_word]:
            await input_word(page, word)

        await page.click('//*[@id="modal-panel"]/div[1]/button')

        await page.eval_on_selector('xpath=/html/body/div[1]/div[1]', 'element => { element.scrollTop = element.scrollHeight; }')

        await asyncio.Future()


async def input_word(page, word):
    for i in word:
        await page.click(f"button.key[data-key='{i}']")
    await page.click("button.key[data-key='enter']")


if __name__ == "__main__":
    import asyncio
    asyncio.run(main())

