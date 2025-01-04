import Tray from "gi://AstalTray";
import { bind } from "../../../../../../../usr/share/astal/gjs";
export function SystemTray() {
  const tray = Tray.get_default();
  const items = bind(tray, "items");

  return (
    <box>
      {bind(tray, "items").as((items) => {
        return items.map((item) => (
          <button
            tooltipText={item.get_title()}
            cssClasses={["system-buttons"]}
          >
            <image file={item.get_gicon().to_string()}></image>
          </button>
        ));
      })}
    </box>
  );
}
