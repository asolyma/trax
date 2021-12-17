import {
  List,
  ListItem,
  ListIcon,
  LinkOverlay,
  LinkBox,
} from "@chakra-ui/react";
import { IconType } from "react-icons/lib";
import NextLink from "next/link";
type menuType = {
  name: string;
  icon: IconType;
  route: string;
};
const MenuListItems: React.FC<{ menu: menuType[] }> = ({ menu }) => {
  return (
    <List spacing={2}>
      {menu.map((item) => (
        <ListItem paddingX="20px" fontSize="16px" key={item.name}>
          <LinkBox>
            <NextLink href={item.route} passHref>
              <LinkOverlay>
                <ListIcon as={item.icon} color="white" marginRight="20px" />
                {item.name}
              </LinkOverlay>
            </NextLink>
          </LinkBox>
        </ListItem>
      ))}
    </List>
  );
};

export default MenuListItems;
