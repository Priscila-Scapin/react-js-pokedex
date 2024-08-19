import { atom } from "recoil";

const filterQueryLoaderAtom = atom<boolean>({
    key: 'filterQueryLoader',
    default: false, 
  });

  export default filterQueryLoaderAtom