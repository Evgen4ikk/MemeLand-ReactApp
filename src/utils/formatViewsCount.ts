export function formatCount(views: number): string {
  if (views >= 1000000000) {
    return (views / 1000000000).toFixed(1).replace(".", ",") + " млрд";
  } else if (views >= 1000000) {
    return (views / 1000000).toFixed(1).replace(".", ",") + " млн";
  } else if (views >= 1000) {
    return (views / 1000).toFixed(1).replace(".", ",") + " тыс.";
  } else {
    return views.toLocaleString("ru-RU");
  }
}