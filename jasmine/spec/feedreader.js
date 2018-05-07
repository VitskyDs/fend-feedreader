/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* All of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(() => {

    describe('RSS Feeds', () => {
        /* Tests to make sure that the allFeeds variable has
         * been defined and that it is not empty.
         */
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have a valid url', () => {
            allFeeds.forEach((feed) => {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeGreaterThan(0);
            });
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have a valid name', () => {
            allFeeds.forEach((feed) => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).toBeGreaterThan(0);
            });
        });
    });

    /* Test suite that checks menu functionality */
    describe('The menu', () => {
        /* Test that ensures the menu element is
         * hidden by default.
         */
        it('hides the menu by default', () => {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* Test that ensures the menu changes
         * visibility when the menu icon is clicked.
         */
        it('visibility is toggled upon click on menu icon', () => {

            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);

            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });
});

/* Test suite that checks the loadFeed functionality*/
describe('Initial Entries', () => {

    /* Test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     */
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

/* Test suite that checks the feed functionality*/
describe('New Feed Selection', () => {

    /* Test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     */
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
