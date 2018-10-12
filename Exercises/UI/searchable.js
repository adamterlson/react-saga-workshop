import * as React from 'react'

const noopHOC = WrappedComponent => props => <WrappedComponent {...props} />

export default noopHOC
