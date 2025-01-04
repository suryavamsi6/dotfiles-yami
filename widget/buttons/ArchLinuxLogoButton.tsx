import GLib from "gi://GLib?version=2.0";

export const ArchLinuxLogoButton = () => {
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
    <button onClicked={openWofi} cssClasses={["workspace-buttons"]}>
      <image iconName={GLib.get_os_info("LOGO") || "missing-symbolic"} />
    </button>
  );
};
