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
  name: string; // 标题
  date: string; // 创建时间
  intro: string; // 介绍
  users: IPeople[]; // 参与者
  viewPoints: IViewPoint[]; // 观点
  initiator: IPeople; // 发起人
  player: IPlayer[]; // 参与人
}
export interface IPlayer {
  customerId: string;
  viewPointId: string;
  user: IPeople;
  date: string;
}
export interface IViewPointCusromer extends IPeople {
  date: string;
}
export interface IViewPoint {
  _id: string;
  name: string;
  users: IViewPointCusromer[];
}
export interface IViewPointPeople extends IPeople {
  date: string;
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
  return get<IBetInfo>(`/bet/${appointmentId}`);
}

// 创建Bet
export async function createBet(
  name: string,
  intro: string,
  viewPoints: IViewPoint[],
  level: number = 1,
) {
  return post(`/bet`, {
    name,
    intro,
    viewPoints,
    level,
  });
}

// 选择观点
export async function selectViewPoint(betId: string, viewPointId: string) {
  return post(`/bet/participate`, {
    id: betId,
    viewPointId,
  });
}
