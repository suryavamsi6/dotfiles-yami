import Tray from "gi://AstalTray";
import { bind } from "../../../../../../../usr/share/astal/gjs";
import AstalApps from "gi://AstalApps?version=0.1";
import { Icons } from "../utils/Icons";
export function SystemTray() {
  const tray = Tray.get_default();
  const items = bind(tray, "items");
  let app = new AstalApps.Application();
  const apps = new AstalApps.Apps();

  return (
    <box>
      {bind(tray, "items").as((items) => {
        return items.map((item) => (
          <button
            onClicked={() => item.activate(2, 2)}
            tooltipText={item.get_title()}
            cssClasses={["system-buttons", "system-info"]}
          >
            {(app = apps.fuzzy_query(item.get_title())[0])}
            {app.get_icon_name() != null ? (
              <image iconName={app.get_icon_name()}></image>
            ) : (
              <label label={Icons.application}></label>
            )}
          </button>
        ));
      })}
    </box>
  );
}
