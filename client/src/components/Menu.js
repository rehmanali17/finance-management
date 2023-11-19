import * as React from "react";
import {
    Divider,
    Paper,
    Menu,
    MenuItem,
    ListItemIcon,
    Typography,
} from "@mui/material";
import PropTypes from "prop-types";

const CustomMenu = props => {
    const styles = {
        paper: { width: 320, maxWidth: "100%" },
        textSecondary: {
            color: "text.secondary",
        },
    };

    return (
        <Paper sx={styles.paper}>
            <Menu
                anchorEl={props.anchorElement}
                onClose={props.onClose}
                open={props.open}
            >
                <MenuItem>
                    <ListItemIcon>{props.menus.role.icon}</ListItemIcon>
                    <Typography variant="body2" color={styles.textSecondary}>
                        {props.menus.role.title}
                    </Typography>
                </MenuItem>
                <Divider />
                {props.menus.items.map(menu => (
                    <MenuItem onClick={menu.command} key={menu.text}>
                        <ListItemIcon>{menu.icon}</ListItemIcon>
                        <Typography
                            variant="body2"
                            color={styles.textSecondary}
                        >
                            {menu.text}
                        </Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Paper>
    );
};

CustomMenu.propTypes = {
    anchorElement: PropTypes.object,
    onClose: PropTypes.func,
    open: PropTypes.bool,
    menus: PropTypes.object,
};

export default CustomMenu;
