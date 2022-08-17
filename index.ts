import fetch from "node-fetch";
import prefectureCode from "./prefectureCode.json";
const ZIPCODE_URL = "https://marocchino.github.io/jipcode/latest";

type Option = {
  prefectureCode?: boolean;
};

type Zipcode = {
  zipcode: string;
  prefecture: string;
  prefectureCode?: number;
  city: string;
  town: string;
};

export const locate = async (
  zipcode: string,
  option: Option = {}
): Promise<Zipcode[]> => {
  if (zipcode.length !== 7 || !/^\d+$/.test(zipcode)) {
    return [];
  }

  const url = `${ZIPCODE_URL}/${zipcode.slice(0, 3)}.csv.json`;

  // get json
  try {
    const response = await fetch(url);
    const json = (await response.json()) as string[][];
    const addressesArray = json.filter((address) => address[0] === zipcode);

    if (option.prefectureCode) {
      return addressesArray.map(extendedAddressFrom);
    } else {
      return addressesArray.map(basicAddressFrom);
    }
  } catch (e) {
    return [];
  }
};

const basicAddressFrom = (address: string[]): Zipcode => ({
  zipcode: address[0],
  prefecture: address[1],
  city: address[2],
  town: address[3],
});

const extendedAddressFrom = (address: string[]): Zipcode => {
  const basic = basicAddressFrom(address);
  return {
    ...basic,
    prefectureCode: (prefectureCode as { [key: string]: number })[
      basic.prefecture
    ],
  };
};
