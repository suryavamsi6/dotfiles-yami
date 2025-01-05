import Network from "gi://AstalNetwork";
import { bind } from "../../../../../../../usr/share/astal/gjs";

export function WifiControl() {
  const network = Network.get_default();
  const wired = bind(network, "wired");
  const wifi = bind(network, "wifi");

  function setWifiState() {
    wifi.get().set_enabled(!wifi.get().get_enabled());
  }
  return (
    <box>
      <box visible={wired != null && wired.as(Boolean)}>
        <button
          cssClasses={["control-buttons", "wifi-info"]}
          onClicked={setWifiState}
        >
          {bind(wifi.get(), "enabled").as((enabled) =>
            enabled ? <label label={"󰖩"} /> : <label label={"󰖪"} />,
          )}
        </button>
        <button cssClasses={["control-buttons", "ethernet-info"]}>
          {bind(wired.get(), "device").as((device) =>
            device != null ? <label label={"󰈁"} /> : "",
          )}
        </button>
      </box>
    </box>
  );
}
