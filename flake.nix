{
  description = "My Awesome Desktop Shell";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";

    ags = {
      url = "github:aylur/ags";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs =
    {
      self,
      nixpkgs,
      ags,
    }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
    in
    {
      packages.${system} = {
        default = ags.lib.bundle {
          inherit pkgs;
          src = ./.;
          name = "my-shell";
          entry = "app.ts";

          # additional libraries and executables to add to gjs' runtime
          extraPackages = [
            ags.packages.${system}.battery
            ags.packages.${system}.hyprland
            ags.packages.${system}.mpris
            ags.packages.${system}.tray
            ags.packages.${system}.apps
            ags.packages.${system}.wireplumber
            ags.packages.${system}.bluetooth
            ags.packages.${system}.network
            pkgs.libgtop # ags.packages.${system}.battery
            # pkgs.fzf
          ];
        };
      };

      devShells.${system} = {
        default = pkgs.mkShell {
          buildInputs = [
            # includes astal3 astal4 astal-io by default
            (ags.packages.${system}.default.override {
              extraPackages = [
                ags.packages.${system}.battery
                ags.packages.${system}.hyprland
                ags.packages.${system}.mpris
                ags.packages.${system}.tray
                ags.packages.${system}.apps
                ags.packages.${system}.wireplumber
                ags.packages.${system}.bluetooth
                ags.packages.${system}.network
                pkgs.libgtop
                # cherry pick packages
              ];
            })
          ];
        };
      };
    };
}
