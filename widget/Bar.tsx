import { App, Astal, Gtk, Gdk } from "astal/gtk4";
import { Variable } from "astal";
import { WorkspaceButton } from "./buttons/WorkspaceButton";
import { SystemTray } from "./tray/SystemTray";
import { WifiControl } from "./controls/WifiControl";
import { ArchLinuxLogoButton } from "./buttons/ArchLinuxLogoButton";
import { BluetoothControl } from "./controls/BluetoothControl";
import { MediaControl } from "./controls/MediaControl";
import { BatteryController } from "./controls/BatteryControl";
import { InternetSpeedControl } from "./controls/InternetSpeedControl";

const time = Variable("").poll(1000, "date");

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;

  return (
    <window
      visible
      cssClasses={["Bar"]}
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={App}
    >
      <centerbox>
        <box cssName="centerbox" halign={Gtk.Align.START}>
          <ArchLinuxLogoButton />
          <SystemTray />
          <WorkspaceButton />
          {/*<WifiControl />*/}
        </box>
        <box>
          <MediaControl />
        </box>
        <box halign={Gtk.Align.END}>
          <InternetSpeedControl />
          <BatteryController />
          <WifiControl />
          <BluetoothControl />
          <menubutton hexpand cssClasses={["menu-button"]}>
            <label cssClasses={["label-time"]} label={time()} />
            <popover>
              <Gtk.Calendar />
            </popover>
          </menubutton>
        </box>
      </centerbox>
    </window>
  );
}
