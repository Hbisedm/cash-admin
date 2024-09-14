export function useEnv() {
  const { VITE_BASE_URL, MODE } = import.meta.env
  // 如果名字变换了，我们可以在这里解构别名
  return {
    MODE,
    VITE_BASE_URL,
  }
}
