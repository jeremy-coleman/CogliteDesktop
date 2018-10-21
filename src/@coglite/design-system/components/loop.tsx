//https://github.com/donavon/lloop/blob/master/src/index.jsx

import * as React from 'react';


//const [reactMajorVersion] = React.version.split('.');
//const canReturnArray = parseInt(reactMajorVersion, 10) >= 16;
// as: canReturnArray ? undefined : 'div',
const isObject = data => typeof data === 'object';


interface LoopProps {
    items: any,
    children: React.ReactNode | React.ReactNodeArray | Function,
    primaryKey?: string,
    itemKey?: string,
    indexKey?: string,
    destructure?: boolean,
    as?: () => React.ReactElement<any> | string | any
}

class Loop extends React.Component<LoopProps, any> {
  static defaultProps = {
    primaryKey: null,
    as: 'div',
    itemKey: 'item',
    indexKey: 'index',
    destructure: true,
  };

constructor(props){
    super(props)
     this.mapItem = this.mapItem.bind(this);
}
 
  mapItem(item, idx) {
    const { primaryKey, indexKey, destructure, itemKey, children } = this.props;
    const child = React.Children.only(children);
    const { type: Item, props: itemProps } = child;
    const mappedProps = destructure && isObject(item)
      ? {
        key: primaryKey ? item[primaryKey] : idx,
        ...item,
      }
      : {
        key: primaryKey ? item[primaryKey] : item,
        [itemKey]: item,
      };
    mappedProps[indexKey] = idx;

    return <Item {...mappedProps} {...itemProps} />;
  }
  
  render() {
    // don't pass along: primaryKey, indexKey, destructure, itemKey
    const { items, as: Items, primaryKey, indexKey, destructure, itemKey, ...others } = this.props;
    const results = items.map(this.mapItem);

    return (
      Items
        ? <Items {...others}>{results}</Items>
        : results
    );
  }
}

// if (process.env.NODE_ENV !== 'production') {
//   Loop.propTypes = {
//     items: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.string])).isRequired,
//     primaryKey: PropTypes.string,
//     itemKey: PropTypes.string,
//     indexKey: PropTypes.string,
//     destructure: PropTypes.bool,
//     children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
//     as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
//   };
// }



export {Loop}
export default Loop;

export const ItemLoop = props => <Loop destructure={false} {...props} />;
export const SimpleLoop = props => <Loop as="ul" destructure={false} itemKey="children" {...props} />;



// items	An array of items to render (required)
// primaryKey	Name of the unique key for the array. If there is no unique key, set to null and the index of the item will be passed to React as the key. So while it is not required, it is recommended that you pass a primaryKey.
// as	The type of tag to use as the wrapped component. Defaults to as="div" if running React versions below 16. If running React 16 or greater, no wrapped component will be used. This may also be the name of a component. Example as={MyList}.
// itemKey	The prop to use if destructure is true. Defaults to item.
// indexKey	The prop to pass the loop index. Defaults to index.
// destructure	If set to true, each item will be destructured and passed as an individual prop (i.e. {...item}). If false, the item is passed as the prop defined by itemKey (i.e. item={item}). Defaults to true.