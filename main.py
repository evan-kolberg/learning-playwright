import json
import subprocess

def get_user_input():
    return input("Enter the URL: ")

def read_url_from_json():
    try:
        with open('tests/url.json', 'r') as file:
            data = json.load(file)
            return data.get('url')
    except FileNotFoundError:
        return None

def write_url_to_json(url):
    data = {"url": url}
    with open('tests/url.json', 'w') as file:
        json.dump(data, file)

def should_use_last_link():
    existing_url = read_url_from_json()
    if existing_url:
        use_last_link = input(f"Use last link? (y/N): ").strip().lower()
        return use_last_link == 'y'
    return False

def run_playwright_test():
    subprocess.run(["npx", "playwright", "test", "main.spec.ts", "--ui"])

def main():
    if should_use_last_link():
        url = read_url_from_json()
    else:
        url = get_user_input()
        write_url_to_json(url)

    run_playwright_test()

if __name__ == "__main__":
    main()

