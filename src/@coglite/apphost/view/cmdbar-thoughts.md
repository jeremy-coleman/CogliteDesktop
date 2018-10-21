

import * as React from 'react'


//items vs far items is dumb, just add it as a prop to the button?
//maybe just have a stateful 'order preference prop'? user could change layout that way too, and also makes sense for any possible layout scenario
// also takes care of stupid overflow items, like no shit why would you need to assign overflow items..just set a max length or something and everything else goes to a vert icon

// item just needs to be of type button / icon / menu
// maybe have like an <OrderBy =someOptions /> component

//I can probably just use Material Table somehow.

// export interface CommandBarProps extends React.HTMLAttributes<HTMLDivElement> {
//     items: HTMLButtonElement[];
//     farItems?: HTMLButtonElement[];
// }

// function CommandBarMenu(props){
//     return (<div {...props}></div>)
// }
// function CommandBarButton(props){
//     return (<div {...props}></div>)
// }
// function CommandBarMenuButton(props){
//     return (<div {...props}></div>)
// }

// function CommandBar(props){
//     return (<div {...props}></div>)
// }