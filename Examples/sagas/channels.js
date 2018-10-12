export const makeLinkChannel = () =>
    eventChannel(emitter => {
        Linking.addEventListener('url', ({ url }) => emitter(url))
        Linking.getInitialURL().then(url => {
            if (url) {
                emitter(url)
            }
        })

        return () => {
            Linking.removeEventListener('url', emitter)
        }
    })
