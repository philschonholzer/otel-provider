{ pkgs, ... }:

{

  # Devenv is not able to parse comments in .env files https://github.com/cachix/devenv/issues/80
  dotenv.disableHint = true;

  languages.javascript = {
    enable = true;
    package = pkgs.nodejs_18;
    corepack.enable = true;
  };
}
