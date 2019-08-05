import React, {Fragment} from "react";
import PropTypes from "prop-types";
import ArrowBack from "@material-ui/icons/ArrowBackIos";
import TextFormat from '@material-ui/icons/TextFields';
import ViewHeadline from '@material-ui/icons/ViewHeadline';
import { withStyles, AppBar, Grid, IconButton, Toolbar, Tooltip, Typography, Menu, MenuItem, Fade, Grow, Paper, Popper, ClickAwayListener } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';

const lightColor = "rgba(255, 255, 255, 0.7)";

// Generate arrow design
function arrowGenerator(color) {
  return {
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: "-0.95em",
      width: "3em",
      height: "1em",
      "&::before": {
        borderWidth: "0 1em 1em 1em",
        borderColor: `transparent transparent ${color} transparent`
      }
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: "-0.95em",
      width: "3em",
      height: "1em",
      "&::before": {
        borderWidth: "1em 1em 0 1em",
        borderColor: `${color} transparent transparent transparent`
      }
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: "-0.95em",
      height: "3em",
      width: "1em",
      "&::before": {
        borderWidth: "1em 1em 1em 0",
        borderColor: `transparent ${color} transparent transparent`
      }
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: "-0.95em",
      height: "3em",
      width: "1em",
      "&::before": {
        borderWidth: "1em 0 1em 1em",
        borderColor: `transparent transparent transparent ${color}`
      }
    }
  };
}

const styles = theme => ({
  secondaryBar: {
    zIndex: 0,
    backgroundColor: theme.palette.primary.paper,
    "& *": { color: "rgba(255, 255, 255, 0.7)" }
  },
  menuButton: {
    marginLeft: -theme.spacing.unit
  },
  iconButtonAvatar: {
    padding: 4
  },
  link: {
    textDecoration: "none",
    color: lightColor,
    "&:hover": {
      color: theme.palette.common.white
    }
  },
  button: {
    borderColor: lightColor
  },
  primaryDark: {
    backgroundColor: theme.palette.primary.dark
  },
  primaryLight: {
    backgroundColor: theme.palette.primary.light
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
    zIndex: 9999
  },
  lightTooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11
  },
  // arrowPopper: arrowGenerator(theme.palette.grey[700]),
  arrow: {
    position: "absolute",
    fontSize: 16,
    width: "3em",
    height: "3em",
    "&::before": {
      content: '""',
      margin: "auto",
      display: "block",
      width: 0,
      height: 0,
      borderStyle: "solid"
    }
  },
  htmlPopper: arrowGenerator(theme.palette.primary.paper),
  htmlTooltip: {
    // backgroundColor: '#f5f5f9',
    backgroundColor: theme.palette.primary.paper,
    color: "rgba(255, 255, 255, 0.87)",
      marginTop: "23px",
    maxWidth: 720,
      width: 200,
      paddingLeft: "10%",
    fontSize: theme.typography.pxToRem(12),
    // border: "1px solid #dadde9",
    "& b": {
      fontWeight: theme.typography.fontWeightMedium
    }
  }
});

function Header(props) {
  const { classes } = props;
  // console.log("props => ", props);

  return (
    <React.Fragment>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={8}>
            <Grid item xs>
              <Typography color="inherit" variant="h5">
                {props.name ? props.name : "Creative Writer"}
              </Typography>
            </Grid>
            {props.project !== null && props.route.location.pathname === "/" ? (
              <Grid item>
                <Tooltip title="Back to writing">
                  <IconButton
                    color="inherit"
                    onClick={() => props.route.history.push("/editor")}
                  >
                    <ArrowBack />
                  </IconButton>
                </Tooltip>
              </Grid>
            ) : null}

            {/*<Grid item>*/}
            {/*  <Tooltip title="Help">*/}
            {/*    <IconButton color="inherit">*/}
            {/*      <HelpIcon />*/}
            {/*    </IconButton>*/}
            {/*  </Tooltip>*/}
            {/*</Grid>*/}
              {props.route.location.pathname !== "/" ?
              <Fragment>
                  <Grid item>
                      <ClickAwayListener onClickAway={props.handleTooltipClose}>
                          <div>
                              <Tooltip
                                  classes={{
                                      popper: classes.htmlPopper,
                                      tooltip: classes.htmlTooltip
                                  }}
                                  PopperProps={{
                                      popperOptions: {
                                          modifiers: {
                                              arrow: {
                                                  enabled: Boolean(true),
                                                  element: props.arrowRef
                                              }
                                          }
                                      }
                                  }}
                                  disableFocusListener
                                  disableHoverListener
                                  disableTouchListener
                                  onClose={props.handleTooltipClose}
                                  open={props.toolTip1}
                                  title={
                                      <React.Fragment>
                                          <div style={{display: "flex"}}>
                                              <div style={{display: "flex", flexDirection: "column", textAlign: "right", marginRight: "10px"}}>
                                                  <br />
                                                  <Typography style={{ color: "white" }}>Characters</Typography>
                                                  <Typography style={{ color: "white" }}>Without Spaces</Typography>
                                                  <br />
                                                  <Typography style={{ color: "white" }}>Words</Typography>
                                                  <Typography style={{ color: "white" }}>Sentences</Typography>
                                                  <Typography style={{ color: "white" }}>Paragraphs</Typography>
                                                  {/*<Typography style={{ color: "white" }}>Lines</Typography>*/}
                                                  {/*<Typography style={{ color: "white" }}>Pages</Typography>*/}
                                                  <br />
                                                  {/*<Typography style={{ color: "white" }}>Slow</Typography>*/}
                                                  {/*<Typography style={{ color: "white" }}>Average</Typography>*/}
                                                  {/*<Typography style={{ color: "white" }}>Fast</Typography>*/}
                                              </div>
                                              <div style={{display: "flex", flexDirection: "column", textAlign: "left"}}>
                                                  <br />
                                                  <Typography style={{ color: "white" }}>{props.characterCount}</Typography>
                                                  <Typography style={{ color: "white" }}>{props.charNoSpaces}</Typography>
                                                  <br />
                                                  <Typography style={{ color: "white" }}>{props.wordCount}</Typography>
                                                  <Typography style={{ color: "white" }}>{props.sentenceCount}</Typography>
                                                  <Typography style={{ color: "white" }}>{props.paragraphCount}</Typography>
                                                  {/*<Typography style={{ color: "white" }}>{props.lineCount}</Typography>*/}
                                                  {/*<Typography style={{ color: "white" }}>0.3</Typography>*/}
                                                  {/*<br />*/}
                                                  {/*<Typography style={{ color: "white" }}>10 sec</Typography>*/}
                                                  {/*<Typography style={{ color: "white" }}>8 sec</Typography>*/}
                                                  {/*<Typography style={{ color: "white" }}>6 sec</Typography>*/}
                                              </div>

                                          </div>
                                          <span
                                              className={classes.arrow}
                                              ref={props.handleArrowRef}
                                          />
                                      </React.Fragment>
                                  }
                              >
                                  {/*<Tooltip title="Stats">*/}
                                  <IconButton color="inherit" onClick={props.handleTooltipOpen}>
                                      <TextFormat />
                                  </IconButton>
                                  {/*</Tooltip>*/}
                              </Tooltip>
                          </div>
                      </ClickAwayListener>
                  </Grid>

                  <Grid item>
                      <IconButton
                          color="inherit"
                          className={classes.iconButtonAvatar}
                          onClick={e => props.handleOpen(e)}
                      >
                          <ViewHeadline/>
                      </IconButton>
                      <Popper
                          open={props.open !== undefined ? props.open : false}
                          anchorEl={props.anchorEl}
                          transition
                          disablePortal
                      >
                          {({ TransitionProps, placement }) => (
                              <Grow
                                  {...TransitionProps}
                                  id="menu-list-grow"
                                  style={{
                                      transformOrigin:
                                          placement === "bottom" ? "center top" : "center bottom"
                                  }}
                              >
                                  <Paper
                                      style={{
                                          backgroundColor: "rgba(255,255,255,1)",
                                          marginRight: "50px",
                                          zIndex: "9000"
                                      }}
                                  >
                                      <ClickAwayListener onClickAway={props.handleClose}>
                                          <Menu
                                              id="fade-menu"
                                              anchorEl={props.anchorEl}
                                              open={props.open}
                                              onClose={props.handleClose}
                                              TransitionComponent={Fade}
                                              style={{ marginTop: "40px" }}
                                          >
                                              <MenuItem onClick={props.saveProject}>
                                                <ListItemIcon>
                                                  <SendIcon />
                                                  </ListItemIcon>
                                                <ListItemText primary="Save" />
                                              </MenuItem>
                                              <MenuItem onClick={props.saveProjectAs}>
                                                <ListItemIcon>
                                                  <SendIcon />
                                                  </ListItemIcon>
                                                <ListItemText primary="Save As" />
                                              </MenuItem>
                                              <MenuItem >
                                                <ListItemIcon>
                                                  <SendIcon />
                                                  </ListItemIcon>
                                                <ListItemText primary="Export" />
                                              </MenuItem>
                                          </Menu>
                                      </ClickAwayListener>
                                  </Paper>
                              </Grow>
                          )}
                      </Popper>
                  </Grid>
              </Fragment>
                  : null
              }


          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
