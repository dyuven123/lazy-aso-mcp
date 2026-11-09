# Lazy ASO name check (MCP server)

Free MCP server for iOS developers. Ask your AI assistant whether an App Store name is free, and it checks the real search results country by country.

We scanned 350,712 App Store results: a new app whose name starts with the search reached the top 10 far more often than one using "Brand: search". So before you name an app, check whether anyone already starts their name with your search. [The research](https://lazyaso.com/research/new-app-names?ref=mcp).

## Install

Needs Node 18 or newer. No account, no API key.

**Claude Code**

```
claude mcp add lazy-aso-name-check -- npx -y github:dyuven123/lazy-aso-mcp
```

**Cursor, Claude Desktop and other clients**

```json
{
  "mcpServers": {
    "lazy-aso-name-check": {
      "command": "npx",
      "args": ["-y", "github:dyuven123/lazy-aso-mcp"]
    }
  }
}
```

## Use

> Is "rock identifier" free as an app name in the US and Brazil?

Tool: `check_app_name`

| Input | |
|---|---|
| `name` | The search phrase to start the app name with |
| `countries` | Optional, up to 15 two-letter codes. Default: 15 large markets. 87 countries supported |

For each country you get:

- **Free**: no app in the top 25 starts its name with the search. Filler words such as "free" or "app" are ignored
- **Taken**: at least one does, and you see which apps, their place and their ratings
- **Too few results**: Apple shows fewer than 5 apps, too few to judge

Free says nothing about trademarks, how many people search for it, or whether a new app would rank.

## Privacy

Runs on your machine. Searches go straight to Apple's public iTunes Search API. No telemetry, nothing is sent to us. Searches are paced under Apple's limit of about 20 a minute.

## Need the rest?

This server answers one question: is the name free. [Lazy ASO](https://lazyaso.com/?ref=mcp) is the paid Mac app with search demand from Apple's official top-500 lists in 87 countries, the measured top-10 chance for each name, keyword research, and listing uploads you approve in one click.

## License

MIT, for this server only. The Lazy ASO app and its data are separate and not open source.
