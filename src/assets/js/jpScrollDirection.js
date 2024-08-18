let jp_lastScrollTop = 0;
export let jp_scrollDirection;

/**
 * Compares the distance scrolled on the page to determine when the user is scrolling down or up.
 * 
 * @return string|null Either 'down' or 'up', however the value is null before any scrolling has occurred .
 */
function jp_updateScrollDirection() {
	try {

		// Try a couple older sources of the "distance scrolled from top" value, this adds some older browsers for compatibility.
		let scrollTop = window.pageYOffset || window.scrollY || document.documentElement.scrollTop;

		if (scrollTop > jp_lastScrollTop){
			jp_scrollDirection = 'down';
		} else {
			jp_scrollDirection = 'up';
		}

		jp_lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Set the last scrollTop value, and make sure the scrolling doesn't go negative.

	}
	catch(error){
		console.log('Error with scroll direction detection:', error);
	}

	return jp_scrollDirection;
};

// Update the scroll direction on the `scroll` event.
window.addEventListener('scroll', jp_updateScrollDirection, { passive: true });
