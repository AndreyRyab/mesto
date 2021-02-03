const elbrusImage = new URL('../images/mesto-elbrus-xl.jpg', import.meta.url);
const polyanaImage = new URL('../images/mesto-polyana-xl.jpg', import.meta.url);
const chegetImage = new URL('../images/mesto-cheget-xl.jpg', import.meta.url);
const kareliaImage = new URL('../images/mesto-karelia-xl.jpg', import.meta.url);
const ladogaImage = new URL('../images/mesto-ladoga-xl.jpg', import.meta.url);
const kondukiImage = new URL('../images/mesto-konduki-xl.jpg', import.meta.url);


export const initialCards = [
  {
    name: 'Эльбрус',
    link: elbrusImage
  },
  {
    name: 'Красная поляна',
    link: polyanaImage
  },
  {
    name: 'Чегет',
    link: chegetImage
  },
  {
    name: 'Карелия',
    link: kareliaImage
  },
  {
    name: 'Ладожское озеро',
    link: ladogaImage
  },
  {
    name: 'Кондуки',
    link: kondukiImage
  }
];