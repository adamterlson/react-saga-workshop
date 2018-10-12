/* @flow */

/* import ... */

type OwnProps = { /* ... */ }
type ConnectProps = { /* ... */ }

const connector: Connector<OwnProps, ConnectProps> = connect(mapConversations, { ... })

const hoc = compose(
    connector,
    data({
        onMount: apiActions.reqConversations,
    }),
    pagination('conversations', {
        limit: 10,
        onLoadNextPage: apiActions.reqConversations,
    }),
)

const renderItem = (item: { id: string }) => (
    <Container padding>
        <ConversationItem id={item.id} />
    </Container>
)

const ConversationList = (props: ConnectProps & PaginationProps) => (
    <FlexView>
        <SwipeableList
            data={props.conversations}
            onSwipe={props.onSwipe}
            renderItem={renderItem}
            onEndReached={props.onLoadNextPage}
            onEndReachedThreshold={10}
        />
        <FloatingButton onPress={props.onCreateMessagePress} />
    </FlexView>
)

export default hoc(ConversationList)
