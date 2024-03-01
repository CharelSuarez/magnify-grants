{
  description = "Nix development environment for our project";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
  };

  outputs = inputs@{ self, nixpkgs, ... }: let
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages.${system};
    nodejs = pkgs.nodejs_18;

  in {
     devShells."${system}".default = pkgs.mkShell {
       packages = [
         nodejs
       ] ++ (with pkgs; [
         node2nix
         supabase-cli
         jetbrains.webstorm
       ]) ++ (with pkgs.nodePackages; [
           nodejs
           prettier
           eslint
           pnpm
       ]);
     };
  };
}
