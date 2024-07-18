import { useState } from "react";

export default function useAsync(asyncFunction) {
  const [pending, setPending] = useState(false);

  const wrappedFuncion = async (...args) => {
    try {
      setPending(true);
      const result = await asyncFunction(...args);
      return result;
    } catch (error) {
      alert(error.message); // 에러 메시지를 직접 표시
      return null;
    } finally {
      setPending(false);
    }
  };

  return [pending, wrappedFuncion];
}
