import GTop from "gi://GTop";
import { interval } from "astal/time";
import { subprocess, Variable } from "astal";
import { Icons } from "../utils/Icons";

export function SystemInfo() {
  let diskUsage = Variable(getDiskUsage("/"));
  let maxCpuTemp = Variable();

  function getTempIcon(temp: number) {
    const levels = [
      {
        threshold: 70,
        icon: Icons.highTemp,
      },

      {
        threshold: 50,
        icon: Icons.mediumTemp,
      },
      {
        threshold: 0,
        icon: Icons.lowTemp,
      },
    ];
    return (
      levels.find((level) => temp > level.threshold)?.icon.toString() ||
      Icons.unknown.toString()
    );
  }

  function getDiskUsage(mountDir: string) {
    const fsUsage = new GTop.glibtop_fsusage();
    GTop.glibtop_get_fsusage(fsUsage, mountDir);

    const totalGB = (fsUsage.blocks * fsUsage.block_size) / 1024 ** 3;
    const usedGB =
      ((fsUsage.blocks - fsUsage.bavail) * fsUsage.block_size) / 1024 ** 3;
    const usedPercent = (usedGB / totalGB) * 100;
    const freeGB = totalGB - usedGB;
    return {
      totalGB: totalGB.toFixed(1),
      usedGB: usedGB.toFixed(1),
      usedPercent: usedPercent.toFixed(0),
      freeGB: freeGB.toFixed(1),
    };
  }

  function getMaxCpuTemp(): number {
    const proc = subprocess(
      "sensors -u",
      (out) => {
        const matches = out.match(/temp\d+_input:\s+(\d+\.\d+)/g);
        if (matches) {
          const temps = matches.map((match) =>
            parseFloat(match.split(":")[1].trim()),
          );
          maxCpuTemp.set(Math.max(...temps));
        } else {
        }
      },
      (error) => {},
    );
  }

  const tempMonitor = interval(5000, getMaxCpuTemp);
  const usageMonitor = interval(5000, () => {
    diskUsage.set(getDiskUsage("/"));
  });

  return (
    <box>
      <button
        tooltipText={diskUsage((usage) => {
          return `${usage.usedGB}GB out of ${usage.totalGB}GB used`;
        })}
        cssClasses={["system-buttons"]}
        label={diskUsage((usage) => {
          return `${Icons.hardDisk} ${usage.usedPercent}% (${usage.freeGB}GB)`;
        })}
      />
      <button
        tooltipText={"System Temperature"}
        cssClasses={["system-buttons"]}
        label={maxCpuTemp((temp) => {
          return `${getTempIcon(temp)} ${temp}°C`;
        })}
      />
    </box>
  );
}
