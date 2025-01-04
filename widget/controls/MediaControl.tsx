import Mpris from "gi://AstalMpris";
import { bind } from "../../../../../../../usr/share/astal/gjs";
import { Gtk } from "astal/gtk4";
import { Icons } from "../utils/Icons";

export function MediaControl() {
  const mpris = Mpris.get_default();

  return (
    <button cssClasses={["control-buttons"]}>
      {bind(mpris, "players").as((ps) =>
        ps[0] ? (
          <box>
            <box
              valign={Gtk.Align.CENTER}
              css={bind(ps[0], "coverArt").as(
                (cover) => `background-image: url('${cover}');`,
              )}
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
