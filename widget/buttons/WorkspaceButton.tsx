import Hyprland from "gi://AstalHyprland";
import { bind } from "../../../../../../../usr/share/astal/gjs";
import { translate } from "../utils/Functions";

export const WorkspaceButton = () => {
  const hyprland = Hyprland.get_default();

  return (
    <box cssClasses={["workspaces"]}>
      {bind(hyprland, "workspaces").as((wss) =>
        wss
          .filter((ws) => !(ws.id >= -99 && ws.id <= -2)) // filter out special workspaces
          .sort((a, b) => a.id - b.id)
          .map((ws) => (
            <button
              cssClasses={bind(hyprland, "focusedWorkspace").as((fw) =>
                ws === fw
                  ? ["workspace-buttons", "active"]
                  : ["workspace-buttons"],
              )}
              onClicked={() => ws.focus()}
            >
              {translate(ws.id)}
            </button>
          )),
      )}
    </box>
  );
};
