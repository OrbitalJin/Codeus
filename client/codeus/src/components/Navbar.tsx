import ThemeModeToggle from "./ThemeModeToggle";

const Navbar: React.FC = () => {
    return (
        <nav className="flex w-ful px-3 py-3">
            <a className="grow font-bold text-3xl" href="/">
                Code
                <span className="text-primary">us</span>
            </a>
            <ThemeModeToggle />
        </nav>
    );
};

export default Navbar;
