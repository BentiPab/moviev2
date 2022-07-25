import { NavLinkType } from "model/models";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { navLinks } from "utils/navbar";
import { selectUser } from "./../features/user/selectors";

const useNavlinks = () => {
    const user = useSelector(selectUser);
    const [links, setLinks] = useState<NavLinkType[]>([])

    useEffect(() => {
        const newLinks = navLinks.map((link) => {
            if (!link.sublinks) {
                return link;
            }

            const filteredSublinks = link.sublinks?.filter(
                (sublink) => (!!user && sublink.auth) || (!user && sublink.guest)
            );

            return {
                ...link,
                sublinks: filteredSublinks
            }
        });
        setLinks(newLinks)
    }, [user])

    return links;
};

export default useNavlinks;
