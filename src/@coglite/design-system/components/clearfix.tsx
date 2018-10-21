import * as React from "react";


// mterial-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";

const style = createStyles({
  clearfix: {
    "&:after,&:before": {
      display: "table",
      content: '" "'
    },
    "&:after": {
      clear: "both"
    }
  }
});

function ClearfixTemplate({ ...props }) {
  const { classes } = props;
  return <div className={classes.clearfix} />;
}


export let ClearFix = withStyles(style)(ClearfixTemplate);
export default ClearFix