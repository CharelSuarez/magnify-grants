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
         prisma-engines
         jetbrains.webstorm
       ]) ++ (with pkgs.nodePackages; [
           nodejs
           prettier
           eslint
           pnpm
           prisma
       ]);
    shellHook = ''
      export PRISMA_SCHEMA_ENGINE_BINARY="${pkgs.prisma-engines}/bin/schema-engine"
      export PRISMA_QUERY_ENGINE_BINARY="${pkgs.prisma-engines}/bin/query-engine"
      export PRISMA_QUERY_ENGINE_LIBRARY="${pkgs.prisma-engines}/lib/libquery_engine.node"
      export PRISMA_FMT_BINARY="${pkgs.prisma-engines}/bin/prisma-fmt"
      export PATH="$PWD/node_modules/.bin/:$PATH"
    '';
     };
  };
}
