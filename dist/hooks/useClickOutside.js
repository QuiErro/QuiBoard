import { useEffect } from "react";
function useClickOutside(ref, handler) {
  useEffect(
    function () {
      var listener = function (event) {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("click", listener);
      // 注意使用return清除上次触发的listener
      return function () {
        document.removeEventListener("click", listener);
      };
    },
    [ref, handler],
  );
}
export default useClickOutside;
