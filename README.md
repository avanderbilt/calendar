Calendar
=================

A calendar.

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g calendar
$ cal COMMAND
running command...
$ cal (--version)
calendar/0.0.0 win32-x64 node-v16.13.0
$ cal --help [COMMAND]
USAGE
  $ cal COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`cal hello [PERSON]`](#cal-hello-person)
* [`cal help [COMMAND]`](#cal-help-command)
* [`cal plugins`](#cal-plugins)
* [`cal plugins:install PLUGIN...`](#cal-pluginsinstall-plugin)
* [`cal plugins:inspect PLUGIN...`](#cal-pluginsinspect-plugin)
* [`cal plugins:install PLUGIN...`](#cal-pluginsinstall-plugin-1)
* [`cal plugins:link PLUGIN`](#cal-pluginslink-plugin)
* [`cal plugins:uninstall PLUGIN...`](#cal-pluginsuninstall-plugin)
* [`cal plugins:uninstall PLUGIN...`](#cal-pluginsuninstall-plugin-1)
* [`cal plugins:uninstall PLUGIN...`](#cal-pluginsuninstall-plugin-2)
* [`cal plugins:update`](#cal-pluginsupdate)
* [`cal today [WHEN]`](#cal-today-when)

## `cal hello [PERSON]`

Say hello to a friend or to the world, from someone or from no one.

```
USAGE
  $ cal hello [PERSON] [-f <value>]

ARGUMENTS
  PERSON  The person hello is being said to.

FLAGS
  -f, --from=<value>  The person who is saying hello.

DESCRIPTION
  Say hello to a friend or to the world, from someone or from no one.

EXAMPLES
  $ cal hello Arthur --from Jessica
  Hello Arthur from Jessica!

  $ cal hello Arthur
  Hello Arthur!

  $ cal hello
  Hello world!
```

_See code: [dist/commands/hello.ts](https://github.com/avanderbilt/calendar/blob/v0.0.0/dist/commands/hello.ts)_

## `cal help [COMMAND]`

Display help for cal.

```
USAGE
  $ cal help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for cal.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.17/src/commands/help.ts)_

## `cal plugins`

List installed plugins.

```
USAGE
  $ cal plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ cal plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.1.6/src/commands/plugins/index.ts)_

## `cal plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ cal plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ cal plugins:add

EXAMPLES
  $ cal plugins:install myplugin 

  $ cal plugins:install https://github.com/someuser/someplugin

  $ cal plugins:install someuser/someplugin
```

## `cal plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ cal plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ cal plugins:inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.1.6/src/commands/plugins/inspect.ts)_

## `cal plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ cal plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ cal plugins:add

EXAMPLES
  $ cal plugins:install myplugin 

  $ cal plugins:install https://github.com/someuser/someplugin

  $ cal plugins:install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.1.6/src/commands/plugins/install.ts)_

## `cal plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ cal plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ cal plugins:link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.1.6/src/commands/plugins/link.ts)_

## `cal plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ cal plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ cal plugins:unlink
  $ cal plugins:remove
```

## `cal plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ cal plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ cal plugins:unlink
  $ cal plugins:remove
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.1.6/src/commands/plugins/uninstall.ts)_

## `cal plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ cal plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ cal plugins:unlink
  $ cal plugins:remove
```

## `cal plugins:update`

Update installed plugins.

```
USAGE
  $ cal plugins:update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.1.6/src/commands/plugins/update.ts)_

## `cal today [WHEN]`

This is information about today.

```
USAGE
  $ cal today [WHEN] [-s | -m]

ARGUMENTS
  WHEN  Specify a specific time.

FLAGS
  -m, --moon  Show lunar information only.
  -s, --sun   Show solar information only.

DESCRIPTION
  This is information about today.
```

_See code: [dist/commands/today.ts](https://github.com/avanderbilt/calendar/blob/v0.0.0/dist/commands/today.ts)_
<!-- commandsstop -->
