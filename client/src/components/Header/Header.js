import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ArrowBack from '@material-ui/icons/ArrowBackIos';

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = theme => ({
    secondaryBar: {
        zIndex: 0,
        backgroundColor: theme.palette.primary.paper,
        '& *': { color: 'rgba(255, 255, 255, 0.7)' },
    },
    menuButton: {
        marginLeft: -theme.spacing.unit,
    },
    iconButtonAvatar: {
        padding: 4,
    },
    link: {
        textDecoration: 'none',
        color: lightColor,
        '&:hover': {
            color: theme.palette.common.white,
        },
    },
    button: {
        borderColor: lightColor,
    },
    primaryDark: {
        backgroundColor: theme.palette.primary.dark
    },
    primaryLight: {
        backgroundColor: theme.palette.primary.light
    }
});

function Header(props) {
    const { classes } = props;

    return (
        <React.Fragment>
            {/*<AppBar className="primaryDark"  position="sticky" elevation={0}>*/}
                {/*<Toolbar>*/}
                    {/*<Grid container spacing={8} alignItems="center">*/}
                        {/*<Hidden smUp>*/}
                            {/*<Grid item>*/}
                                {/*<IconButton*/}
                                    {/*color="inherit"*/}
                                    {/*aria-label="Open drawer"*/}
                                    {/*onClick={onDrawerToggle}*/}
                                    {/*className={classes.menuButton}*/}
                                {/*>*/}
                                    {/*<MenuIcon />*/}
                                {/*</IconButton>*/}
                            {/*</Grid>*/}
                        {/*</Hidden>*/}
                        {/*<Grid item xs />*/}
                        {/*<Grid item>*/}
                            {/*<Typography className={classes.link} component="a" href="#">*/}
                                {/*Go to docs*/}
                            {/*</Typography>*/}
                        {/*</Grid>*/}
                        {/*<Grid item>*/}
                            {/*<Tooltip title="Alerts • No alters">*/}
                                {/*<IconButton color="inherit">*/}
                                    {/*<NotificationsIcon />*/}
                                {/*</IconButton>*/}
                            {/*</Tooltip>*/}
                        {/*</Grid>*/}
                        {/*<Grid item>*/}
                            {/*<IconButton color="inherit" className={classes.iconButtonAvatar}>*/}
                                {/*<Avatar className={classes.avatar} src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhITEhIVFRUXGBcXFRgWFRUVFhYXFxUYFhgVGBUYHSggGBolHRYYITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGi0lHyUtLS0tLS0tLy0tLS0vLS0tLS0tLS4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOwA1QMBIgACEQEDEQH/xAAcAAAABwEBAAAAAAAAAAAAAAAAAgMEBQYHCAH/xABOEAACAQIDAwgFCQUFBgUFAAABAgMAEQQSIQUxQQYHEyJRYXGBMpGhscEUI0JScpKi0fBic4KzwjNjo7LhCCQ0U9LxFUNUw/IlRGSDk//EABoBAAIDAQEAAAAAAAAAAAAAAAABAgMEBQb/xAAsEQACAgEDAwQBAgcAAAAAAAAAAQIRAwQhMRIyQQUTIlGhYZEUM0JxgcHw/9oADAMBAAIRAxEAPwDcaFChQAKFCmW09rQYZc08qRjhmNie5V3se4UAPaFUPG86eEU2jjml/asqL+M5vw0lBzrYcnr4eZR2qY2t4jMDQBoNU/ldypkglEMGXMAGdmBYC97JYEcBc+Iqa2JykwuL/sJlY2uUN1kA7SjWNu/dWZbZn6TE4l+2Vx5IeiHsQVDJKlsdD03TxzZqlwkXLZHLlG6uJXozwdAzIfFRdkPrHfUzFyowbED5Qgv9a6D1sAKymvarWVnVyejYpO4tr8mn7e5X4XCaSSZnIuEjs7kcONlB7WIqi7V50pm0w8KRjte8jeoWCn11Wcds0MCUAVt+mgbx/OoO1WxkpHG1ejnppVLdeGWDFctMdJvxLj7GWP2oAaj5Ns4lt+JnP/7pf+qo3pBw18Pz3V6L9w9pqZjHRxsv/Nf77fnR49pzr6M8y/ZlkX3NTWhTAn8Fy0x0W7Euw7HyyX8S4J9tWXZvOnKthiIEccWjJQ/da4J8xWd0KVAbxsXlng8SQqS5XO5JBka/YPosfsk1YK5mPsqag5WYtYeg6ZmiJFwSc4UfQWS9wp00OlhbQE3Q4q3RtON5S4WIlXmXMDYhbyEHsIQG3nXmz+UuFncJHL1juDK6X7hmABPcKxzC7QjawBseCkW8hwPlTjD4oGxRrEEEcCpBuD4gi9U+40+DuQ9KxThcclv8G5UKxrEc5eOViCINDa3Rt5H0+O/zp1s/nWnDDp4Y3Xj0eZGt2jMzAnu08RVxxJRcZOL5RrdCmGxdrxYuJZYWzKdDwZW4qw4EfrSn9BEFChQoAFChUJyx24MHhZJRbOepEDxkbdpxAsWPcpoAr/L3l18mJw+GsZvpsdVhuLgW+k9iDbcLgm+45Hi8U8rmSV2dzvZjdj3XO4dw0FEkkLEsxLMSSxOpJJuSTxJJry1ABbV7avacxYKRtyHzsPYdaTaXJZjw5MnYmxCGRlZWVirKbqykhlPaCNQasWzZC0asTckXY9pvqfXUSdlS9i/eP5U6jboUA1BH0SbhuJKnhr/241VkafB2vTMOTBNynGlQ5xWPCsFAv2/lT0VWIsSCwY3te50PbT3FbYNuotuAzfkPzqvpOotVFJyk9iSxeKWMXO/gOJqtSrmZmPEk24C+vnXrSMdWNzxP5DgKLer4Q6Tzuv1z1DpdqD0KJehmqyznhr0L0ik1723dtGzUWApevC1EvRVe9KwFCa8onSC9uNe3oAMdaEczIbgk+evkaLehehq+SzHlnjdxY+xkbOBL1SLANlJ4cSCO+mFeEnh5jg3cRxqWwaRSixQKTuK9X3cahfQb1iWsl1RdS835Y55G8o3wOIV7/NNZZl33T6wH1lvceY41v8bhgCCCCLgjUEHUEHsrnHF7KdNV6w7t48Rx8q1nmm2v02EMLG7QNk139GdU8LdZf4KkmnwY82nyYXU1Rd6FChTKAVknPDjy2IhhB0jQuRwzSG2veAn4q1uufuWON6bG4l+HSMo8I/mxbxCX86AIYCl8Hh+kbLe2lyePlSIpI40xupXUj234UNOti3C4LInNbeS04XBInojXtOpPnTgCmuBxyyDTRuKnePzHeKd3rK78ns8PtuC9uq/Q8c2BNVnHys4Y3PEjuI7qssqXBHaLVFY/DrHGQN7ELfu3n2A00Q1CbX6EHENLgkdvjx30EJOpN+zwoSixYdu7z3+40ZltpWhJPc8lmlki3jbdAvQJohaiFqkZxQtTbFTblG8+wUaWWwJ7Ka4TUlzx3UgHsYsAK9zUlmoXpgK5qQwkmjdxNLQRF2VF3sQo8SbU0SMxyyofosw+6xF6Q62sWngdtUBJUEm28Abz317hp8w7+NS3JiW2Jh72K/eUr7yKV5abA+TuJ4h82x6wG5GPD7J4d9R66lTJKFxtEVehmpuZdA3D86UDVMgKXp/sSEMzKSR9IfH4euo29PNky5ZUPacvr/1tUZq0a9Dk6M8W+OC2WpXZzyLMgw7FJZCEXK2TMdSA3AqNTqDuOlJVHbJx+baOEynRZ4lHfmkVWPtt5VnirZ6XX5o4sLbVt7I3fBo6ookfO4AzNYLmPE5RuoUtQrSePCTyZVZuwE+oXrmjOTq286nxOprovb0mXDYhuyKQ+pGNc5mgA1MIOtJfsufyp6TpTPZw9I+A+NMCTw8RZlVdDvB+qBvNWLDSE6N6Q3/mO40w2HDoznjoPAf639QqRlhDdoI3Ebx+uys+R2z1PpmB48Kl5YpUVtFC/XHoroO/tb4eunxgY6M9x2AZb+Jv7rUtkFrcPh2VA3yTmtypMvzi33WN/L/S9KTr1dd+pPibfmPVXmPXJIR2D33ptNibhr/oan8q0x4PI63+fJCZNEzUXNSkygDv0HsufePVUjKMcdJuUcaXQWAFMY2zSX7KfxLc/r9d3nSAGakTJdgBw1PwFGxbhb92niaPycwDYiUIN7HU9g3s3kKG6GlbLnyD2VctOw0HVTx+kfIaeZqqbdXLjcQP229pv8a2/YWylVAoFkUWA7dP0axflfHl2hOO/wDpWqYNuVmjIlGFBdhzWxMN+EkR/wAQflW07d2KskTqRdGBDDs7x+tKwnC3SaNraGxHflb8wa6WQXFPIrIYpNHNeMwbQyywPvUm3eOB8xY+dI4KW4sd4q9c7eyOilinUaN1T5aj2ZvUKpmNweRIZ1HVfMrdzKxHtFj66nGWysjKO7oUIpQMQuYb1II7/wBEe2vYGGXw/wDkP8p9dCVuqQN1yPI2I9xqbIJ07LHgnaUHOdNNBoD48TS2FwQXGYSRR/8AcQBgP3q2Pw9VJbES0Snt19lerjQ+KggG5polc/akUFQeGh31mjd7HqdV7f8ADXk8/vfg3uhQoVoPKkbymH+54v8AcTfy2rnVjXSO10zQTL2xuPWhFc1k0AGNN8Dop8TSt6Sw5sD4mmBO4TaqoirkOgA3ipDDbTjc2DWbsOh/18qq5NRGKmux/W6q3jTOph9VywpNJo0sV6TWeYbbk0YsHJHYdffS0nKac6ZgPBRUPaZ0o+sYa3TJPb7/ADp8BUPO2lu0gUTDzs92YkknUnwosjddR2XPwq6KpUef1GX3cspryLE0liJLKaMTTbGnq0yk8wQ0Jp2J8oPDv/X61prCwVRepPk/sOTGvYXWJT127O4drVFtLdjSbdIjTCXUyHRAcq/tMdbDy1Pl21rPNzyYMUYZltI4BY/VXeF8e3/Sork/sJcZilKL/uuH6sY4OwN2bvF9b8dK1vCYcIth595qqT6tjRGKjuHjjCrYbhWDc40dtpzWHBT60Fb4awrnIT/6lL9iM/gH5VKHJCfBG7cw/Rx7PPFo3b70zEewiuhYd1Yrzj4Po22dH9WEL6ioraod1DCPJWOcfZfT4GbtRekX+DUjzF6zfZuB6fZUotqjMy/aVVYj1EjzrasfEHjdTuKkHwItWd83ODvs+QEbpn9WRAR7PZUHwTXduZZhJbra+79ClwaTxeG6HESxfVZgPAHT2Uer1urM7VMsB2sqQoqm75APs6bz+VIclBfG4S//AKiH+atQse79dtTXJD/jsH+/h/mLUVGjTn1U8zinwuDpGhQoVIyhZFuCO0EVy+RawPDT1V1FXMe1lyzTL2SOPU5HwpoBvegDSeavM1AB3awvUKzVJYp+qfCokmgAxNFJrwGvCaBj/AnQ+Neobu3cAKTwR0NeYY3LHv8AzpCHVNcbuHjTirpzacnocXNIZ1zCMKVW/VJYsOsOI03UNjStkDyS5HzY1gSCsQ3tbf3L+daZieTzRqmDwrZSynObZlijOhfN6WdjcDXXrHhV6w+GVFCooAG4AWFeYXChMxFyWOZid5P5AWAHACqW7L4qlsQ2zYGwkSxphbqot806E6cSJMnjx317JynRDaSHEp9qByPWlxU/am+JjcjqFQeJZS3sDD30hkMOWOFOgaQn6ohmLerLWc8ooPlG1woB6xgBBFiBlVmuDuIF9K07GRYsAlHhY20DRutz4iQ1SuTUBm2viJmUr0Y1Bto2RY7aE/t1KLIyQlzhYfpNo7Oj7St/DpQT7BWlzYkRpmbNb9lHc/dUE1TMdhOm21AbXEMGc9xLOo9rD1Vb9o4no0BAJYkKoAuSTwA8vz0pN7AluM49upJcRRzP4RMg+9LlHtqF5ucKy4Y3UBWkmO8lj84V1FrAdW2hNWLZ6TatMV13Iovl8X+kfAW8d9DYWDMUESEahet9o9Y+0mgdGG84WE6LaD/tZT7Mv9NRAq288SgYyIjeYxfu65A9xqo30q2HaVT7gJ+fvqb5H/8AHYP9/D/MWoOI/rx1+NTnI/8A47B/v4v84psiuTpChQoUCBXM3KUWxeKHZPOP8Vq6ZrmnlgLY3F/v5v5jUvIEUTRc1J5qKrb/ABqVgExz9XzqOvTvHtuplRYBr15Xlq1HkNyGw7YYYvGnqtqiliqhb2BJGpJO4DuqLdDSsznBnQ17guNXnnA2XgoUjbCAKTmDi7g2sCpyvrbfrVEwPGhOwapjy9aXzMDr4n7MXvkrMxWj80MwQ4tidAkZPgDITSlwOPJcOUXLePBShJ4ZVjPoygBlJ4jQ/wCvdTYc5OCaxjnj7xIZIiP8Mg+yqvydQ7ZxEmImGYRtliiOsca2BzkcSb+zwqd5QclcFE0DYpUWNnKkquQZypyh2XUJofO1LpJ9e9EgOcDCf86H/wDunxtScvOFhf8A1GGHeZmc/dVNfXVM5c7B2ZDDnwuUuDchXMgK21JNzl4VUcDgoJcK7lWWUsBGAoKEZgGzHfffu/7Q2NCwyav8bm8bB2quKUyJOJFBtdImjUnsu9yw7wabcjsDb5TMd800jD7CuVX4nzpnye5JHBODB0bqd/SKBKgO/LMouw/ZYeYq24aAIqou5QAPAaUFRG7KwXz2JmO93CD7ES5bfeznzp5tPE9HGzjL1QTdzlVQBcsSATYDsFO7Uw2xsqPExmOUFkO9QzKG7mykEjuoAgYuXEBF+lw1u7FJ7mVT7KZ7S5z8DEuj9I/BY+sL97+iPXVXm2HsiDEzRYpOjyhLXaQIMys5JdW32yix+NVH/wAMV1nyJxgCWG7PKeJ19H3VKkCTpsX5fbQE+PlYEEAogsbjqqL2PHrXqHxDWHkfhSLyZ5WbfmYtfQXuSeFh6qWkXMbd1TWyKXuw2GOnkPy+FTvIs3xuD/fx/wAwVXsIeHZcfH86nOScuXF4Q9mIi/nKPjTEuTpehQoUCBXM3LCS+Nxh/wDyJvZKw+FdM1y3yikzYnEsPpTSkfxSsfjQBHikoXuD4mjudKbYM76ACY46im6nfSuMPWqzc1+xlxe0YI5PQUmRh9YR9YL4FsoPdemwL1tfmqzbNwrwIBi44w0q7umz9dkv9dS1lPEC3Zax8lFzbMw2mqKAQRYq0bFGBB1BBBrQqiMbhwjlgOpJ6XYJNwJ+0LDxUcTVc1aJ45VIyfnKQmAWAshDE316wZRYeI18R21l2BOp8q2DnC2eeglBJulmU/XjLC4PgbfdHbWPYT0rUsXbRPP3WPG3HwrQuaRFd8TGwurxC4PEBrEfirPZfRPgavHNLNbF2+tE3vQ/Cpy4K4cmjbC5ODB4uWWGwhmF3j3ZJFNwyfsm5FuHuk+UGCixmGkiLizC4I1KsCcrgcbMvnY08JomUXvYXOnfpew9p9dV9Zf7V7ox3B7MYZ45YnbUq1o5MrDtU5dxqW2NyZzzQRpBJHBGwdzIrDRTmygsBmLH2XrTlFKKKqUVZtnq5uPTS4qw6jSvaFCrDECvCa9opoAyPlphoV2hiBiB1JVikXjchQpH4DpXkGESPA4nFOCrHM0a2sFvH0UN+Oa0pcD+8B4aavJGDwqjc7qH5CbbukS/hr8bUl3WWym/bUfoxfCelT6Pie2mODGp9VPxWgwibpY3/VxupxgMRkcP9Rlf1Wb4UmamsPsl22c82Q5Y8Sy57jVZoowQRe/VZI9f709hpMklZ0jQplsTFdLh4JfrxRv95AfjQoIhtrY0QQTTNujR3P8ACpb4Vyu7EnXfx8a33nc2iY8CY1vmndY7DU5R12043yhf46yXltye+RPhoyLOcMjy63vK0kubyAAXwWgCrYg9U+FNcIdacYv0T+uNMoTYjxoAGKPWNXjmWly7VhH1llX/AAy39NUaf0j41aea6bJtTBG/0yv3o3T40MDqCiTRBlKsAQQQQdxB4UehQBSeWGyC2HkjkJK5WEUvFSRokh792Y6HjZrX50UWk867AZQQQRcVy3y72X8l2hiYgLKshZBwyNZ0A7grAeVJKht2R8w6p8KsvNpPlxuH7yynzRvjaq246p8DVg5PjoX2fMNzEE+K4hkb8OWnLgceTexQtRkGle5az0a+o8UUoK8AowFNEWz0UKFCmRBSQjsWNyb20O4WFtKVoGgBMiqtzkYfNs/EdyhvusD8Ktlqp3OltBYsBKCdZLRqO3Mdfwg0LkbexguHbrAd/wAKfK3WI7h8ajoT1h405je8jeH5VeZR5eth5ttljE7IxELaCWSUX7DkQK3kQD5VjordOZ5bbPHfLIfaB8KTGiU5vJWOAhRxleIvC6/VaKRkt6gKFPL/ACeWY5HZJSsnUVntIFyPcDcCqRnvJahQIg9oYP5btaMEXhwKh27DPJZlTyAR+6w7aqHPph7T4V/rRuv3HB/9ytawOCWIELfrMzsTqzMxuWJ9ncAANAKoPPfgc2FgmA/s5cp7lkW3+ZUHnQkBheM9GmA41IYwdWm+GwxdZSP/AC0Dnw6RI/fIKAG7akmpzkwjRT4PE/QGJRb/ALUbROwP8Mi+s9lQlaHsLZXT7AxjKOvBi+mW28AQxK5+6zH+GhgdDUKa7KxQmhhlG540cfxKG+NJbb2xDhImmncIo7d7H6qjezdwoAPtXacWGiaadwka2uTfjoAANST2CsD52MUMVOmLiHzLr0aMVKluj1LEHXUswHcgpjyw5Yz7RkUyWSNfQiUkqpO9iT6TcL9m4C5vb9sbPGJ2WhQarEkiAdqrqB5ZhVqx7WRcjM49VHhUxhAzYGNgQRHK67tV6QK2/suB5mobC7rVa+Q8HTYfFwcTlK9zWNj61FUSdKy7GrdG2bKxAlijcG4ZVYeYvTu1Z7yIxrph48m4XV42Ol1Yi6n6DWt3H21d8BtFJQcpsw9JSLMviOzvFwe2qrRc4tDu1e0KFMQKBNCmG2MG8qBUfKQwb6VmAB6jFSCFN9bUAOsPiFdcy7rmx7bEi47RpoaVqu4PMhPQoEZdZMMxAW314W3AHtHVO4hWuakcJjmnzCBDdTlcyAoEawOUr6TNYg2Gh+sKfSyHWh3isSsalmNhu7SSdygDUk8ANTWG872KnOLEc2gCK6IPoB7+kdxfTUjTSwva53rBbLVGDuxkk4M2gW+8Io0Qe08SaxXn6gtjoX+tAo81kk/MVOMaISlZmsPpDxpfDt1z503jOtLYL0vI1MgSIrfuaeLLsyD9ppW9cz291YAtdJciMMYtn4NDv6FCfFlzketqQ/BOUKFCgQKiOVuyvlWDxEA9J0OS/wBdesn4gKl6FAHJeLTRgRY9h3i3Aipvmz2cMTiZ8P8A87CYiMdzEKVbyKg1Kc6GEhTHzCF1YP1nC7kkN+kS+4m/W7ixHCqjsHacuFnEkMhjcZlzAKbAix0YEeynW4EbJGVLKwIIJDA7wQbEHvBrWOabbOEhwGNixUqoJJCMurOytCqnKgBJG8Xtas02w7PK8jnM0hLsdBdmN2Jtpckk+dKbJOjeVTjD5dLE3tZo+z+c98LgYMPDDnliUxmST0OqSFIRTdurl3lbd9ULbe258XIZcRI0ja2vuUH6KqNFHcKOg1Pfr+vVRJcMp7q0LEkiDkRymtd5vMWJMGqnUoWQ+F8w9jeysleIixq5c2O0sk7RE6SDT7S3PuJ9VC2E+CK5S7J+S4qRLdRuvH9k8PI3HlT3m+xYjxToxAEi2F9LsCCB7TV35cbD+Uw3QfOR9ZO09qefvArNNgShMZAWHVY5GBGlnuhBB8fZWbLj3r7LcU6pmqYDDGOWUD0JD0g7m0Vx59U+ZqSA1DcRuPEeBpt8nkj9A50+qx64+yx9Lwb10V8eoV2NxlF2UizDfw43sbW38KxZMU4PdG/HlhNbDublHJHJHGEEhcgWHVKixJYtqPomwsNx7KdQ8scJ0hieVY5AQCshy6kA6N6J38DUHsbDFi0z7ze3ifSI7hYIPsk/SrJ+WDn5ZiP3h9mla8eC4JvkyZMvzaXB0fHiVYXUgjtBuPZSQxJkJWFc9tC17Rr2gt9I9y377VzHhcVIpGRiNRoNx8RuI7jpWvcludUoqR4yIWFgJIQBYcLxbvu/dp/w75IvKaE2wVYXkdjIL5XXqdGTb+zXUDd9LNfcbjSqXtybF4bFKxt0lvmnQMIp0XLeJhm9IksSDmIBGQekavex9uYfFLmw8ySdoB6y/aQ9ZfMUnt8aQt9WVfxI8f8AXUa8EW/I82djFmjSVL5WFwCLEdqsODA3BHAg1j3+0DH87g27UlHqZD/VWq8ndI5F+rNL+JzJ7nrK/wDaBl+dwa9iSn7zIP6aYGQ3pzgfS8qbU62eNTQBKYTDGV0iXfIyxjxdgo99dTxRhQFG4AAeAFhXP3Nbs/ptpQaaR5pW/hWy/jZK6DpDBQoUKBAqn85vKM4PDZYzaWa6IQbFFA67jvFwAeBYHhVwrC+d/aHSY9o76QoiW7GYdIT5h09QqeOPVJITdIpMvWqPnSzBu/WpCk5o8wrVkx9W6IRkExEWZbdmo/KkNmmzEd1Oo75R2j4UkUs4Ybjv86i47qQ09qH16DHfRAa8kOh8K0PggGQaDwrzC5opEkj0ZWDDyN6ANC9HSmgNq2ZjVmiSRdzAHw7Qe8HTyrPOcbYgiZcRELBm69uDnUN3X9/jTHY3WRlYkgHQXNhpfQcL0ltG7AxRs5vvGY5d9917b6zy+WxlerhjydLNHj2j0uFjdCQ0oRRbeC5Cm3eLk+VNts7MzSQoGYRyHK5zMW6maVFDG51OYb6qPJfaUsDLFIodYrsqjRuvcZ1J0a12Fjb0jrWj4NkxSApdgGB0BBVlIYAg7ju0NLaa3NEMqv4v/mN8FD0chjUtk6NSoLFrZWYGxY33FfVWR8s8OfluIH7d/JgD8a2HakkeHlheVwLh1KL1nsQGDZRc2zJlvu69ZrywlGIxbvCpAYKLG2a6qFubXA3dtNSTdIUskYdzKvHBl13mlwak22M9r5lv2a++okix7NbeBq2Ml4FjzQydrsXimZSGVirDcVJBHgRqKt2xeW+MZoYJZekjMsNy4BcBZUOjixO76V+NUylIJMrBhwII8Qb05wUkWp0bnhuVeHwuKmw+IYx9IySI5HzfWjRMrMPR1jJudNd9Z3z84oNjYUBvlgUn+J3PuA9dK86q/wC8QSD6cX+Vif6xWdbTZmYFmLaBRck2CgBVF+AAAA4WrF0fHqRYn4GNPtnrofGmVWTklsV8XNFBHvc6n6ijVnPgPWbDjUBmt8y+xejw8mJYdaY5U/dx3F/N83kq1o9N8Bg0hjjijFkRVRR3KLDzpxSAFChQoAFc08ssX0m0Ma39+6/cPRj/AC10tXKm1ZL4rF988x9crVdg7xS4C3oXol6F62lQpeiMOHb768vQOtJ0wQreiyNpRFeihusR3A/Cl4AXDXr29JG1eBvOnf2BI4Cd7lE3tbytoT+uyp7CYYRjTfxPbUNshHUl8vVKnU6DeDftO6n0DyTXucqbtBYnzN6pb5o42sSeR0wSkyuDHoFuC/aDvApxEhiZcjuua4OWR1JOUkE5SOwjzoy4ZVG8gD9oj3VFmYl84zZFYb2Y3vpxO/WoNWirHJ38WSOJxZVGJYs9yMzEsxPAljqTa3qo2Bw+Vbn0jqT8KbwwiUlrsAGuB1d+VddQadNhyRbO/wCH/poTpEcm73e4zllaViqGyjQntqDmiszKNeswHadSKtOAwbZljV1ANySw1AAJJ0IBqf2PgIUKiCMyuf8AzLDUneekaw8lv4VLro3aKPTcvBTtnck8ZKAVgex4tZB49cipmDm4xZ3mJfF2PuU1pWFw+JyqC0UYHYrSt6zlA9Rpc4F+OJm8hCo9kfxqDyyOjZT+VnJfFYmPDBVjzRIVY9IetdUGl0HFT66z3bvJbFQqTJCwA1zCzL5lb28628YBhuxUw8TC3+aM0GgnHoyxuOySMgn+NDYfdqKm0qJW7OaI4iSAN5NhxuSbAAcTXRXNhyP+RQ9LKtp5QLj/AJabxH9o6Fu8AcLllgdjQRY5MVNhFjyo93T5yLpCyZJLKAVIXpOsUAFxrWhxuGAKkEEXBBuCDuII3iqWWJ2g1ChQoGChQoUACuUNtpkxuJXsnmX1SsPhXV9cv85EPR7Uxo/vc331WT+qrMTqQnwRt68zUQGhettlYYtQD6kUSk5DpfiKTdAOGNN55LMCKUR7jSkcSul6jLi0NDrPoCPKpnYOFRgWbUg7ju3Xvb1+qq9hTpUls/GmNr8Dow7u3xFJ21ZTqIyljajyTuPcswiXjq3cP18KfRIFAA3CmOyxmzSfWOnh+vdUhUH9Hn5WtiP2tKdEXe3u7KcwbOD9FDcjM6gkWvvzMRfuBpjg/nJmfgNB7h8auHI/ZhnxAP0Y1LE9jPdF9mf1US2VF+ng3kjFFaxcT4d3hVGfK3pbrhhmB0HYQPKkf/EHHpRN7fyq58uNmGJ0l4HqMfPqH1kr/EKrl6LXglqsfRk45H2HwsKRrPiWU3AZVOqi4uBb6bW/0HGmmK5asD8wgFtzPr+AfE1A49ZJJY49WsqpEoBJPAWH1jbXwrROTnN3EqBsUM7n6OYhF7tLFj31lnkd0j0+i02njhjklvfCK7hdu4idbyTSXudFbox6ktQcZvS632iW99XkcicIPQDoOxZGt+K9R21dg4KG3SYmSO+4Z0JPguQk1lkpPydjHqdPFUofhFU6BPqL90Uth5Wj1jZk+wxUeoGxpKM6cd5tcWJFzlJHAkWNqNequppnT9vHOO8V+xP4DlfLH/bASIN7ABZAOJsOq/hp51feScweAlTdelnykbrdM9rdw3eVY9ivQf7J91bjswAQxBQAMiWAFgBlFgBwFasU3Lk4HqWlx4ZJwVXY5oUKFWnNBQoUKABXPPPlg+j2kXtpLFG9+0jNGfZGtdDVjf8AtC4df9yf6VplPgDGR7z66lDkGZJhZNLUuTTBNDT4CtkXsVsBNFNBq9K02Ia5shpwzXU2pOZLiksOdbVXfgkLYQ6GnINN4FtfxpcCpQewmTvJ3Eekh+0PcfhUvi3sjHsBqqYGQq6kb7geR0I9tWXaf9m3l7xUWvkcbW46yJ/YTZChY7njcnwGnwrXOQGCCYZX+lL127vohO4gCxHbmrPeSOEWSaBGF1Cl7dpTKRfuub+QrQ9mOY8UY19CSNpSOAcOqkr2Zg1z3i+hJvRll8qN3p+m+DzP+x5ytwy4gxYdhdWzu/2UXKNeBzuhH2KyjFbEkjlaEO5kDZVA1L31UqNN417tew1rhObEzk71EaD7OXP73PqFI7GwqPLNOygyKxhU2HVRbGw8SxJ8qgpuPBvzaSObGr5sYckeSow4Waezz5bX0tGPqr2nXVuPhUFy35csjNBhWsVNnkFjYjeiX0v2nyHbU5y823Lh4ysWUFl9KxzLdit11tfyqv8AI3khhpkEsodz9Ut1PMAAnzNUttu2bdPHHiW62Xgr+ydqYmbpM8k8gFibNKwG+98ug4b6cRqu9QPEW99a7hsIkahY0VVG4KAB6hTDaewMPMbvGM31l6r/AHl3+d6qlCzdi10YvsRmleU55S4UYWQKjMwJt18pP4QKbiqnGjq4NRHMriEl3HwPurbNitfDwHtij/yCsVYVsfJY3wWDP9xD/KWr8Hk5XrH9H+f9EpQoUK0HEBQoUKAP/9k=" />*/}
                            {/*</IconButton>*/}
                        {/*</Grid>*/}
                    {/*</Grid>*/}
                {/*</Toolbar>*/}
            {/*</AppBar>*/}
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
                                {props.name}
                            </Typography>
                        </Grid>
                        {
                            props.project !== null && props.route.location.pathname === '/' ?
                                <Grid item>
                                    <Tooltip title="Back to writing">
                                        <IconButton color="inherit" onClick={() => props.route.history.push('/editor')}>
                                            <ArrowBack />
                                        </IconButton>
                                    </Tooltip>
                                </Grid> : null
                        }

                        <Grid item>
                            <Tooltip title="Help">
                                <IconButton color="inherit">
                                    <HelpIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <Tooltip title="Alerts • No alters">
                                <IconButton color="inherit">
                                    <NotificationsIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <IconButton color="inherit" className={classes.iconButtonAvatar}>
                                <Avatar className={classes.avatar} src="data:image/jpeg;base64,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" />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            {/*<AppBar*/}
                {/*component="div"*/}
                {/*className={classes.secondaryBar}*/}
                {/*color="primary"*/}
                {/*position="static"*/}
                {/*elevation={0}*/}
            {/*>*/}
                {/*<Tabs value={0} textColor="inherit">*/}
                    {/*<Tab textColor="inherit" label="Users" />*/}
                    {/*<Tab textColor="inherit" label="Sign-in method" />*/}
                    {/*<Tab textColor="inherit" label="Templates" />*/}
                    {/*<Tab textColor="inherit" label="Usage" />*/}
                {/*</Tabs>*/}
            {/*</AppBar>*/}
        </React.Fragment>
    );
}

Header.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);