# Udacity Feed Reader Guide
This here is the feed reader project rundown. It was made after I banged my head again and again against the nearest wall, submitted the project thrice and drank loads of coffee, and decided somthing was broken here. 
## Part 1
### First test
```sh
        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
```
Here we're asked to loop through the allFeeds array and check if all the feeds have a URL defined.
Seems pretty easy when we have the forEach method.
Now we just need to look at the allFeeds array and figure it out.
### hint
Try logging the allFeeds array in the console and see it's porperties before looping through them.
### Second test

```sh
        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
```
Same thing only this time with the feed's name this time.

### Solution
When logging the allFeeds array we see that it's comprised by objects, each object having 3 properties: name (string), url (string) and id (integer). We can use the id to loop through the array since it is an integer starting at 0 and increments with each object. However there's no real need for that since the forEach method takes care of the looping with very little syntax. 

```sh
describe('RSS Feeds', () => {
        /* Tests to make sure that the allFeeds variable has
         * been defined and that it is not empty.*/
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.*/
        it('have a valid url', () => {
            allFeeds.forEach((feed) => {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeGreaterThan(0);
            });
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.*/
        it('have a valid name', () => {
            allFeeds.forEach((feed) => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).toBeGreaterThan(0);
            });
        });
    });
```

## Part 2
### First test
```sh
/* TODO: Write a new test suite named "The menu" */
    
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
```
Alright, so let's see the HTML. Aha! it looks like the body tag has a `.menu-hidden` class by default - this must be what hides the menu. Try and remove it in the developers tools.
A short glance at the app.js file and we can find the menu button functionality which assuers the assumption.
I think you got this one, try and solve it.
### Second test
```sh
         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
```
A bit trickier. A short google reveals we can trigger a click on an element. Try and google it.

### Solution
The first test is pretty easy. All we need to do is see if the `body` element has the `menu-hidden` class, and then wrap it in the `expect()` functions with hopes it'll be `true`.
And there's the `click()` method which we can invoke on any elemnt to simulate a click event. So we invoke it once, expecting the `menu-hidden` class to be removed, and then click again expecting it to return.
```sh
/* Test suite that checks menu functionality */
    describe('The menu', () => {

        /* Test that ensures the menu element is
         * hidden by default.*/
        it('hides the menu by default', () => {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* Test that ensures the menu changes
         * visibility when the menu icon is clicked.*/
        it('visibility is toggled upon click on menu icon', () => {

            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);

            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });
```

## part 3

```sh
 /* TODO: Write a new test suite named "Initial Entries" */

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
```
Oh no, async! I tried this one and failed several times.
Here's what I know about async:
It's code that runs at the end of the code-run, when the "stack" is empty. When I see async code I know it'll run last. So now all we need to do is use Jasmine's `beforeEach()` function to make sure we test it the async way.
One more thing, I encourage you to look at the loadFeed function. Look at its parameters and try to learn how it works on the large scale (not the specifics).

### hint 01
cb = callback

### hint 02
Go back to the unit test lesson and watch the Correcting our Async Test video 2-3 times. It really helps.

### Solution
Alrighty then, this one was quite difficult for me and took me several tries.
First the structure of the test is the same as in the lesson's video, it's simply how the function works. Second, I realized that the loadFeed function has a `cb` parameter which is short for callback. loadFeed runs the function you enter as the callback and that's how and when I can assign a varialbe the value I need, which in this case is the length of and entries in the feed. Btw, the varialbe should be at the test scope since we want to access it later on.

### extra
When you implement this, or your own solution, I encourage you to add breakpoints at every line in this test when using the developer tools. You actually see the way the browser skips async functions and goes back to them later on.

```sh
/* Test suite that checks the loadFeed functionality*/
describe('Initial Entries', () => {

    /* Test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.*/
    let feedLength;
    beforeEach((done) => {
        loadFeed(0, () => {
            feedLength = $('.feed .entry').length;
            done();
        });
    });

    it('has at least one entry', (done) => {
        expect(feedLength).toBeGreaterThan(0);
        done();
    });
});
```

## part 4

```sh
/* TODO: Write a new test suite named "New Feed Selection" */

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
```
Pretty tough right? My reviewer actually helped me out. My initial solution gave the desired result, and was in its essence correct, however was sritten so horribly and returned different values. So I thought I passed the test in flying colors but my reviewer soon grounded me, with encouraging words, and helped me big time.
Let's start with understanding what is required:
1. load a feed
2. store its value
3. load a *different* feed
4. store its value
5. compare

After the last test this should be, if not easy, at least manageable. I believe you can do it! So give it an hour or so, take a tea break and back again.

### hint 01
Be careful where you place your `done()` function, you want it to run and return to the test at the right moment when the second loadFeed is actually done.

### hint 02
Look up how to assign an elements *content* to a variable.

### Solution
Our 5 stages from before can be read like pseudo-code right? 
So first we know we need to have two function-scope variables to hold the different content: feedA and feedB.
We then place the two loadFeed functions inside the beforeEach function since they're async.
At the callback we can assign the feed's content to the relevant variable.
At the end of the second loadFeed function we can run the `done()` function and return to the test, where we compare the two variables.

```sh
/* Test suite that checks the feed functionality*/
describe('New Feed Selection', () => {

    /* Test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.*/
    let feedA,
        feedB;

    beforeEach((done) => {
        loadFeed(0, () => {
            feedA = document.querySelector('.feed').innerHTML;
        });

        loadFeed(1, () => {
            feedB = document.querySelector('.feed').innerHTML;
            done();
        });
    });

    /* Check if feeds have been added to the feedList*/
    it('loads new feeds', (done) => {
        expect(feedB !== feedA).toBe(true);
        done();
    });
});
```
Coolio! You made it! Pour yourself a hot cup of tea with some lemon and honey, kick back and try to figure out what does that cloud look like 😎💭☁️