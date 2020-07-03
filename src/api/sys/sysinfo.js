import request from "@/libs/axios";

export function getSysInfo() {
  return request({
    url: "/sys/info"
  });
}
