import { atom } from "recoil";

const filterTypeAtom = atom<string>({
    key: 'filterType',
    default: '', 
  });

  export default filterTypeAtom