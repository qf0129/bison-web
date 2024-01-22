import router from "@/router";
import axios from "axios";
import { MessagePlugin } from "tdesign-vue-next";

// 分页数据结构体
export type PageBody = {
  list: Array<any>;
  page_num: number;
  page_size: number;
  total: number;
};

// 查询结构体
// export type QueryBody = {
//   page_num?: number;
//   page_size?: number;
//   no_paging?: boolean;
//   preload?: string;
// };

// 响应结构体
export type RespBody = {
  req_id: string;
  code: number;
  msg: string;
  data: any;
};

// export function ConvertQueryFilters(filterObj: object) {
//   var paramsList = [];
//   for (const key in filterObj) {
//     paramsList.push(key + ":" + filterObj[key as keyof Object]);
//   }
//   return paramsList.join("|");
// }

const request = axios.create({
  // baseURL: 'http://localhost:8080',
  timeout: 5000,
  responseType: "json",
});

// 请求拦截器
request.interceptors.request.use(
  function (config) {
    // if (typeof config.params?.filter === "object") {
    //   config.params.filter = ConvertQueryFilters(config.params.filter);
    // }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  function (response) {
    if (response.data.code !== 0) {
      MessagePlugin.warning(response.data.msg);
      console.log("RequestFailed:", response.data);
    }
    return response.data;
  },
  function (error) {
    if (error.response && error.response.status) {
      if (error.response.status === 401) {
        router.push("/signin");
      } else if (error.response.status !== 200) {
        console.log("RequestError:", error.response.status);
      }
    } else {
      console.log("RequestException:", error);
    }
    return Promise.reject(error);
  }
);

export default request;
