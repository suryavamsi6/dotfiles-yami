import { Icons } from "../utils/Icons";
import { exec, subprocess } from "../../../../../../../usr/share/astal/gjs";

export function PowerControl() {
  function logOut() {
    subprocess("hyprctl dispatch exit");
  }

  return (
    <box>
      <button
        cssClasses={["control-buttons", "power-button"]}
        onClicked={logOut}
      >
        <label>{Icons.power}</label>
      </button>
    </box>
  );
}
