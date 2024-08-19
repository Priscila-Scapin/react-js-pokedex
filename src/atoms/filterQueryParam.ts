import { atom } from "recoil";

const filterQueryParamAtom = atom<string>({
    key: 'filterQueryParam',
    default: '', 
  });

  export default filterQueryParamAtom