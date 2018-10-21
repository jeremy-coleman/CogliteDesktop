
//https://github.com/donavon/styled-shortcuts
// With Styled Shortcuts you can now do this:
// font-size: ${'fontSize:px'};
// instead of this:
// font-size: ${({ fontSize }) => `${fontSize}px`};
// Use any unit (e.g. px, %, cm, you name it) or no unit at all.

const appendUnit = (value, unit) => (
  value ? `${value}${unit}` : '0'
);

const getPropValue = (props, keys) => (
  keys.split('.').reduce((obj, key) => obj[key], props)
);

const mapStringTemplateToGetter = (value) => {
  if (typeof value === 'string') {
    const [key, unit] = value.split(':');
    return unit
      ? props => appendUnit(getPropValue(props, key), unit)
      : props => getPropValue(props, key);
  }
  return value;
};

const withStyledShortcuts = styled => (
  (strings, ...values) => {
    const newValues = values.map(mapStringTemplateToGetter);
    return styled(strings, ...newValues);
  }
);

const withStyledShortcutsFunction = styled => (...args) => (
  withStyledShortcuts(styled(...args))
);

const wrapStyled = (styled) => {
  const styledShortcuts = withStyledShortcutsFunction(styled); // styled(Component)

  Object.keys(styled).forEach((key) => {
    if (typeof styled[key] === 'function' && styled[key].attrs) { // styled.div
      styledShortcuts[key] = withStyledShortcuts(styled[key]);
      styledShortcuts[key].attrs = withStyledShortcutsFunction(styled[key].attrs);
    } else {
      styledShortcuts[key] = styled[key];
    }
  });

  return styledShortcuts;
};

export default wrapStyled;


// import styled from 'styled-shortcut-components';

// const Button = styled.button`
//   padding: ${'padding:em'};
//   border-radius: ${'borderRadius:px'};
//   width: ${'width:%'};
//   color: ${'color'};
// `;

// Button.defaultProps = {
//   padding: 1,
//   borderRadius: 4,
//   width: 100,
//   color: 'red',
// };
// Using with Themes
// You can specify a props key that contains a dotted object notation.

// For example:

// const Button = styled.button`
//   padding: 0.25em 1em;
//   border-radius: ${'theme.button.borderRadius:px'};
//   color: ${'theme.color'};
//   border: 2px solid ${'theme.color'};
// `;