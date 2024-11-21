import json
import subprocess

def main():
    try:
        with open('tests/url.json', 'r') as file:
            data = json.load(file)
            existing_url = data.get('url')
    except FileNotFoundError:
        existing_url = None

    prompt = "\nEnter the URL:  "
    if existing_url:
        use_last_link = input(f"\n* make sure to use phone hotspot *\nUse last link? (y/N): ").strip().lower()
        if use_last_link == 'y':
            url = existing_url
        else:
            url = input(prompt)
    else:
        url = input(prompt)

    with open('tests/url.json', 'w') as file:
        json.dump({"url": url}, file)

    subprocess.run(["npx", "playwright", "test", "main.spec.ts", "--ui"])

if __name__ == "__main__":
    main()

