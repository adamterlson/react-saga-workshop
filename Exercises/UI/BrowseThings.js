import * as React from 'react'
import searchable from './searchable'
import CardList from './CardList'

// Pick some data to browse from https://github.com/jdorfman/awesome-json-datasets
const dataset = []

const BrowseThingsUI = () => <CardList data={dataset} />

export default searchable(BrowseThingsUI)
