import GLib from "gi://GLib?version=2.0";
import { Icons } from "../utils/Icons";

export const ArchLinuxLogoButton = () => {
  let iconName = GLib.get_os_info("LOGO");
  let icon: String = "";
  if (!iconName) {
    icon = Icons.linux;
  }

  if (GLib.get_os_info("ID") == "arch") {
    icon = Icons.arch;
  }

  function openWofi() {
    try {
      const [pkillSuccess, pkillStdout, pkillStderr, pkillStatus] =
        GLib.spawn_command_line_sync("pkill tofi");
      if (!pkillSuccess) {
        throw new Error(
          `pkill command failed with status ${pkillStatus}: ${pkillStderr}`,
        );
      }

      const [wofiSuccess, wofiStdout, wofiStderr, wofiStatus] =
        GLib.spawn_command_line_sync(
          "tofi-drun -c ~/.config/tofi/tofi.launcher.conf",
        );
      if (!wofiSuccess) {
        throw new Error(
          `tofi command failed with status ${wofiStatus}: ${wofiStderr}`,
        );
      }
    } catch (error) {
      console.error("Failed to execute command:", error);
    }
  }
  return (
    <button
      onClicked={openWofi}
      cssClasses={["workspace-buttons", "arch-button"]}
    >
      {icon ? icon : <image iconName={iconName!} />}
    </button>
  );
};
