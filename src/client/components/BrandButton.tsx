import Button from '@material-ui/core/Button';
import * as React from 'react';
import { stylesheet } from 'typestyle';

import {observer} from 'mobx-react'



const brandStyles = stylesheet({
    root: {},
    logo: {
        zIndex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    title: {
        color: 'orange',
        zIndex: 2,
        fontSize: '14px'
        }
})


export let BrandButton = observer((props) => {
    return(
            <Button onClick={props.onClick}>
                <span className={brandStyles.title}>Coglite</span>
            </Button>
    )
})
