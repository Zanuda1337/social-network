import React from "react";
import { NavLink } from "react-router-dom";
import classes from "src/features/Navigation/Navigation.module.scss";
import SvgSelector from "src/components/SvgSelector/SvgSelector";

type TNavigationLinkProps = {
  to: string;
  label?: string;
  svgId: string;
};

const NavigationLink: React.FC<TNavigationLinkProps> = ({
  to,
  label,
  svgId,
}) => (
  <li>
    <NavLink
      to={to}
      className={(data) => (data.isActive ? classes.active : "")}
    >
      <SvgSelector id={svgId} />
      {label && <p>{label}</p>}
    </NavLink>
  </li>
);

export default NavigationLink;
