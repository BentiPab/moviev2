import { NavLinkType } from "model/models";
import { navLinks } from "utils/navbar";

export const redirectLinks = navLinks.reduce((accum, link) => {
  if (link.label === "homepage") {
    return [...accum, link];
  }

  if (!link.sublinks || !["movies", "tv shows"].includes(link.label)) {
    return accum;
  }

  return [
    ...accum,
    {
      label: `${link.label} - ${link.sublinks[0].label}`,
      value: link.sublinks[0].path,
    },
  ];
}, [] as Omit<NavLinkType, "icon">[]);
