import * as React from 'react'
import { connect } from 'react-redux'

import TaskFocusList from 'app/ui/layouts/TimeSheet/TaskFocusList'
import StartTrackingButton from 'app/ui/layouts/TimeSheet/StartTrackingButton'
import EntryEditForm from 'app/ui/layouts/TimeSheet/EntryEditForm'

import List from 'app/ui/presentational/List'
import SwipeablePanel from 'app/ui/presentational/SwipeablePanel'
import ExpandingContainer from 'app/ui/presentational/ExpandingContainer'
import FAButton from 'app/ui/presentational/FAButton'
import EntryBubble from 'app/ui/presentational/EntryBubble'

type OwnProps = {}

class Layout extends React.PureComponent<OwnProps> {
    render() {
        return (
            <FlexView>
                <StartTrackingButton />
                <SwipeablePanel>
                    <TaskFocusList
                        renderItemExpanded={({ item }) => <EntryEditForm entry={item} />}
                        renderItemCollapsed={({ item }) => (
                            <React.Fragment>
                                <Text>{item.title}</Text>
                                <Text>{item.duration}</Text>
                            </React.Fragment>
                        )}
                    />
                </SwipeablePanel>
                <FAButton onPress={onAddPress} title="Add" />
            </FlexView>
        )
    }
}

export default compose(
    hoc1,
    hoc2(),
)(Layout)
