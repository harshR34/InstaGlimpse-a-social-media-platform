import home from '../icons/home.svg';
import wallpaper from '../icons/wallpaper.svg';
import people from '../icons/people.svg';
import bookmark from '../icons/bookmark.svg';
import gallery_add from '../icons/gallery-add.svg';

export const sidebarLinks = [
  {
    imgURL: home,
    route: "/",
    label: "Home",
  },
  {
    imgURL: wallpaper,
    route: "/explore",
    label: "Explore",
  },
  {
    imgURL: people,
    route: "/all-users",
    label: "People",
  },
  {
    imgURL: bookmark,
    route: "/saved",
    label: "Saved",
  },
  {
    imgURL: gallery_add,
    route: "/create-post",
    label: "Create Post",
  },
];

export const bottombarLinks = [
  {
    imgURL: home,
    route: "/",
    label: "Home",
  },
  {
    imgURL: home,
    route: "/explore",
    label: "Explore",
  },
  {
    imgURL: bookmark,
    route: "/saved",
    label: "Saved",
  },
  {
    imgURL: gallery_add,
    route: "/create-post",
    label: "Create",
  },
];