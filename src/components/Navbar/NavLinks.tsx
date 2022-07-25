import { List } from "@mui/material";
import useNavlinks from "hooks/useNavLinks";
import NavExpandLink from "./NavExpandLink";


const NavLinks = () => {
    const links = useNavlinks()


    return (
        <List component="nav">
            {links.map((link) => (
                <NavExpandLink link={link} key={link.label} />
            ))}
        </List>
    );
};

export default NavLinks;
