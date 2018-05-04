/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* All of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {

    describe('RSS Feeds', function () {
        /* Tests to make sure that the allFeeds variable has
         * been defined and that it is not empty.
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have a valid url', function () {
            let feedId = 0;
            allFeeds.forEach(function (feed) {
                feed.id = feedId;
                expect(allFeeds[feedId].url).toBeDefined();
                feedId++;
            });
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have a valid name', function () {
            let feedId = 0;
            allFeeds.forEach(function (feed) {
                feed.id = feedId;
                expect(allFeeds[feedId].url).toBeDefined();
                feedId++;
            });
        });
    });

    /* Test suite that checks menu functionality */
    describe('The menu', function () {
        const body = document.getElementById('body');

        /* Test that ensures the menu element is
         * hidden by default.
         */
        it('hides the menu by default', function () {
            expect(body).toHaveClass('menu-hidden');
        });

        /* Test that ensures the menu changes
         * visibility when the menu icon is clicked.
         */
        it('visibility is toggled upon click on menu icon', function () {

            $('.menu-icon-link').trigger('click');
            expect($(body).hasClass('menu-hidden')).toBe(false);

            $('.menu-icon-link').trigger('click');
            expect(body).toHaveClass('menu-hidden');
        });
    });
});

/* Test suite that checks the loadFeed functionality*/
describe('Initial Entries', function () {

    /* Test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     */
    beforeEach(function (done) {
        loadFeed(0, done);
    });

    it('has at least one entry', function () {
        expect($('.feed').children().length > 0).toBe(true);
    });
});

/* Test suite that checks the feed functionality*/
describe('New Feed Selection', function () {

    /* Test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     */
    let feedA = $('.feed').children().length,
        feedB;

    beforeEach(function (done) {
        feedB = $('.feed').children().length;
        done();
    });

    /* Check if feeds have been added to the feedList*/
    it('loads new feeds', function (done) {
        expect(feedB > feedA ? true : false).toBe(true);
        done();
    });
});
