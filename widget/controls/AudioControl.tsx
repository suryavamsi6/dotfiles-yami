import Wp from "gi://AstalWp";
import { bind } from "../../../../../../../usr/share/astal/gjs";
import { Icons } from "../utils/Icons";

export function AudioControl() {
  const speaker = Wp.get_default()?.audio.defaultSpeaker!;

  function getVolumeIcon(volume: number) {
    const levels = [
      {
        threshold: 0.7,
        icon: Icons.highVolume,
      },
      {
        threshold: 0.3,
        icon: Icons.mediumVolume,
      },
      {
        threshold: 0,
        icon: Icons.lowVolume,
      },
    ];
    return (
      levels.find((level) => volume > level.threshold)?.icon.toString() ||
      Icons.mute.toString()
    );
  }

  return (
    <box>
      <button
        cssClasses={["control-buttons", "volume-info"]}
        label={bind(speaker, "volume").as(
          (volume) =>
            `${getVolumeIcon(volume)} ${Math.round(volume * 100).toString()}%`,
        )}
      />
    </box>
  );
}
