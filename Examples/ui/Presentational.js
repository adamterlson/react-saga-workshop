/* import ... */

const styles = StyleSheet.create({
    textBubble: {
        borderColor: colors.neutral,
        borderRadius: borderRadius.small,
        padding: grid,
    },
    /* ... */
})

type PropTypes = {
    message: TMessage,
    sent: boolean,
    sender: TMember,
}

const MessageBubble = ({ message, sent, sender }: PropTypes) => (
    <View>
        <View style={styles.avatar}>
            <MemberPhoto member={sender} large />
        </View>
        <View style={styles.info}>
            <Text style={styles.name}>{`${sender.firstName} ${sender.lastName}`}</Text>
            {!sent && <Text>{labels.Pending}</Text>}
        </View>
        <View style={styles.textBubble}>
            <Text>{message.text}</Text>
            <Text>{message.createdOn}</Text>
        </View>
    </View>
)

export default MessageBubble
