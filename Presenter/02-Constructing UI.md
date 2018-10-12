# Constructing UI

"What tool will I choose to display the UI for my application?"
- My application and React's job are two different things

## Three separate tiers

Standard 3-tier setup:
- Data layer
- Business layer
- UI layer (logicless template)

But it's more like a ring

## Make it easy on designers

Presentational components are a shared space with the visual designer

Get documented in storybook

## Elements of reusable component design

I was asked the question: "How to make it reusable?"

### Naming

- Name according to its function, not how it's used
- Describe what's internal to the function
- Don't call it "MemberProfile"

### Props

- Don't take in more than are minimally required
- Keep them flat

### Single responsibility

- Only do one thing well

### Composition

- Question: How much do you use "children"?
- Use `children` judiciously, it's the mechanism by which your component can be made to do one thing

### Think of components as functions

- Standard rules of good function design apply (pure, rather short, etc)

## Types of components in my functional world 

### "Presentational"

```javascript
const Presentational = (props) => <View><Text /></View>
```

Functional

Can choose to use React.PureComponent as an optimization, but resist using lifecycle methods

Exporting variants from a single file can "catalog display usages" when you want the same pre-configured look elsewhere:

```javascript
export const Button ({ onPress, title, awesome }) => <RNButton onPress={onPress} /* ... */ />
export const ButtonReact = (props) => <Button awesome />
export const ButtonAngular = (props) => <Button awesome={false} />
```
or

```javascript
const Button = ({ onPress, title, awesome }) => <RNButton onPress={onPress} /* ... */ />
Button.React = (props) => <Button awesome />
Button.Angular = (props) => <Button awesome={false} />
export default Button
```

### Higher Order Components

Do you use more render props or higher order components?

Render props useful with local react state, HOC with redux

No presentation code, simply expose props to the component

Wrap the outside of your "layout block"

### "Layouts"

Layouts are not screens.  They might be the target of an screen, but may also be the target of a lightbox, popup card, or dialog.

They are the glue between the lego blocks.
They make the glued block a source of side effects

```javascript
const Layout = data({
    onLoad: () => ({ type: 'REQUEST' })
})(Presentational)
```

But maybe the UI needs for this particular list view become more complex

Add more HOCs, add more UI

```javascript
const Layout = compose(
    data({
        onLoad: () => ({ type: 'REQUEST' })
    })
    pagination({
        onLoad: () => ({ type: 'REQUEST' }),
    }),
    pullToRefresh({
        onPull: () => ({ type: 'REQUEST' })
    }),
    searchable,
)(() => <Presentational><Presentational / ><Presentational>)
```

When you want to use <View> or <Text> that's moment to pause

Whenever you're tempted to add styles here, that's obvious code smell (reuse impact)

But *some* primitives and styles are okay, just be ready to refactor, especially as patterns emerge.

## Exercise 01-Presentational Components
## Exercise 02-Higher Order Components
## Exercise 03-Layouts
