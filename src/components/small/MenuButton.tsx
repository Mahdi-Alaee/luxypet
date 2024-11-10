interface MenuButtonProps {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuButton: React.FC<MenuButtonProps> = ({
  isMenuOpen,
  setIsMenuOpen,
}) => {
  return (
    <button
      id="btn-menu-responsive"
      className={`btn-menu dark:bg-darkBrown rounded-lg md:hidden 
          ${!isMenuOpen ? "" : "close fixed z-50 bg-mainColor"}
           lg:hidden`}
      onClick={() => setIsMenuOpen((prev) => !prev)}
    >
      <span></span>
    </button>
  );
};

export default MenuButton;
