import { renderHook } from "@testing-library/react";
import { useCombatActions } from "./useCombatActions";
import { act } from "react-dom/test-utils";

it("baseAtk: verifica se o hp do receiver muda quando é atacado ", () => {
  const { result } = renderHook(() => useCombatActions());
  const { baseAtk, user, monster } = result.current;
  const initialMonsterHp = monster.getHp();
  act(() => baseAtk(user, monster));
  expect(monster.getHp()).toBeLessThan(initialMonsterHp);
});

it("baseAtk: verifica se o hp do sender muda quando é atacado", () => {
  const { result } = renderHook(() => useCombatActions());
  const { baseAtk, monster } = result.current;
  const initialUserHp = result.current.user.getHp();
  act(() => baseAtk(monster, result.current.user));
  expect(result.current.user.getHp()).toBeLessThan(initialUserHp);
});
it("baseAtk: receiver morre quando  HP chega a 0", () => {
  const { result } = renderHook(() => useCombatActions());
  const { baseAtk, monster } = result.current;
  monster.setHp(0);
  baseAtk(result.current.user, monster);
  expect(monster.getHp()).toBeLessThanOrEqual(0);
});
it("baseAtk: sender morre quando  HP chega a 0", () => {
  const { result } = renderHook(() => useCombatActions());
  const { baseAtk, user } = result.current;
  user.setHp(0);
  act(() => baseAtk(result.current.monster, user));
  expect(user.getHp()).toBeLessThanOrEqual(0);
});
it("baseAtk: receiver ataca sender quando não está morto", () => {
  const { result } = renderHook(() => useCombatActions());
  const { baseAtk, user, monster } = result.current;
  const initialUserHp = user.getHp();
  monster.setHp(100);
  act(() => baseAtk(user, monster));
  expect(user.getHp()).toBeLessThan(initialUserHp);
  expect(monster.getHp()).toBeGreaterThan(0);
});
