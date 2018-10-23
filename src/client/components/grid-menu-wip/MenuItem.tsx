
import * as React from 'react'

import MenuList from '@material-ui/core/MenuList';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';




const links: [any, any][] = []


export let IconBar = (props: any) => {
 const items = props.items
 const Icon = props.Icon
 
 return ( 
 <MenuList>
    {links.map(([items, Icon]) =>
      <li key={items.key}>
      <MenuItem>
            
       <Icon />
       <ListItemText primary={props.text}/>
      </MenuItem>
      </li>
    )}
  </MenuList>
)}
