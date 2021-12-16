interface IConstant {
  cs: {
    path: string;
    locale: string;
    default: boolean;
  };
  en: {
    path: string;
    locale: string;
    default?: boolean;
  };
}

export const Language: IConstant = {
  cs: {
    path: "cs",
    locale: "CS",
    default: true,
  },
  en: {
    path: "en",
    locale: "EN",
  },
};
