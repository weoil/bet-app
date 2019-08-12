import { get } from '.';

// 人员属性
export interface IPeople {
  id: string;
  name: string;
  avatar: string;
}

// 约定列表的item
export interface IBetListItem {
  id: string;
  title: string;
  date: string; // 创建时间
  endDate: string; // 结束时间
  intro: string; // 介绍
  participants: IPeople[]; // 参与者
  originator: IPeople; // 发起人
  gift: string; // 礼物/奖品
}

// 获取约定列表
export async function getBetList(page: number) {
  return get<IBetListItem[]>(
    `/appointment/list?page=${page}&size=${20}&sort=1`,
  );
}

// 获取约定详情
export interface IBetInfo extends IBetListItem {}
export async function getBetInfo(appointmentId: string) {
  return get<IBetInfo>(`/appointment/${appointmentId}`);
}
