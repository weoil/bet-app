import { get, post } from '.';

// 人员属性
export interface IPeople {
  _id: string;
  name: string;
  avatar: string;
}

// 约定列表的item
export interface IBetListItem {
  _id: string;
  name: string;
  date: string; // 创建时间
  intro: string; // 介绍
  users: IPeople[]; // 参与者
  initiator: IPeople; // 发起人
}

// 获取约定列表
export async function getBetList(page: number) {
  return get<IBetListItem[]>(`/bet`, {
    page,
  });
}

// 获取约定详情
export interface IBetInfo extends IBetListItem {}
export async function getBetInfo(appointmentId: string) {
  return get<IBetInfo>(`/appointment/${appointmentId}`);
}

// 创建Bet
export async function createBet(
  name: string,
  intro: string,
  viewPoints: string[],
  level: number = 1,
) {
  return post(`/bet`, {
    name,
    intro,
    viewPoints,
    level,
  });
}
