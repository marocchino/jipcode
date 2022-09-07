import { locate, prefectureCode } from "./index";

describe("prefectureCode", () => {
  it("returns prefecture code hash", () => {
    expect(prefectureCode).toMatchSnapshot();
  });
});

describe("locate", () => {
  it("returns nil array when long number", async () => {
    expect(await locate("100000000")).toEqual([]);
  });

  it("returns nil array when not number", async () => {
    expect(await locate("ABCDEFG")).toEqual([]);
  });

  it("returns nil array when not exists", async () => {
    expect(await locate("0081234")).toEqual([]);
  });

  it("returns when with hyphen", async () => {
    expect(await locate("115-0051")).toEqual([
      { city: "北区", prefecture: "東京都", town: "浮間", zipcode: "1150051" },
    ]);
  });

  it("returns when no options", async () => {
    expect(await locate("1150051")).toEqual([
      { city: "北区", prefecture: "東京都", town: "浮間", zipcode: "1150051" },
    ]);
  });

  it("returns when prefectureCode options", async () => {
    expect(await locate("1150051", { prefectureCode: true })).toEqual([
      {
        city: "北区",
        prefecture: "東京都",
        prefectureCode: 13,
        town: "浮間",
        zipcode: "1150051",
      },
    ]);
  });
});
