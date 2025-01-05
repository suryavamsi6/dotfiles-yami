import { readFile, subprocess } from "../../../../../../../usr/share/astal/gjs";
import { Variable } from "astal";
import { Icons } from "../utils/Icons";
import { interval, timeout, idle } from "astal/time";

export function InternetSpeedControl() {
  let downloadSpeed = Variable("0 B");
  let uploadSpeed = 0;

  // Define your network interface
  const interfaceName = "enp4s0";
  const rxFile = `/sys/class/net/${interfaceName}/statistics/rx_bytes`;
  let rxInitial = parseInt(readFile(rxFile).trim());

  function formatBytes(bytes: number): string {
    if (bytes < 1024) {
      return `${Icons.download} ${bytes.toFixed(1)}B/s`;
    } else if (bytes < 1024 ** 2) {
      return `${Icons.download} ${(bytes / 1024).toFixed(1)}KB/s`;
    } else if (bytes < 1024 ** 3) {
      return `${Icons.download} ${(bytes / 1024 ** 2).toFixed(1)}MB/s`;
    } else {
      return `${Icons.download} ${(bytes / 1024 ** 3).toFixed(1)}GB/s`;
    }
  }

  const updateSpeed = interval(2000, () => {
    const rxNew = parseInt(readFile(rxFile).trim());
    const rxSpeed = rxNew - rxInitial;
    rxInitial = rxNew;
    downloadSpeed.set(formatBytes(rxSpeed / 2));
  });

  return (
    <box>
      <button
        cssClasses={["control-buttons"]}
        label={downloadSpeed((speed) => speed)}
      ></button>
    </box>
  );
}
