import { NotificationManager } from "../components/react-notifications";

const Notification = (status, message, history = null) => {
  if (status === 400) {
    NotificationManager.error(
      message.reduce((acc, cur) => {
        return `${acc}\n${cur.message}`;
      }, ""),
      "Error!!",
      3000,
      null,
      null,
      "mb-3"
    );
  }
  if (status >= 200 && status < 300) {
    NotificationManager.success(
      message.message,
      "Success",
      3000,
      null,
      null,
      "mb-3"
    );

    // setTimeout(() => {
    //   location.reload()
    // }, 1000);
  }

  if ((status > 400 && status < 403) || (status >= 404 && status < 500))
    NotificationManager.error(
      message.message === undefined ? message.statusText : message.message,
      "Error!!",
      3000,
      null,
      null,
      "mb-3"
    );

  if (status >= 500)
    NotificationManager.warning(
      message.message,
      "Success",
      3000,
      null,
      null,
      "mb-3"
    );

  // if (status === 403) {
  //   NotificationManager.error(
  //     message.message,
  //     "Error!!",
  //     3000,
  //     null,
  //     null,
  //     "mb-3"
  //   );

  //   if (history)
  //     setTimeout(() => {
  //       localStorage.removeItem("piar_current_user");
  //       localStorage.removeItem("token");
  //       history.push("/user/login");
  //     }, 2000);
  // }
};

export default Notification;
