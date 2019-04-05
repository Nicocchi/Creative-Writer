import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Paper } from '@material-ui/core';

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

const Quill = ReactQuill.Quill;
let Font = Quill.import("formats/font");
Font.whitelist = ["Ubuntu", "Raleway", "Roboto"];
Quill.register(Font, true);

const styles = theme => ({
    paper: {
        maxWidth: 936,
        margin: 'auto',
        overflow: 'hidden',
    },
    searchBar: {
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    searchInput: {
        fontSize: theme.typography.fontSize,
    },
    block: {
        display: 'block',
    },
    addUser: {
        marginRight: theme.spacing.unit,
    },
    contentWrapper: {
        margin: '40px 16px',
    },
});

function Content(props) {
    const { classes } = props;

    return (
        <Paper className={classes.paper} >
            <ReactQuill
                defaultValue={props.chapter[0].content}
                value={props.chapter[0].content}
                onChange={props.handleChange}
                theme="snow"
                modules={Content.modules}
                formats={Content.formats}
            />
        </Paper>
    );
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Content.modules = {
    toolbar: [
        [{ header: [] }],
        [{ size: [] }],
        [{ align: ["", "center", "right", "justify"] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" }
        ],
        ["link", "image", "video"],
        ["clean"]
    ]
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Content.formats = [
    "header",
    "font",
    "size",
    "align",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video"
];

Content.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);
