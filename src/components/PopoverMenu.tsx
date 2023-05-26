import { IconButton, Menu, MenuItem } from '@mui/material';
import { ReactNode, useRef, useState } from 'react';

type Item = {
  label: string;
  onClick: () => void;
};

type Props = {
  icon: ReactNode;
  items: Array<Item>;
};

export function PopoverMenu(props: Props) {
  const { icon, items } = props;
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <IconButton ref={menuButtonRef} onClick={() => setMenuOpen(true)}>
        {icon}
      </IconButton>
      <Menu
        anchorEl={menuButtonRef.current}
        open={isMenuOpen}
        onClose={() => setMenuOpen(false)}
      >
        {items.map(({ label, onClick }) => (
          <MenuItem
            onClick={() => {
              setMenuOpen(false);
              onClick();
            }}
          >
            {label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
