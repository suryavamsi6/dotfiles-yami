import Bluetooth from "gi://AstalBluetooth";
import { bind } from "../../../../../../../usr/share/astal/gjs";

const bluetooth = Bluetooth.get_default();

export function BluetoothControl() {
  function setBluetoothState() {
    bluetooth.toggle();
  }
  return (
    <box>
      <button
        onClicked={setBluetoothState}
        cssClasses={["control-buttons", "bluetooth-info"]}
      >
        {bind(bluetooth, "is_powered").as((isPowered) =>
          isPowered ? <label></label> : <label>󰂲</label>,
        )}
      </button>
    </box>
  );
}
