import disableDevtool from "disable-devtool";

let devtoolOpenCount = 0; // Initialize counter

export default defineNuxtPlugin(() => {
  disableDevtool({
    ondevtoolopen: () => {
      const confirmResult = confirm(
        `해킹 시도가 감지되었습니다.\n현재 감지 횟수: ${devtoolOpenCount}번\n실수로 열었으면 취소 버튼을 눌러주세요.`
      );

      if (!confirmResult) {
        alert("취소하셨으므로 페이지를 닫습니다.");
        window.close();
        return;
      }

      devtoolOpenCount++;

      if (devtoolOpenCount >= 5) {
        window.location.href = "https://theannoyingsite.com";
      }

      if (devtoolOpenCount >= 6) {
        alert(
          "해커는 근본적으로 개발자를 이길 수 없다. 😛😛😛😛😛 좀 배우고 가라"
        );
      }
    },
    clearIntervalWhenDevOpenTrigger: false,
    disableMenu: false,
  });
});
