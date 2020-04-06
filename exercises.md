# Codeworks Pre Course Exercises

There are three exercises that you need to complete as part of the Codeworks pre course curriculum: Underline, Stringifier, and Instatags (go through them in this order).

Consider that the first one is going to take you at least double the time than each of the other two to complete.

For each exercise you find a separate folder in this repository, containing a readme file with instructions.

## Help

Whenever you’re stuck, feel free to look for information online (e.g. checking docs on [MDN](https://developer.mozilla.org/en/docs/Web), or reading answers on [Stack Overflow](http://stackoverflow.com/)). Make sure you don’t search for the entire exercise solution, as this would obviously defeat the course purpose.

For example, when you’re implementing the `_.each()` function in Underline you might search online for information like “js iterate over object ignoring prototype“, but not things like “js how to implement each“.

For the same reason obviously you’re not supposed to look up / copy the source code from an existing library, or from solutions implemented by other students.

On the other hand, you’re more than welcome to interact with fellow students and instructors, posting questions on Slack.

### Support sessions

Once you start writing some code, you have access to a weekly video call with other coursemates and instructors to check your progress, help you get unstuck, and answer any questions you have.

These calls are optional but highly recommended. In order to participate you need to sign up for each session in advance through [this calendar](https://calendly.com/codeworks-instructors/support-session).

## Setting up your environment

To be able to do the exercises, you need to have the following software installed on your computer. Here we provide instructions for Mac computers, using the native Terminal app or [Hyper](https://hyper.is/).

If you have Windows or Linux, search instructions on Google to figure out how to proceed.

### Terminal

Install [Homebrew](http://brew.sh/) and [oh-my-zsh](https://ohmyz.sh/).

### Git

Set up [authentication](https://help.github.com/en/github/getting-started-with-github/set-up-git#next-steps-authenticating-with-github-from-git).

If you’re working with a Windows system run `git config --global core.autocrlf false`.

### Node

Install [nvm](https://github.com/creationix/nvm), close your terminal window and open it again. Type `nvm install node`.

### Gulp

Once Node is properly installed on your computer, to install [Gulp](http://gulpjs.com/) just type `npm install -g gulp-cli`.

### Markdown

All the docs are written in [Markdown](https://guides.github.com/features/mastering-markdown/) format. If you’re not familiar with it yet, take a few minutes to figure out how it works (it should be quite easy for you at this point). Then install an editor / viewer on your computer, so you can enjoy a nicer formatting. Our favorite one is [Typora](https://www.typora.io/).

### Code editor

Set up your editor to indent with 2 spaces, and remove trailing whitespace. Then follow our [coding style guide](https://github.com/codeworks/style-guide).

If you’re working with a Windows system, make sure the editor is set up to use Unix [line endings](https://en.wikipedia.org/wiki/Newline) by default before you open and save any repo file (otherwise it will generate many errors in the linter when you try to commit your work).

## Workflow

Once your environment has been set up, you’re ready to work on the exercises. For starters, [fork](https://help.github.com/articles/fork-a-repo/) this repo on GitHub so you have a copy of it in your account. From this moment onwards, you’re only going to work on the fork and you can forget about the original repo.

Now [clone](https://help.github.com/articles/cloning-a-repository/) the fork on your computer, in any folder that you’d like to use for the exercises. Open a terminal window at the home folder of the cloned repo, and run `npm install`.

### Linting

Writing clean code is a great quality for a programmer. One of the aspects of clean code is formatting. The repo has been set up so that you can run the `gulp lint` command at any time, and check if your code is properly formatted. Try to run this command every few lines of code that you write, especially at the beginning, so that you don’t accumulate too many errors.

We have created a Git hook that makes commits fail if there are any issues with your linting. So, to be able to commit you need to first fix your formatting and then you can proceed.

### Committing

As you’ll go through the exercises, get used to commit often. This will seem a bit strange in the beginning, but it’s a very good habit to develop and will help you a lot down the road. In general you should commit every time that you have written some new functionality, or fixed a bug (usually this corresponds to just a few lines of code). In particular use this procedure:

-  Run `git status` to check what files have changed.
-  Execute `git diff` to check exactly what changes you would be committing.
-  Use `git add <your file name>` to add a file to the current commit, or `git add .` if after previous steps you’re 100% sure that you want to add all current changes to your next commit.
-  Run `git status` again to confirm what files you’re about to commit.
-  Finally create your commit using `git commit`.


Commit messages should be short and descriptive, possibly providing some context. For example, if you just implemented the `pluck` function in Underline, your commit message could look something like `underline add pluck`.

Some projects even try to create standards for commit messages (e.g. check the [Angular guidelines](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit)). To help keeping your commit messages tidy, consider using [Commitizen](https://github.com/commitizen/cz-cli) (`npm install -g commitizen`). All the steps described above would be exactly the same, apart from the last one. In fact in this case you create your commits using `git cz` instead.  Choose a change type from the menu that pops up, then press enter, type a short description using the present tense, then keep pressing enter and skip the next fields until your commit is done.

### Submitting your work

You’re required to submit the completed pre-course exercises at least one week before the main course starts. Otherwise your attendance is rescheduled for future cohorts.

Once you’ve completed the first coding assignment, before moving to the next one, push all your commits to `origin` (the forked repo you have on GitHub). Then check if your fork is in sync with the original pre course repo, by adding an upstream and pulling it with rebase.

```shell
# From the project folder check your current remotes:
git remote -v

# This should output something like:
# origin  https://github.com/YOUR_USERNAME/pre-course.git (fetch)
# origin  https://github.com/YOUR_USERNAME/pre-course.git (push)

# Now add the upstream (afterwards check your remotes again if you like):
git remote add upstream https://github.com/codeworks/pre-course.git

# Finally check if your fork is in sync by running a pull with rebase:
git pull --rebase upstream master

# Merge any conflicts if needed, otherwise you’re ready to send a pull request.
```

To submit your work, go on GitHub and create a [pull request](https://help.github.com/articles/creating-a-pull-request/) from your fork to the original Codeworks repository (on the top you’ll see a button that says “New pull request“).

When you complete the next exercises, check again if your fork is in sync with upstream as described above, then push your commits to `origin` and your previous pull request will automatically be updated.

## Start coding

Ok, you should be ready to start coding! Navigate to the home folder of Underline on your local computer (e.g. `cd underline`), and follow the instructions in the readme there.
