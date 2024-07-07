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
import { useMsal } from "@azure/msal-react";

function Navbar() {
    const { instance } = useMsal();
    const userAccount = () => instance.getActiveAccount() || instance.getAllAccounts()[0];
    const userInitials = () => {
        const account = userAccount();
        if (!account?.name) return "";

        // get initials with regex
        const initials = account.name.match(/\b\w/g) || [];
        return ((initials.shift() || "") + (initials.pop() || "")).toUpperCase();
    };
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
                            key: "search",
                            text: "Search",
                            className: matchPath("/search", pathname) ? "open" : "",
                            buttonStyles: {
                                root: {
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                },
                            },
                            onClick: () => navigate("/search"),
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
                                onClick: () => {
                                    instance.logoutRedirect({
                                        onRedirectNavigate: () => {
                                            // Return false to stop navigation after local logout
                                            return false;
                                        }
                                    });
                                },
                            },
                        ],
                    }}
                >
                    <Persona
                        {...{
                            imageInitials: userInitials(),
                            text: userAccount()?.name,
                        }}
                        size={PersonaSize.size32}
                    />
                </CommandBarButton>
            </Stack.Item>
        </Stack>
    );
}

export default Navbar;
