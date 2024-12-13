import { renderHook } from "@testing-library/react";
import { useCombatActions } from "./useCombatActions";
import { act } from "react-dom/test-utils";

describe("baseAtk", () => {
  const windowMock = jest.spyOn(window, "alert").mockImplementation(() => {});

  it("decreases monster's hp", () => {
    // Arrange
    const { result } = renderHook(() => useCombatActions());
    const { baseAtk, user, monster } = result.current;
    const initialMonsterHp = monster.getHp();

    // Act
    act(() => baseAtk(user, monster));

    // Assert
    expect(monster.getHp()).toBeLessThan(initialMonsterHp);
  });

  it("decreases user's hp", () => {
    const { result } = renderHook(() => useCombatActions());
    const { baseAtk, monster, user } = result.current;
    const initialUserHp = user.getHp();

    act(() => baseAtk(monster, user));

    expect(user.getHp()).toBeLessThan(initialUserHp);
  });

  it("fires an alert when monster is dead", () => {
    const { result } = renderHook(() => useCombatActions());
    const { baseAtk, monster, user } = result.current;
    monster.setHp(0);

    act(() => baseAtk(user, monster));

    expect(windowMock).toBeCalled();
  });

  it("fires an alert when user is dead", () => {
    const { result } = renderHook(() => useCombatActions());
    const { baseAtk, user, monster } = result.current;

    act(() => baseAtk(user, monster));

    expect(windowMock).toBeCalled();
  });

  it("does not allow monster to strike back if it is dead", () => {
    const { result } = renderHook(() => useCombatActions());
    const { baseAtk, monster, user } = result.current;
    monster.setHp(0);
    const initialUserHp = user.getHp();

    act(() => baseAtk(user, monster));

    expect(monster.getHp()).toBeLessThanOrEqual(0);
    expect(user.getHp()).toEqual(initialUserHp);
  });

  it("does allow monster to strike back if it's still alive", () => {
    const { result } = renderHook(() => useCombatActions());
    const { baseAtk, user, monster } = result.current;
    const initialUserHp = user.getHp();
    monster.setHp(100);

    act(() => baseAtk(user, monster));

    expect(user.getHp()).toBeLessThan(initialUserHp);
    expect(monster.getHp()).toBeGreaterThan(0);
  });
});
