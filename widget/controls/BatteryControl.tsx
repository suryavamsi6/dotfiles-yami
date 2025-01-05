import Battery from "gi://AstalBattery";
import { bind } from "../../../../../../../usr/share/astal/gjs";
import { Icons } from "../utils/Icons";
import { Variable } from "astal";

export function BatteryController() {
  const battery = Battery.get_default();
  const percentage = bind(battery, "percentage");
  const isCharging = bind(battery, "charging");

  function getBatteryIcon(percent: number, charging: boolean): string {
    const levels = [
      {
        threshold: 0.9,
        icon: charging ? Icons.chargingFullBattery : Icons.fullBattery,
      },
      {
        threshold: 0.8,
        icon: charging ? Icons.chargingNinetyBattery : Icons.ninetyBattery,
      },
      {
        threshold: 0.7,
        icon: charging ? Icons.chargingEightyBattery : Icons.eightyBattery,
      },
      {
        threshold: 0.6,
        icon: charging ? Icons.chargingSeventyBattery : Icons.seventyBattery,
      },
      {
        threshold: 0.5,
        icon: charging ? Icons.chargingSixtyBattery : Icons.sixtyBattery,
      },
      {
        threshold: 0.4,
        icon: charging ? Icons.chargingFiftyBattery : Icons.fiftyBattery,
      },
      {
        threshold: 0.3,
        icon: charging ? Icons.chargingFourtyBattery : Icons.fourtyBattery,
      },
      {
        threshold: 0.2,
        icon: charging ? Icons.chargingThirtyBattery : Icons.thirtyBattery,
      },
      {
        threshold: 0.1,
        icon: charging ? Icons.chargingTwentyBattery : Icons.twentyBattery,
      },
      {
        threshold: 0,
        icon: charging ? Icons.chargingTenBattery : Icons.tenBattery,
      },
    ];
    return (
      levels.find((level) => percent > level.threshold)?.icon.toString() ||
      Icons.unknown.toString()
    );
  }

  function updateLabel(percent: number, charging: boolean): string {
    const icon = getBatteryIcon(percent, charging);
    return `${icon} ${Math.round(percent * 100)}%`;
  }

  const labelBinding = Variable(
    updateLabel(percentage.get(), isCharging.get()),
  );

  percentage.subscribe((percent) => {
    const charging = isCharging.get();
    labelBinding.set(updateLabel(percent, charging));
  });

  isCharging.subscribe((charging) => {
    const percent = percentage.get();

    labelBinding.set(updateLabel(percent, charging));
  });

  return (
    <box visible={battery != null}>
      <button cssClasses={["control-buttons", "battery-info"]}>
        <label>
          {labelBinding((batteryIcon) => {
            return batteryIcon;
          })}
        </label>
      </button>
    </box>
  );
}
