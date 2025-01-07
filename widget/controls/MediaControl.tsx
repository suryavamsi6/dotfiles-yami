import Mpris from "gi://AstalMpris";
import { bind } from "../../../../../../../usr/share/astal/gjs";
import { Gtk } from "astal/gtk4";
import { Icons } from "../utils/Icons";

export function MediaControl() {
  const mpris = Mpris.get_default();
  const players = bind(mpris, "players");
  return (
    <button
      cssClasses={bind(mpris, "players").as((ps) =>
        ps[0] ? ["playing", "control-buttons"] : ["control-buttons"],
      )}
    >
      {bind(mpris, "players").as((ps) =>
        ps[0] ? (
          <box>
            <image
              cssClasses={["media-cover"]}
              valign={Gtk.Align.CENTER}
              file={bind(players.get()[0], "coverArt").as(String)}
            />
            <label
              label={bind(ps[0], "title").as(
                () => `${ps[0].title} - ${ps[0].artist}`,
              )}
            />
          </box>
        ) : (
          Icons.disc
        ),
      )}
    </button>
  );
}
