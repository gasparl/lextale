### LexTALE(_CH)

Web-based (HTML/JavaScript) and PsychoPy (Python) implementations of the original *LexTALE* (English, German, Dutch; Lemhöfer & Broersma, 2012) and *LexTALE_CH* (Mandarin Chinese; Chan & Chang, 2018).

The original three languages are also freely available at the official website (http://www.lextale.com/), but the present implementation has some advantages:
- It's open source and thereby easy to modify for any specific uses online and offline (see below).
- It does not automatically display the end results (so participants won't know it unless the experimenter allows it).
- It records each response including response times. (And also records full test duration.)

As for *LexTALE_CH*, to my knowledge this is the first computerized implementation available for use.


### HOW TO USE

The simplest way to use this application is via the "GitHub Pages" website of this repository itself: https://gasparl.github.io/lextale/. Just open it in a modern browser (practically anything except Internet Explorer), select the language and click START to begin the test.

#### Results

At the end of the test a simple text "The test is completed." is displayed. Results are not displayed automatically so that the tested persons would not see them if they are not supposed to. The summary as well as detailed (trial level) results can be accessed by simply double-clicking on this "The test is completed." text. (They are also written to the browser [Console](https://webmasters.stackexchange.com/questions/8525/how-do-i-open-the-javascript-console-in-different-browsers); and the detailed trial level data stored in the `full_data` variable also accessible via the Console.) On smartphones, long press can be used instead of double click – but generally this application is not optimized for mobile phones.

#### Download or Clone

The application can of course also be downloaded or forked/cloned via Git. E.g. simply use the green "Clone or download" button on this page chosing *Download ZIP*. After downloading, extract the *zip* file into a single folder. Open the *index.html* file in a browser, and it will work just as well as the online version, but with no need for active internet connection.

This way the code can also be modified for specific purposes. For example, you can add instructions in the participants' native language: just open the *html* file in any text editor and add your text next to (or in place of) the original instructions. As long as the tags and similar special characters are intact, the test will work just the same.

Another simple modification you can do is to remove start page selection options and select another default language to be tested. For this, in the *html* file (around the beginning), remove all the option labels between `LexTALE: select language to be tested` and `START`. In the *main.js* change the language code value `'en'` in the initial line `let lexlang = 'en';` to the desired language, e.g. `let lexlang = 'nl';` for Dutch (see all options listed in a comment in the same line in the file).

If the modified version of the application is uploaded (forked/pushed/cloned) into a new GitHub repository, a webpage for the application may also be easily created using GitHub Pages (available under repository Settings).


#### PsychoPy

To embed the LexTale into a [PsychoPy](https://www.psychopy.org/) task (which was my reason) or for extreme timing precision (which is hardly necessary), you can use the *.py* files. For this, you'll need [*PsychoPy 2* (ideal version: StandalonePsychoPy2-1.90.3)](https://github.com/psychopy/psychopy/releases?after=3.0.0b1) (not 3 or 2020!). From this repository, you only need the one *.py* file for the specific language, e.g. *LexTALE_en.py* for English. Then you run that file from PsychoPy. (Note: I don't have Chinese version for PsychoPy, only English/German/Dutch.)


### SUPPORT

If you find any problems, [write an email](mailto:lkcsgaspar@gmail.com) or [open a new issue](https://github.com/gasparl/lextale/issues "Issues").

(You can also contact me if you need another language implemented, though no promises.)


### REFERENCES


Chan, I. L., & Chang, C. B. (2018). LEXTALE_CH: A quick, character-based proficiency test for Mandarin Chinese. In A. B. Bertolini & M. J. Kaplan (Eds.), Proceedings of the 42nd Annual Boston University Conference on Language Development, vol. 1 (pp. 114–130). Somerville, MA: Cascadilla Press. (Material from https://osf.io/qdy4n/)


Lemhöfer, K., & Broersma, M. (2012). Introducing LexTALE: A quick and valid Lexical Test for Advanced Learners of English. Behavior Research Methods, 44(2), 325–343. https://doi.org/10.3758/s13428-011-0146-0 (Material from http://www.lextale.com/)

If you want to cite this code source just refer to this repo, e.g.:

Lukács G. (2020). LexTALE. https://github.com/gasparl/lextale

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.3826505.svg)](https://doi.org/10.5281/zenodo.3826505)
