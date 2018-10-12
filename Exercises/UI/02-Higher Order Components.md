# Higher Order Components Exercise

The business has decided that search is a core functionality of your 
application and wish to add the capability to several list screens throughout the app.

## Mission
Build a higher order component that will take a FlatList and enhance it with
search/filter capabilities.

### Complexities to consider:
- Should the active search be stored in redux?  Why or why not?
- Should the HOC render the search box too?  Why or why not?
- TextInput placeholder text should be different for each usecase
- Search could be server- or client-driven

To begin, open `searchable.js`