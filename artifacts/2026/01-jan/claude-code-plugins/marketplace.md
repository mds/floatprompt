# Create and distribute a plugin marketplace

> Build and host plugin marketplaces to distribute Claude Code extensions across teams and communities.

A plugin marketplace is a catalog that lets you distribute plugins to others. Marketplaces provide centralized discovery, version tracking, automatic updates, and support for multiple source types (git repositories, local paths, and more). This guide shows you how to create your own marketplace to share plugins with your team or community.

Looking to install plugins from an existing marketplace? See [Discover and install prebuilt plugins](/en/discover-plugins).

## Overview

Creating and distributing a marketplace involves:

1. **Creating plugins**: build one or more plugins with commands, agents, hooks, MCP servers, or LSP servers. This guide assumes you already have plugins to distribute; see [Create plugins](/en/plugins) for details on how to create them.
2. **Creating a marketplace file**: define a `marketplace.json` that lists your plugins and where to find them (see [Create the marketplace file](#create-the-marketplace-file)).
3. **Host the marketplace**: push to GitHub, GitLab, or another git host (see [Host and distribute marketplaces](#host-and-distribute-marketplaces)).
4. **Share with users**: users add your marketplace with `/plugin marketplace add` and install individual plugins (see [Discover and install plugins](/en/discover-plugins)).

Once your marketplace is live, you can update it by pushing changes to your repository. Users refresh their local copy with `/plugin marketplace update`.

## Walkthrough: create a local marketplace

This example creates a marketplace with one plugin: a `/review` command for code reviews. You'll create the directory structure, add a slash command, create the plugin manifest and marketplace catalog, then install and test it.

### Step 1: Create the directory structure

```bash
mkdir -p my-marketplace/.claude-plugin
mkdir -p my-marketplace/plugins/review-plugin/.claude-plugin
mkdir -p my-marketplace/plugins/review-plugin/commands
```

### Step 2: Create the plugin command

Create a Markdown file that defines what the `/review` command does.

```markdown
# my-marketplace/plugins/review-plugin/commands/review.md

Review the code I've selected or the recent changes for:
- Potential bugs or edge cases
- Security concerns
- Performance issues
- Readability improvements

Be concise and actionable.
```

### Step 3: Create the plugin manifest

Create a `plugin.json` file that describes the plugin. The manifest goes in the `.claude-plugin/` directory.

```json
// my-marketplace/plugins/review-plugin/.claude-plugin/plugin.json
{
  "name": "review-plugin",
  "description": "Adds a /review command for quick code reviews",
  "version": "1.0.0"
}
```

### Step 4: Create the marketplace file

Create the marketplace catalog that lists your plugin.

```json
// my-marketplace/.claude-plugin/marketplace.json
{
  "name": "my-plugins",
  "owner": {
    "name": "Your Name"
  },
  "plugins": [
    {
      "name": "review-plugin",
      "source": "./plugins/review-plugin",
      "description": "Adds a /review command for quick code reviews"
    }
  ]
}
```

### Step 5: Add and install

Add the marketplace and install the plugin.

```shell
/plugin marketplace add ./my-marketplace
/plugin install review-plugin@my-plugins
```

### Step 6: Try it out

Select some code in your editor and run your new command.

```shell
/review
```

**Note:** When users install a plugin, Claude Code copies the plugin directory to a cache location. This means plugins can't reference files outside their directory using paths like `../shared-utils`, because those files won't be copied.

If you need to share files across plugins, use symlinks (which are followed during copying) or restructure your marketplace so the shared directory is inside the plugin source path.

## Create the marketplace file

Create `.claude-plugin/marketplace.json` in your repository root. This file defines your marketplace's name, owner information, and a list of plugins with their sources.

Each plugin entry needs at minimum a `name` and `source` (where to fetch it from). See the [full schema](#marketplace-schema) below for all available fields.

```json
{
  "name": "company-tools",
  "owner": {
    "name": "DevTools Team",
    "email": "devtools@example.com"
  },
  "plugins": [
    {
      "name": "code-formatter",
      "source": "./plugins/formatter",
      "description": "Automatic code formatting on save",
      "version": "2.1.0",
      "author": {
        "name": "DevTools Team"
      }
    },
    {
      "name": "deployment-tools",
      "source": {
        "source": "github",
        "repo": "company/deploy-plugin"
      },
      "description": "Deployment automation tools"
    }
  ]
}
```

## Marketplace schema

### Required fields

| Field     | Type   | Description                                                                                                                                                            | Example        |
| :-------- | :----- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------- |
| `name`    | string | Marketplace identifier (kebab-case, no spaces). This is public-facing: users see it when installing plugins (for example, `/plugin install my-tool@your-marketplace`). | `"acme-tools"` |
| `owner`   | object | Marketplace maintainer information                                                                                                 |                |
| `plugins` | array  | List of available plugins                                                                                                                              | See below      |

**Reserved names**: The following marketplace names are reserved for official Anthropic use: `claude-code-marketplace`, `claude-code-plugins`, `claude-plugins-official`, `anthropic-marketplace`, `anthropic-plugins`, `agent-skills`, `life-sciences`.

### Owner fields

| Field   | Type   | Required | Description                      |
| :------ | :----- | :------- | :------------------------------- |
| `name`  | string | Yes      | Name of the maintainer or team   |
| `email` | string | No       | Contact email for the maintainer |

### Optional metadata

| Field                  | Type   | Description                                                                                                                                                               |
| :--------------------- | :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `metadata.description` | string | Brief marketplace description                                                                                                                                             |
| `metadata.version`     | string | Marketplace version                                                                                                                                                       |
| `metadata.pluginRoot`  | string | Base directory prepended to relative plugin source paths |

## Plugin entries

Each plugin entry in the `plugins` array describes a plugin and where to find it.

### Required fields

| Field    | Type           | Description                                                                                                                                            |
| :------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`   | string         | Plugin identifier (kebab-case, no spaces). |
| `source` | string\|object | Where to fetch the plugin from (see [Plugin sources](#plugin-sources) below)                                                                           |

### Optional plugin fields

| Field         | Type    | Description                                                                                                                                                                                                                                                                                                                                                                                                                      |
| :------------ | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `description` | string  | Brief plugin description                                                                                                                                                                                                                                                                                                                                                                                                         |
| `version`     | string  | Plugin version                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `author`      | object  | Plugin author information (`name` required, `email` optional)                                                                                                                                                                                                                                                                                                                                                                    |
| `homepage`    | string  | Plugin homepage or documentation URL                                                                                                                                                                                                                                                                                                                                                                                             |
| `repository`  | string  | Source code repository URL                                                                                                                                                                                                                                                                                                                                                                                                       |
| `license`     | string  | SPDX license identifier (for example, MIT, Apache-2.0)                                                                                                                                                                                                                                                                                                                                                                           |
| `keywords`    | array   | Tags for plugin discovery and categorization                                                                                                                                                                                                                                                                                                                                                                                     |
| `category`    | string  | Plugin category for organization                                                                                                                                                                                                                                                                                                                                                                                                 |
| `tags`        | array   | Tags for searchability                                                                                                                                                                                                                                                                                                                                                                                                           |
| `strict`      | boolean | Controls whether plugins need their own `plugin.json` file. When `true` (default), the plugin source must contain a `plugin.json`. When `false`, the marketplace entry itself defines everything about the plugin. |

## Plugin sources

### Relative paths

For plugins in the same repository:

```json
{
  "name": "my-plugin",
  "source": "./plugins/my-plugin"
}
```

### GitHub repositories

```json
{
  "name": "github-plugin",
  "source": {
    "source": "github",
    "repo": "owner/plugin-repo"
  }
}
```

### Git repositories

```json
{
  "name": "git-plugin",
  "source": {
    "source": "url",
    "url": "https://gitlab.com/team/plugin.git"
  }
}
```

## Host and distribute marketplaces

### Host on GitHub (recommended)

GitHub provides the easiest distribution method:

1. **Create a repository**: Set up a new repository for your marketplace
2. **Add marketplace file**: Create `.claude-plugin/marketplace.json` with your plugin definitions
3. **Share with teams**: Users add your marketplace with `/plugin marketplace add owner/repo`

### Host on other git services

Any git hosting service works, such as GitLab, Bitbucket, and self-hosted servers. Users add with the full repository URL:

```shell
/plugin marketplace add https://gitlab.com/company/plugins.git
```

### Test locally before distribution

Test your marketplace locally before sharing:

```shell
/plugin marketplace add ./path/to/marketplace
/plugin install test-plugin@marketplace-name
```

### Require marketplaces for your team

You can configure your repository so team members are automatically prompted to install your marketplace when they trust the project folder. Add your marketplace to `.claude/settings.json`:

```json
{
  "extraKnownMarketplaces": {
    "company-tools": {
      "source": {
        "source": "github",
        "repo": "your-org/claude-plugins"
      }
    }
  }
}
```

## Validation and testing

Test your marketplace before sharing.

Validate your marketplace JSON syntax:

```bash
claude plugin validate .
```

Or from within Claude Code:

```shell
/plugin validate .
```

Add the marketplace for testing:

```shell
/plugin marketplace add ./path/to/marketplace
```

Install a test plugin to verify everything works:

```shell
/plugin install test-plugin@marketplace-name
```

## Troubleshooting

### Marketplace not loading

**Symptoms**: Can't add marketplace or see plugins from it

**Solutions**:

* Verify the marketplace URL is accessible
* Check that `.claude-plugin/marketplace.json` exists at the specified path
* Ensure JSON syntax is valid using `claude plugin validate` or `/plugin validate`
* For private repositories, confirm you have access permissions

### Plugin installation failures

**Symptoms**: Marketplace appears but plugin installation fails

**Solutions**:

* Verify plugin source URLs are accessible
* Check that plugin directories contain required files
* For GitHub sources, ensure repositories are public or you have access
* Test plugin sources manually by cloning/downloading

### Files not found after installation

**Symptoms**: Plugin installs but references to files fail

**Cause**: Plugins are copied to a cache directory rather than used in-place. Paths that reference files outside the plugin's directory (such as `../shared-utils`) won't work.

**Solutions**: Use symlinks or restructure so shared files are inside the plugin directory.

---

*Source: Claude Code documentation*
