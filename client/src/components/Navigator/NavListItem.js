import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import NavListItemCollapse from "./NavListItemCollapse";

const styles = theme => ({
  categoryHeader: {
    paddingTop: 16,
    paddingBottom: 16
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white
  },
  item: {
    paddingTop: 4,
    paddingBottom: 4,
    color: "rgba(255, 255, 255, 0.7)"
  },
  itemCategory: {
    backgroundColor: "#232f3e",
    boxShadow: "0 -1px 0 #404854 inset",
    paddingTop: 16,
    paddingBottom: 16
  },
  firebase: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.common.white
  },
  itemActionable: {
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.08)"
    }
  },
  itemActiveItem: {
    color: "#4fc3f7"
  },
  itemPrimary: {
    color: "inherit",
    fontSize: theme.typography.fontSize,
    "&$textDense": {
      fontSize: theme.typography.fontSize
    }
  },
  textDense: {},
  divider: {
    marginTop: theme.spacing.unit * 2
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%"
  },
  dense: {
    marginTop: 19
  }
});

class navListItem extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <ListItem
          button
          dense
          className={classNames(
            classes.item,
            classes.itemActionable,
            true && classes.itemActiveItem
          )}
          onClick={() => this.props.openCollapse(this.props.open)}
        >
          <ListItemIcon>{this.props.icon}</ListItemIcon>
          <ListItemText
            classes={{
              primary: classes.itemPrimary,
              textDense: classes.textDense
            }}
          >
            {this.props.title}
          </ListItemText>

          {this.props.isOpen ? <ExpandLess dense /> : <ExpandMore dense />}
        </ListItem>
        <Collapse in={this.props.isOpen} timeout="auto" unmountOnExit>
          <List disablePadding>
            {this.props.project !== null ? (
              this.props.type === "single" ? (
                <NavListItemCollapse
                  type="single"
                  array={this.props.array}
                  title={this.props.title}
                  handleChange={this.props.handleChange}
                  current={this.props.current}
                  focus={this.props.focus}
                  unfocused={this.props.unfocused}
                />
              ) : (
                <NavListItemCollapse
                  type="double"
                  title={this.props.title}
                  title2={this.props.title2}
                  array={this.props.array}
                  isOpen={this.props.isOpen}
                  openNestedCollapse={this.props.openNestedCollapse}
                  handleChange={this.props.handleChange}
                  current={this.props.current}
                  currentInfo={this.props.currentInfo}
                  handleAdd={this.props.handleAdd}
                  handleAddInfo={this.props.handleAddInfo}
                  openArray={this.props.openArray}
                  focus={this.props.focus}
                  unfocused={this.props.unfocused}
                />
              )
            ) : null}
            <List disablePadding>
              <ListItem
                button
                dense
                className={classNames(
                  classes.item,
                  classes.itemActionable,
                  true && classes.itemActiveItem
                )}
                onClick={this.props.handleAdd}
                style={{ paddingLeft: "45%" }}
              >
                <ListItemIcon>{this.props.addIcon}</ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.itemPrimary,
                    textDense: classes.textDense
                  }}
                />
              </ListItem>
            </List>
          </List>
        </Collapse>
      </Fragment>
    );
  }
}

export default withStyles(styles)(navListItem);
