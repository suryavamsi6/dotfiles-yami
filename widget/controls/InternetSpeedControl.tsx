import { exec, readFile } from "../../../../../../../usr/share/astal/gjs";
import { Variable } from "astal";
import { Icons } from "../utils/Icons";
import { interval } from "astal/time";

export function InternetSpeedControl() {
  // Variables to store download speed and previous data
  const downloadSpeed = Variable("0 B");
  let prevDown = 0;
  let isCalculating = false;
  function calculateDownloadSpeed() {
    if (isCalculating) {
      return;
    }
    isCalculating = true;
    const output = exec("ls /sys/class/net");

    let interfaces = output
      .split("\n")
      .map((line) => line.trim())
      .filter(
        (line) =>
          line &&
          !line.startsWith("lo") &&
          !line.startsWith("br") &&
          !line.startsWith("vnet") &&
          !line.startsWith("tun"),
      );

    interfaces = interfaces.filter((iface) => {
      // Exclude loopback and virtual interfaces
      return (
        iface &&
        iface !== "lo" &&
        !iface.match(/^ifb[0-9]+/) &&
        !iface.match(/^lxdbr[0-9]+/) &&
        !iface.match(/^virbr[0-9]+/) &&
        !iface.match(/^br[0-9]+/) &&
        !iface.match(/^vnet[0-9]+/) &&
        !iface.match(/^tun[0-9]+/) &&
        !iface.match(/^tap[0-9]+/)
      );
    });

    if (interfaces.length === 0) {
      isCalculating = false; // Unlock after calculation
      return;
    }

    let totalDown = 0;

    // Calculate total RX bytes for all valid interfaces
    interfaces.forEach((iface) => {
      try {
        const rxBytes = parseInt(
          readFile(`/sys/class/net/${iface}/statistics/rx_bytes`).trim(),
        );
        if (!isNaN(rxBytes)) {
          totalDown += rxBytes;
        }
      } catch (error) {
        console.error(`Error reading RX bytes for ${iface}:`, error);
      }
    });

    // Calculate download speed in bytes per second
    const download = (totalDown - prevDown) / 2; // If reset, calculate speed from current total
    prevDown = totalDown;
    downloadSpeed.set(formatBytes(download));
    isCalculating = false; // Unlock after calculation
  }

  // Helper function to format bytes into human-readable strings
  function formatBytes(bytes: number): string {
    if (bytes < 1024) {
      return `${Icons.download} ${bytes.toFixed(1)} B/s`;
    } else if (bytes < 1024 ** 2) {
      return `${Icons.download} ${(bytes / 1024).toFixed(1)} KB/s`;
    } else if (bytes < 1024 ** 3) {
      return `${Icons.download} ${(bytes / 1024 ** 2).toFixed(1)} MB/s`;
    } else {
      return `${Icons.download} ${(bytes / 1024 ** 3).toFixed(1)} GB/s`;
    }
  }

  // Run the calculation every 2 seconds
  interval(2000, calculateDownloadSpeed);

  // Return UI component
  return (
    <box>
      <button
        cssClasses={["control-buttons", "internet-speed-info"]}
        label={downloadSpeed(String)}
      ></button>
    </box>
  );
}
