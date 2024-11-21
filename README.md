# This program will win against Señora Cooper's Wordle Wednesday game 100% of the time
![Screenshot 2024-11-20 at 8 04 11 PM](https://github.com/user-attachments/assets/8b7ae15f-d25f-4d82-adf1-eafdd492567f)

The software stack:
- Python: used to handle URL input and launch Playwright
- Node.js: required to run the Playwright program and decrypt the word
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

### How does Word Rodeo Work? How the heck do I operate this program???
Word Rodeo is a local, browser-based parody of Wordle that allows users to create their own custom games across a variety of different languages. When Señora Cooper gives you a link for the game at the beginning of class, the answer is already given to you - believe it or not. A part of the link called the fragment identifier is a string of data after the hashtag that acts as an input to the game, and in this case, an encrypted form of the answer. This prevents users from seeing the solution while eliminating the need for your guesses to be checked against an online server. Locally, the string is decrypted back to the original word so that you can play the game as intended.

A source code file of Word Rodeo, specifically crypto.js, visibly contains the decryption key that is constant for all games. Surprisingly, the developer wrote a note at the top of the file that says, "We encrypt the URL with this key. If you really want to cheat you can do it with this. :)" Below remained the decryption key, ```const CRYPTO_KEY = "T7MSZsmiUrENC4Dk23koFA28";```, and a function for decrypting the hidden word. The most essential part of the program in this repository is that same exact decryption function found in the source of Word Rodeo. After you install the dependencies of this program and run the ```main.py``` file, you will be reminded to join your phone's hotspot and asked to use the last-inputted link. Upon entering "N," you will be prompted to paste in the link to the Wordle Wednesday link (Word Rodeo) that Señora Cooper posts on Google Classroom. Clicking enter again, the Playwright software will launch. On the left panel, you will hover over the nested item named "decrypt and enter answer" and click on the green play button. The first five entered words are predetermined and sneakily used to deter any suspicion of cheating off another student. The last word matches the decrypted word and will always be correct. Within seconds, you will have revealed the hidden Wordle Wednesday answer and earned yourself +1 point for your grade.

### Please use this fairly and responsibly. Personally, this project helped to increase my average by several points.
