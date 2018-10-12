# Presentaional Components

Directly leveraging React Native primitives in your new screen's implementation means starting from scratch.  Instead, one can leverage functional UI abstractions which will handle the common behavior that spans across all use of a primitive (a new "atom"), or create compositions of primitives (a "molecule").

### Mission

To practice, create a horizontal card list that will display data horizontally, with each item being displayed in a card.

### Complexities to consider

- Snap to interval on the card
- Loading more items when you reach the end
- Custom animation between cards

To get started, open `CardList.js`