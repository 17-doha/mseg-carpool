import {
  CommandBar,
  CommandBarButton,
  Persona,
  PersonaSize,
  Stack,
} from "@fluentui/react";
import "./Navbar.css";

import logo from "../../assets/logo.png";
import { useLocation, useNavigate, matchPath } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Stack enableScopedSelectors horizontal className="Navbar">
      <Stack.Item disableShrink className="stack-item logo-container">
        <img title="Microsoft" src={logo} />
      </Stack.Item>
      <Stack.Item grow className="stack-item menu-container">
        <CommandBar
          className="menu"
          styles={{
            root: {
              padding: 0,
              height: 54,
            },
          }}
          items={[
            {
              key: "rides",
              text: "Rides",
              className:
                matchPath("/", pathname) || matchPath("/rides", pathname)
                  ? "open"
                  : "",
              buttonStyles: {
                root: {
                  paddingLeft: 10,
                  paddingRight: 10,
                },
              },
              onClick: () => navigate("/rides"),
            },
            {
              key: "dashboard",
              text: "Dashboard",
              className: matchPath("/dashboard", pathname) ? "open" : "",
              buttonStyles: {
                root: {
                  paddingLeft: 10,
                  paddingRight: 10,
                },
              },
              onClick: () => navigate("/dashboard"),
            },
            {
              key: "error404",
              text: "Error404",
              buttonStyles: {
                root: {
                  paddingLeft: 10,
                  paddingRight: 10,
                },
              },
              onClick: () => navigate("/random/path"),
            },
          ]}
        />
      </Stack.Item>
      <Stack.Item disableShrink className="stack-item user-container">
        <CommandBarButton
          className="user-button"
          menuProps={{
            items: [
              {
                key: "sign-out",
                text: "Sign out",
                iconProps: { iconName: "SignOut" },
              },
            ],
          }}
        >
          <Persona
            {...{
              imageUrl: "/path/to/profile/image.jpg",
              imageInitials: "AB",
              text: "Username",
            }}
            size={PersonaSize.size32}
            styles={{
              details: {
                display: "none",
              },
            }}
          />
        </CommandBarButton>
      </Stack.Item>
    </Stack>
  );
}

export default Navbar;
