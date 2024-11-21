# This program will win against Señora Cooper's Word Rodeo 100% of the time
![Screenshot 2024-11-20 at 8 04 11 PM](https://github.com/user-attachments/assets/8b7ae15f-d25f-4d82-adf1-eafdd492567f)

The software stack:
- Python: used to handle URL input and start Playwright
- Node.js: required to run Playwright program
- Playwright: a node.js library for browser automation - in this case, input letters via the onscreen keyboard at the speed of light
- JavaScript/TypeScript: used for writing Playwright scripts

How to run this for yourself (done on macOS, but will still work on windows I think):
1.  download python (latest is fine) & install pkg
2.  download node.js & install pkg
3.  download this code as a zip from github & unzip
4.  download vscode
5.  restart computer
6.  open code folder in vscode
7.  download playwright extention
8.  verify that python is detected and npm is installed
9.  open a vscode terminal window and run: npm init playwright@latest
10. then run (if browsers didn't install): npx playwright install
11. run main.py to use the program
