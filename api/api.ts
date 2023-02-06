import { PhotoData } from "@type-photos";
import { PostData } from "@type-posts";
import axios, { AxiosRequestConfig } from "axios";

const insertHeaderOption = (
  config: AxiosRequestConfig<any>,
  isFormData?: boolean
) => {
  // let authToken = localStorage.getItem(TOKEN) || "";

  let customConfig = config;
  // customConfig.headers = {
  //   ...customConfig?.headers,
  //   authorization: `Bearer ${authToken}`,
  // };
  if (isFormData) {
    customConfig.headers = {
      ...customConfig?.headers,
      "content-type": "multipart/form-data",
    };
  }
  return customConfig;
};

// error 를 catch 하지않고 호출부에서 처리 합니다.
export const requestWithAuthCheck = async <T>(
  config: AxiosRequestConfig<any>,
  isFormData?: boolean
) => {
  const customConfig = insertHeaderOption(config, isFormData);
  const data = isFormData ? config.data : { ...config.data };

  const res = await axios.request<T>({
    ...customConfig,
    data,
  });
  return res.data;
};

export const API = {
  PHOTO: {
    조회: ({ page }: { page: number }) =>
      requestWithAuthCheck<PhotoData[]>({
        url: `https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${page}`,
        method: "get",
      }),
  },
  POST: {
    조회: () =>
      requestWithAuthCheck<PostData[]>({
        url: "https://jsonplaceholder.typicode.com/posts",
        method: "get",
      }),
  },
};
