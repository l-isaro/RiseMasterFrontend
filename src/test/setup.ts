import "@testing-library/jest-dom";
import { vi } from "vitest";

// Polyfill matchMedia — required by Radix UI and animation libraries
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Polyfill ResizeObserver — required by some Radix UI components
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock framer-motion globally so animations don't interfere with tests
vi.mock("framer-motion", async () => {
  const React = await import("react");

  const motionComponent = (tag: string) =>
    function MotionElement({
      children,
      initial,
      animate,
      exit,
      transition,
      variants,
      whileHover,
      whileTap,
      whileInView,
      layout,
      ...props
    }: any) {
      return React.createElement(tag, props, children);
    };

  return {
    motion: new Proxy({} as Record<string, unknown>, {
      get: (_, tag: string) => motionComponent(tag),
    }),
    AnimatePresence: ({ children }: { children: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
    useAnimation: () => ({ start: vi.fn(), stop: vi.fn() }),
    useScroll: () => ({ scrollY: { onChange: vi.fn() } }),
    useTransform: (_source: unknown, _from: unknown, outputRange: number[]) =>
      outputRange ? outputRange[0] : 0,
  };
});
